const { Router } = require('express');
const { ListingPhotos } = require('../index');

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
