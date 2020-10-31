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

const listingRouter = Router();

listingRouter
  .get('/', (req, res) => {
    Listing.findAll()
      .then((listings) => res.send(listings))
      .catch((err) => res.status(500).send(err));
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
  });

listingRouter
  .post('/', (req, res) => {
    console.log('made a post request to listings');
  });

module.exports = {
  listingRouter,
};
