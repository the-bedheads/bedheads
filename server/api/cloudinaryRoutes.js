const axios = require('axios');
const { Router } = require('express');
const { cloudinary } = require('../utils/cloudinary');

const imageRouter = Router();

imageRouter.get('/', (req, res) => {
  res.send('You made a get request but you ain\'t getting nothin\' back!');
})

imageRouter.post('/profile', async (req, res) => {
  try {
    const fileString = req.body.data;
    const uploadedImage = await cloudinary.uploader
      .upload(fileString, {
        upload_preset: 'goldilocks',
      });
    console.log('image uploaded', uploadedImage);
    res.json({ msg: 'file uploaded' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
});

module.exports = {
  imageRouter,
};
