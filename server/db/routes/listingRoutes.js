const { Router } = require('express');
const Sequelize = require('sequelize');

const {
  User,
  Survey,
  Request,
  ListingPhotos,
  Listing,
  Invite,
  Availability,
  models,
} = require('../index');

const listingRouter = Router();

listingRouter
  .get('/', async (req, res) => {
    await Listing.findAll({
      include: {
        model: Availability,
      },
      order: [
        [Availability, 'startDate', 'ASC'],
        [Sequelize.literal('random()')],
      ],
      limit: 4,
    })
      .then((listings) => {
        res.send(listings);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(err);
      });
  })
  .get('/user/:userId', (req, res) => {
    const { userId } = req.params;
    Listing.findOne({
      where: {
        user_id: userId,
      },
    })
      .then((listing) => {
        res.send(listing);
      })
      .catch((err) => res.status(500).send(err));
  })
  .get('/byId/:listingId', (req, res) => {
    const { listingId } = req.params;
    Listing.findOne({
      where: {
        id: listingId,
      },
    })
      .then((listing) => res.send(listing))
      .catch((err) => res.status(500).send(err));
  })
  .get('/fullSearch/:listingId/:location', (req, res) => {
    const { listingId, location } = req.params;
    Listing.findOne({
      where: {
        id: listingId,
        listingCity: location,
      },
    })
      .then((listing) => res.send(listing))
      .catch((err) => res.status(500).send(err));
  });

listingRouter
  .post('/', (req, res) => {
    const {
      listingAddress, listingCity, listingState, listingZipCode, listingTitle,
      listingDescription, pets, ada, smoking, roommates, internet, privateBath,
    } = req.body;
    Listing.create({
      listingAddress,
      listingCity,
      listingState,
      listingZipCode,
      listingTitle,
      listingDescription,
      pets,
      ada,
      smoking,
      roommates,
      internet,
      privateBath,
    })
      .then(() => res.status(201).send('created!'))
      .catch((err) => res.send(err));
  });

module.exports = {
  listingRouter,
};
