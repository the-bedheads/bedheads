const axios = require('axios');
const { Router } = require('express');
const { cloudinary } = require('../utils/cloudinary');
const { User, ListingPhotos, Listing } = require('../db/index');

// const { multerUploads, dataUri } = require('../middleware/multer');

const imageRouter = Router();

imageRouter.get('/', (req, res) => {
  res.send('You made a get request but you ain\'t getting nothin\' back!');
});

imageRouter.get('/newProfilePicture', async (req, res) => {
  const { image } = req.query;
  const uploadedImage = await cloudinary.uploader
    .upload(image);
  res.send(uploadedImage.url);
});

imageRouter.post('/newPhoto', async (req, res) => {
  const { data } = req.body;
  const uploadedImage = await cloudinary.uploader
    .upload(data);
  res.send(uploadedImage.url);
});

imageRouter.post('/addListingPhoto/:userId', async (req, res) => {
  const { userId } = req.params;
  const { data } = req.body;
  const image = await cloudinary.uploader
    .upload(data);
  Listing.findOne({
    where: {
      userId,
    },
  })
    .then(({ dataValues }) => {
      const { id } = dataValues;
      ListingPhotos.create({
        userId,
        url: image.url,
        listingId: id,
      })
        .then(() => res.send(image.url))
        .catch((err) => console.warn(err));
    })
    .catch((err) => console.warn(err));
});

imageRouter.post('/profile', async (req, res) => {
  try {
    const fileString = req.body.data;
    const uploadedImage = await cloudinary.uploader
      .upload(fileString);
    res.json({ data: uploadedImage });
    res.end();
  } catch (error) {
    console.warn(error);
    res.status(500).json({ msg: error });
  }
});

imageRouter.put('/editProfilePic/:userId', async (req, res) => {
  const { userId } = req.params;
  const { data } = req.body;
  const newImage = await cloudinary.uploader
    .upload(data);
  const newUserStuff = await User.update({
    profilePhoto: newImage.url,
  }, {
    where: { id: userId },
  });
  res.send(newImage.url);
});

module.exports = {
  imageRouter,
};
