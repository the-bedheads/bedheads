const axios = require('axios');
const { Router } = require('express');
const { cloudinary } = require('../utils/cloudinary');

const imageRouter = Router();

imageRouter.get('/', (req, res) => {
  res.send('You made a get request but you ain\'t getting nothin\' back!');
});

imageRouter.get('/newProfilePicture', async (req, res) => {
  console.log('just made it into the add profile picture axios route');
  const { image } = req.query;
  // Do stuff with image string to get back object from cloudinary
  const uploadedImage = await cloudinary.uploader
    .upload(image);
  console.log('url about to be sent back:', uploadedImage.url);
  res.send(uploadedImage.url);

  // .get('/countByArray', (req, res) => {
  //   const { arr } = req.query;
  //   Request.findAndCountAll({
  //     where: {
  //       availability_id: arr,
  //     },
  //   })
  //     .then((count) => res.send(count))
  //     .catch((err) => res.status(500).send(err));
  // })
  // const countRequestUrl = 'http://localhost:3000/request/countByArray';
  // axios.get(countRequestUrl, {
  //   params: {
  //     arr: data,
  //   },
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
