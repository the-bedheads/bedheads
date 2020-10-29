const { Router } = require('express');

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
  .then((availabilities) => res.send(availabilities))
  .catch((err) => res.status(500).send(err));
})

module.exports = {
  availabilityRouter
};
