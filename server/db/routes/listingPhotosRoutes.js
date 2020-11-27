const { Router } = require('express');
const { ListingPhotos } = require('../index');

const listingPhotosRouter = Router();

listingPhotosRouter
  .get('/:userId', (req, res) => {
    const { userId } = req.params;
    ListingPhotos.findOne({
      where: {
        userId: Number(userId),
      },
    })
      .then((listing) => {
        res.send(listing);
      })
      .catch((err) => res.status(500).send(err));
  });

// by listingId
listingPhotosRouter
  .get('/byListingId/:listingId', (req, res) => {
    const { listingId } = req.params;
    ListingPhotos.findOne({
      where: {
        listingId,
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
