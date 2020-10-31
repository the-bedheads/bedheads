const { Router } = require('express');

const {
  User,
  Survey,
  Request,
  ListingPhotos,
  Listing,
  Invite,
  Availability,
} = require('../index');

const requestRouter = Router();

requestRouter
  .get('/', (req, res) => {
    Request.findAll()
      .then((requests) => res.send(requests))
      .catch((err) => res.status(500).send(err));
  })
  .get('/byAvailabilityId/:availabilityId', (req, res) => {
    const { availabilityId } = req.params;
    Request.findAll({
      where: {
        availability_id: availabilityId,
      },
    })
      .then((requests) => res.send(requests))
      .catch((err) => console.log(err));
  })
  .get('/count/byAvailabilityId/:availabilityId', (req, res) => {
    const { availabilityId } = req.params;
    Request.findAndCountAll({
      where: {
        availability_id: availabilityId,
      },
    })
      .then((count) => res.send(count))
      .catch((err) => console.log(err));
  });

module.exports = {
  requestRouter,
};
