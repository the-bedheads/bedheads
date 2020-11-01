const { Router } = require('express');
const { Op } = require('sequelize');
const { moment } = require('moment');

const { Availability } = require('../index');

const availabilityRouter = Router();

availabilityRouter
  .get('/', (req, res) => {
    Availability.findAll()
      .then((availabilities) => res.send(availabilities))
      .catch((err) => res.status(500).send(err));
  })
  .get('/currentAvailabilities/:listingId', (req, res) => {
    const { listingId } = req.params;
    Availability.findAll({
      where: {
        [Op.and]: [
          { accepted: false },
          { listing_id: listingId },
        ],
      },
    })
      .then((availabilities) => res.send(availabilities))
      .catch((err) => res.status(500).send(err));
  })
  .get('/others/currentUserListing/:listingId', (req, res) => {
    const { listingId } = req.params;
    Availability.findAll({
      where: {
        [Op.and]: [
          { accepted: false },
          {
            listing_id: {
              [Op.not]: listingId,
            },
          },
        ],
      },
    })
      .then((availabilities) => res.send(availabilities))
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
      console.log('Availability created');
      res.status(201).send('complete');
    })
    .catch((err) => console.log(err));
});

// get current users entire calendar
availabilityRouter
  .get('/allAvailabilities/:listingId', (req, res) => {
    const { listingId } = req.params;
    Availability.findAll({
      where: {
        listing_id: listingId,
      },
    })
      .then(async (availabilities) => {
        const final = await availabilities.map((item) => {
          if (!item.dataValues.accepted) {
            return ({
              start: item.dataValues.startDate,
              end: item.dataValues.endDate,
              title: 'Availability',
              backgroundColor: 'green',
              id: item.dataValues.id,
            });
          }
          return ({
            start: item.dataValues.startDate,
            end: item.dataValues.endDate,
            title: 'Swap Confirmed',
            backgroundColor: 'purple',
            id: item.dataValues.id,
          });
        });
        const getRequests = async () => Promise.all(availabilities.map((item) => Request.findAll({
          where: {
            availability_id: item.dataValues.id,
          },
        })
          .then((data) => data)));
        const requests = await getRequests()
          .then((data) => data.filter((item) => item.length))
          .then((filteredData) => filteredData);
        const testArr = [];
        requests
          .forEach((requestGroup) => {
            const nestedObj = {
              availability_id: null,
              requester_ids: [],
            };
            requestGroup
              .forEach((request) => {
                nestedObj.availability_id = request.dataValues.availability_id;
                nestedObj.requester_ids.push(request.dataValues.requester_id);
              });
            testArr.push(nestedObj);
          });
        const arrJoin = async () => Promise.all(testArr.map((request) => Availability.findOne({
          where: {
            id: request.availability_id,
          },
        })
          .then((availability) => {
            const reqLength = request.requester_ids.length;
            const title = reqLength > 1 ? `${reqLength} requests` : '1 request';
            const idkAnymore = {
              availability_id: request.availability_id,
              requester_ids: request.requester_ids,
              title,
              backgroundColor: 'blue',
              start: availability.dataValues.startDate,
              end: availability.dataValues.endDate,
            };
            return idkAnymore;
          })));
        const wut = await arrJoin().then((data) => data);
        wut.forEach((request) => final.push(request));
        console.log(wut);
        res.status(200).send(final);
      })
      .catch((err) => res.status(500).send(err));
  });

// delete availability
availabilityRouter
  .delete('/', (req, res) => {
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
        console.log('Availability deleted');
        res.status(201).send('complete');
      })
      .catch((err) => res.status(500).send(err));
  });

module.exports = {
  availabilityRouter,
};
