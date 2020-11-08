const axios = require('axios');
const { Router } = require('express');
const { cloudinary } = require('../utils/cloudinary');

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

imageRouter.post('/newListingPhoto', async (req, res) => {
  // console.log('req.body:', req.body);
  const { photoString } = req.body.data;
  const uploadedImage = await cloudinary.uploader
    .upload(photoString);
  console.log('uploaded image:', uploadedImage.url);
  res.send(uploadedImage.url);
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

module.exports = {
  imageRouter,
};
