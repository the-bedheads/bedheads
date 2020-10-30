const { Router } = require('express');
const { Op } = require('sequelize');
const { default: availabilities } = require('../../test/sampleData/availabilities');

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
//get availabilites user has currently planned/set
.get('/currentAvailabilites/:listingId', (req, res) => {
  const { listingId } = req.params;
  Availability.findAll({
    where: {
      [Op.and]: [
        { accepted: false },
        { listing_id: listingId }
      ]
    }
  })
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
  .catch((err) => res.status(500).send(err));
})

module.exports = {
  availabilityRouter
};
