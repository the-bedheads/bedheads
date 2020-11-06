const moment = require('moment');
const { Router } = require('express');
const { Op } = require('sequelize');
const { Availability, Request, Listing } = require('../index');

const availabilityRouter = Router();W

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
      user_id: userId,
    },
  })
    .then((listing) => listing.dataValues.id)
    .catch((err) => res.status(500).send(err));
  // create new availability
  Availability.create({
    listing_id: listingId,
    startDate: start,
    endDate: end,
  })
    .then(() => {
      res.status(201).send('complete');
    })
    .catch((err) => err);
});

// get current users entire calendar
availabilityRouter.get('/allAvailabilities/:listingId', (req, res) => {
  const { listingId } = req.params;
  Availability.findAll({
    where: {
      listing_id: listingId,
    },
  })
    .then(async (availabilities) => {
      const final = await availabilities.map((item) => {
        const { id, startDate, endDate } = item.dataValues;
        if (!item.dataValues.accepted) {
          return {
            start: startDate,
            end: endDate,
            title: 'Availability',
            backgroundColor: 'green',
            id,
            listingId: item.dataValues.listing_id,
            type: 'avb',
          };
        }
        return {
          start: startDate,
          end: endDate,
          title: 'Swap Confirmed',
          backgroundColor: 'purple',
          id,
          listingId: item.dataValues.listing_id,
          guestId: item.dataValues.guest_id,
          type: 'swap',
        };
      });
      const getRequests = async () => Promise.all(
        availabilities.map((item) => Request.findAll({
          where: {
            availability_id: item.dataValues.id,
          },
        }).then((data) => data)),
      );
      const requests = await getRequests()
        .then((data) => data.filter((item) => item.length))
        .then((filteredData) => filteredData);
      const testArr = [];
      requests.forEach((requestGroup) => {
        const nestedObj = {
          availability_id: null,
          requester_ids: [],
        };
        requestGroup.forEach((request) => {
          nestedObj.availability_id = request.dataValues.availability_id;
          nestedObj.requester_ids.push(request.dataValues.requester_id);
        });
        testArr.push(nestedObj);
      });
      const arrJoin = async () => Promise.all(
        testArr.map((request) => Availability.findOne({
          where: {
            id: request.availability_id,
          },
        }).then((availability) => {
          const reqLength = request.requester_ids.length;
          const title = reqLength > 1 ? `${reqLength} requests` : '1 request';
          const idkAnymore = {
            availability_id: request.availability_id,
            requester_ids: request.requester_ids,
            title,
            backgroundColor: 'blue',
            start: availability.dataValues.startDate,
            end: availability.dataValues.endDate,
            type: 'req',
          };
          return idkAnymore;
        })),
      );
      const wut = await arrJoin().then((data) => data);
      wut.forEach((request) => final.push(request));
      res.status(200).send(final);
    })
    .catch((err) => res.status(500).send(err));
});

// delete availability
availabilityRouter.delete('/', (req, res) => {
  const { startDate, endDate, listingId } = req.query;
  Availability.findOne({
    where: {
      listing_id: listingId,
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
availabilityRouter.get('/listings/:start/:end', (req, res) => {
  let { start, end } = req.params;
  start = moment(start, '');
  end = moment(end, '');
  Availability.findAll({
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
  })
    .then((availListings) => res.send(availListings))
    .catch((err) => res.send(err));
});

module.exports = {
  availabilityRouter,
};
