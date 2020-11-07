const { Router } = require('express');
const Sequelize = require('sequelize');
const axios = require('axios');

const {
  User,
  Survey,
  Request,
  ListingPhotos,
  Listing,
  Invite,
  Availability,
  Geolocation,
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
      listingDescription, pets, ada, smoking, roommates, internet, privateBath, userId,
    } = req.body;
    const listingLocation = `${listingAddress} ${listingCity} ${listingState}`;
    Listing.create({
      user_id: userId,
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
      .then((response) => {
        const listingId = response.dataValues.id;
        axios.get(`http://${process.env.HOST}:${process.env.PORT}/map/listing/geocode/${listingLocation}`)
          .then((geocoded) => {
            console.log(geocoded.data[0]);
            Geolocation.create({
              latitude: geocoded.data[1],
              longitude: geocoded.data[0],
              listing_id: listingId,
            })
              .then(() => console.log('created right!'))
              .catch((err) => console.log(err));
          })
          .catch((err) => {
            res.send(err);
          });
      })
      .catch((err) => res.send(err));
  });

module.exports = {
  listingRouter,
};
