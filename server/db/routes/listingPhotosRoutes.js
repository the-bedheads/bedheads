const { Router } = require('express');
const { ListingPhotos } = require('../index');

const listingPhotosRouter = Router();

listingPhotosRouter
  .get('/:userId', (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    ListingPhotos.findOne({
      where: {
        user_id: Number(userId),
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
    console.log(listingId);
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
