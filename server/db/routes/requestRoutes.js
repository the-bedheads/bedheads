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
    const { userId, avbId, dates } = req.body.params;
    // does host have availability for same days?
    const requesterListingId = await Listing.findOne({
      where: {
        userId,
      },
    })
      .then(({ dataValues }) => dataValues.id);
    const avbCheck = await Availability.findOne({
      where: {
        listingId: requesterListingId,
        startDate: dates.startAvail,
        endDate: dates.endAvail,
      },
    })
      .then((avb) => {
        if (!avb) {
          return false;
        }
        return true;
      });
    if (!avbCheck) {
      Availability.create({
        listingId: requesterListingId,
        startDate: dates.startAvail,
        endDate: dates.endAvail,
        host_id: userId,
        accepted: false,
      });
    }
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
      .catch((err) => res.status(409).send(err));
  });

// decline request
requestRouter
  .delete('/decline', async (req, res) => {
    const { avbId, guestId } = req.query;
    await Request.destroy({
      where: {
        requester_id: guestId,
        availability_id: avbId,
      },
    })
      .catch((err) => {
        console.warn('DELETE request/decline - Request.destroy');
        res.send(err);
      });
    res.status(201).send('success');
  });

module.exports = {
  requestRouter,
};
