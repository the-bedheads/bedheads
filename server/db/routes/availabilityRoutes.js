const { Router } = require('express');
const { Op } = require('sequelize');
const { moment } = require('moment');
const { default: availabilities } = require('../../test/sampleData/availabilities');

const {
  User,
  Survey,
  Request,
  ListingPhotos,
  Listing,
  Invite,
  Availability,
} = require('../index');

const availabilityRouter = Router();

availabilityRouter
  .get('/', (req, res) => {
    Availability.findAll()
      .then((availabilities) => {
        console.log(availabilities);
        res.send(availabilities);
      })
      .catch((err) => res.status(500).send(err));
  })
// get availabilites user has currently planned/set
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
      .then((availabilities) => {
        res.send(availabilities);
      })
      .catch((err) => res.status(500).send(err));
  })
  .get('/others/currentUserListing/:listingId', (req, res) => {
    const { listingId } = req.params;
    Availability.findAll({
      where: {
        [Op.and]: [
          { accepted: false },
          { listing_id: {
            [Op.not]: listingId,
          }},
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
    .then((newListing) => console.log(newListing))
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
              display: 'background',
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
        res.send(final);
      })
      .catch((err) => res.status(500).send(err));
  });

// delete availability
availabilityRouter
  .delete('/', (req, res) => {
    const { startDate, endDate, listingId } = req.query;
    console.log(startDate, endDate, listingId);
    Availability.findOne({
      where: {
        listing_id: listingId,
        startDate,
        endDate,
      },
    })
      .then((avlb) => {
        console.log(avlb);
        avlb.destroy();
      })
      .catch((err) => res.status(500).send(err));
  });

module.exports = {
  availabilityRouter,
};
