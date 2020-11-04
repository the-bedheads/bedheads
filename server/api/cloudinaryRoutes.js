const axios = require('axios');
const { Router } = require('express');
const { cloudinary } = require('../utils/cloudinary');

const imageRouter = Router();

imageRouter.get('/', (req, res) => {
  res.send('You made a get request but you ain\'t getting nothin\' back!');
});

imageRouter.post('/profile', async (req, res) => {
  console.log('post route got hit');
  try {
    const fileString = req.body.data;
    const uploadedImage = await cloudinary.uploader
      .upload(fileString);
    console.log('uploaded image:::', uploadedImage);
    res.json({ data: uploadedImage });
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
});

module.exports = {
  imageRouter,
};
