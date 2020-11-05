/* eslint-disable linebreak-style */
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
      .catch((err) => res.status(500).send(err));
  })
  .get('/count/byAvailabilityId/:availabilityId', (req, res) => {
    const { availabilityId } = req.params;
    Request.findAndCountAll({
      where: {
        availability_id: availabilityId,
      },
    })
      .then((count) => res.send(count))
      .catch((err) => res.status(500).send(err));
  })
  .get('/countByArray', (req, res) => {
    const { arr } = req.query;
    Request.findAndCountAll({
      where: {
        availability_id: arr,
      },
    })
      .then((count) => res.send(count))
      .catch((err) => res.status(500).send(err));
  });

// to make a request
requestRouter
  .post('/newRequest', async (req, res) => {
    const { userId, avbId } = req.body.params;
    // does request already exist?
    await Request.findOne({
      where: {
        requester_id: userId,
        availability_id: avbId,
      },
    })
      .then((request) => {
        // if so, don't allow creation and throw error
        if (request) {
          throw request;
        }
        // else, create request
        Request.create({
          requester_id: userId,
          availability_id: avbId,
        })
          .then(() => res.status(201).send('Request sent!'));
      })
      .catch(() => res.status(409).send('Request already exists'));
  });

module.exports = {
  requestRouter,
};
