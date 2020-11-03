const { Router } = require('express');
const axios = require('axios');

const {
  User,
  Survey,
  Request,
  ListingPhotos,
  Listing,
  Invite,
  Availability,
} = require('../index');

const listingPhotosRouter = Router();

listingPhotosRouter
  .get('/:userId', (req, res) => {
    const { userId } = req.params;
    ListingPhotos.findOne({
      where: {
        user_id: userId,
      },
    })
      .then((listing) => {
        res.send(listing);
      })
      .catch((err) => res.status(500).send(err));
  });

module.exports = {
  listingPhotosRouter,
};
