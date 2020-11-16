const moment = require('moment');
const { Router } = require('express');
const { Op } = require('sequelize');
const { Availability, Request, Listing } = require('../index');

const availabilityRouter = Router();

availabilityRouter
  .get('/', (req, res) => {
    Availability.findAll()
      .then((availabilities) => res.send(availabilities))
      .catch((err) => res.status(500).send(err));
  })
  .get('/currentAvailabilities/:hostId', (req, res) => {
    const { hostId } = req.params;
    Availability.findAll({
      where: {
        [Op.and]: [
          { accepted: false },
          { host_id: hostId },
        ],
      },
    })
      .then((availabilities) => res.send(availabilities))
      .catch((err) => res.status(500).send(err));
  })
  .get('/others/currentUser/:hostId', (req, res) => {
    const { hostId } = req.params;
    Availability.findAll({
      where: {
        [Op.and]: [
          { accepted: false },
          {
            host_id: {
              [Op.not]: hostId,
            },
          },
        ],
      },
    })
      .then((availabilities) => res.send(availabilities))
      .catch((err) => res.status(500).send(err));
  })
  .get('/mineIdOnly/:hostId', (req, res) => {
    const { hostId } = req.params;
    Availability.findAll({
      attributes: ['id'],
      where: {
        [Op.and]: [{ accepted: false }, { host_id: hostId }],
      },
    })
      .then((availabilities) => res.send(availabilities.map((a) => a.id)))
      .catch((err) => res.status(500).send(err));
  })
  .get('/countSwaps/:userId', (req, res) => {
    const { userId } = req.params;
    Availability.findAndCountAll({
      where: {
        [Op.and]: [{ accepted: true }, { host_id: userId }],
        startDate: {
          [Op.gt]: new Date(),
        },
      },
    })
      .then((swaps) => res.send(swaps))
      .catch((err) => res.status(500).send(err));
  });

// Set availability
availabilityRouter.post('/setAvailability', async (req, res) => {
  const { start, end, userId } = req.body.availability;
  // get listing id
  const listingId = await Listing.findOne({
    where: {
      userId,
    },
  })
    .then((listing) => listing.dataValues.id)
    .catch((err) => res.status(500).send(err));
  // create new availability
  Availability.create({
    listingId,
    startDate: start,
    endDate: end,
    host_id: userId,
    accepted: false,
  })
    .then(() => {
      res.status(201).send('complete');
    })
    .catch((err) => err);
});

// get current users entire calendar
availabilityRouter.get('/allAvailabilities/:listingId', async (req, res) => {
  const { listingId } = req.params;
  const availabilities = await Availability.findAll({
    where: {
      listingId,
    },
  })
    .then((data) => data.map((avb) => avb.dataValues))
    .catch(() => console.warn('GET availability/allAvailabilities: Availability.findAll'));
  const final = availabilities.map((item) => {
    const { id, startDate, endDate } = item;
    if (!item.accepted) {
      return {
        start: startDate,
        end: endDate,
        title: 'Availability',
        backgroundColor: '#7ad9ec',
        textColor: 'black',
        id,
        listingId: item.listingId,
        type: 'avb',
      };
    }
    if (item.accepted && moment(endDate).isBefore(new Date())) {
      return {
        start: startDate,
        end: endDate,
        title: 'Complete',
        backgroundColor: '#9a4432',
        id,
        listingId: item.listingId,
        guestId: item.guest_id,
        type: 'complete',
      };
    }
    return {
      start: startDate,
      end: endDate,
      title: 'Swap Confirmed',
      backgroundColor: '#8b98de',
      id,
      listingId: item.listingId,
      guestId: item.guest_id,
      type: 'swap',
    };
  });
  const getRequests = async () => Promise.all(
    availabilities.map((item) => Request.findAll({
      where: {
        availability_id: item.id,
      },
    })
      .then((data) => data)
      .catch(() => console.warn('GET availability/allAvailabilities: getRequests'))),
  );
  const requests = await getRequests()
    .then((data) => data.filter((item) => item.length))
    .then((filteredData) => filteredData)
    .catch(() => console.warn('GET availability/allAvailabilities: getRequests()'));
  const requestArr = [];
  requests.forEach((requestGroup) => {
    const nestedObj = {
      availability_id: null,
      requester_ids: [],
    };
    requestGroup.forEach((request) => {
      nestedObj.availability_id = request.dataValues.availability_id;
      nestedObj.requester_ids.push(request.dataValues.requester_id);
    });
    requestArr.push(nestedObj);
  });
  const createReq = async () => Promise.all(
    requestArr.map((request) => Availability.findOne({
      where: {
        id: request.availability_id,
      },
    })
      .then((availability) => {
        const reqLength = request.requester_ids.length;
        const title = reqLength > 1 ? `${reqLength} requests` : '1 request';
        const reqObj = {
          availability_id: request.availability_id,
          requester_ids: request.requester_ids,
          title,
          backgroundColor: '#fac94f',
          textColor: 'black',
          start: availability.dataValues.startDate,
          end: availability.dataValues.endDate,
          type: 'req',
        };
        return reqObj;
      })
      .catch(() => console.warn('GET availability/allAvailabilities: createReq'))),
  );
  const reqs = await createReq()
    .then((data) => data)
    .catch(() => console.warn('GET availability/allAvailabilities: createReq()'));
  reqs.forEach((request) => final.push(request));
  res.send(final);
});

// delete availability
availabilityRouter.delete('/', (req, res) => {
  const { startDate, endDate, listingId } = req.query;
  Availability.findOne({
    where: {
      listingId,
      startDate,
      endDate,
    },
  })
    .then((avlb) => {
      avlb.destroy();
      res.status(201).send('complete');
    })
    .catch((err) => res.status(500).send(err));
});

// get availabilities for certain date range, use response to grab listings they're attached to
availabilityRouter.get('/listings/:start/:end', async (req, res) => {
  let { start, end } = req.params;
  start = moment(start, '');
  end = moment(end, '');
  await Availability.findAll({
    where: {
      [Op.and]: [{
        startDate: {
          [Op.between]: [start, end],
        },
      }, {
        endDate: {
          [Op.between]: [start, end],
        },
      }],
    },
    include: {
      model: Listing,
    },
  })
    .then((availListings) => res.send(availListings))
    .catch((err) => res.send(err));
});

// confirm swap
availabilityRouter
  .post('/confirm', async (req, res) => {
    const { avbId, guestId } = req.body.params;
    const final = await Availability.update({
      accepted: true,
      guest_id: guestId,
    }, {
      where: {
        id: avbId,
      },
    })
      .then((avb) => avb)
      .catch((err) => {
        console.warn('POST availability/confirm - Availability.update');
        res.send(err);
      });
    await Request.destroy({
      where: {
        availability_id: avbId,
      },
    })
      .catch((err) => {
        console.warn('POST availability/confirm - Request.destroy');
        res.send(err);
      });
    res.status(201).send(final);
  });

// get all of a users availabilities
availabilityRouter
  .get('/allAvbs/:userId', async (req, res) => {
    const { userId } = req.params;
    const response = await Availability.findAll({
      where: {
        host_id: userId,
      },
    });
    res.send(response);
  });

module.exports = {
  availabilityRouter,
};
