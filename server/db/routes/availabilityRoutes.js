const { Router } = require('express');
const { Op } = require('sequelize');

const {
  User,
  Survey,
  Request,
  ListingPhotos,
  Listing,
  Invite,
  Availability
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
.get('/others/currentUserListing/:listingId', (req, res) => {
  const { listingId } = req.params;
  Availability.findAll({
    where: {
      [Op.and]: [
        { accepted: false },
        { listing_id: {
          [Op.not]: listingId
        }}
      ]
    }
  })
  .then((availabilities) => res.send(availabilities))
  .catch((err) => console.log(err))
})

module.exports = {
  availabilityRouter
};
