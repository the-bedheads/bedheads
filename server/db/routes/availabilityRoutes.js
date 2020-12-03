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
          { hostId },
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
            hostId: {
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
        [Op.and]: [{ accepted: false }, { hostId }],
      },
    })
      .then((availabilities) => res.send(availabilities.map((a) => a.id)))
      .catch((err) => res.status(500).send(err));
  })
  .get('/countSwaps/:userId', (req, res) => {
    const { userId } = req.params;
    Availability.findAndCountAll({
      where: {
        [Op.and]: [{ accepted: true }, { hostId: userId }],
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
    hostId: userId,
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
    .then((data) => {
      if (!data) {
        throw new TypeError('No availabilities found');
      }
      return data.map((avb) => avb.dataValues);
    });
  if (availabilities) {
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
          guestId: item.guestId,
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
        guestId: item.guestId,
        type: 'swap',
      };
    });
    const getRequests = async () => Promise.all(
      availabilities.map((item) => Request.findAll({
        where: {
          availabilityId: item.id,
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
        availabilityId: null,
        requesterIds: [],
      };
      requestGroup.forEach((request) => {
        nestedObj.availabilityId = request.dataValues.availabilityId;
        nestedObj.requesterIds.push(request.dataValues.requesterId);
      });
      requestArr.push(nestedObj);
    });
    const createReq = async () => Promise.all(
      requestArr.map((request) => Availability.findOne({
        where: {
          id: request.availabilityId,
        },
      })
        .then((availability) => {
          const reqLength = request.requesterIds.length;
          const title = reqLength > 1 ? `${reqLength} requests` : '1 request';
          const reqObj = {
            availabilityId: request.availabilityId,
            requesterIds: request.requesterIds,
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
  } else {
    res.send('no availabilities found');
  }
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
      guestId,
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
        availabilityId: avbId,
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
        hostId: userId,
      },
    });
    res.send(response);
  });

module.exports = {
  availabilityRouter,
};
