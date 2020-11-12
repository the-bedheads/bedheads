const axios = require('axios');
const { Router } = require('express');
const { cloudinary } = require('../utils/cloudinary');
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

// TODO: probably delete this multer junk; doesn't look like I'll need it
// imageRouter.post('/multerUpload', multerUploads, async (req, res) => {
//   // console.log('req.file:', req.file.buffer);
//   const base64data = req.file.buffer.toString('base64');
//   // console.log('length of base64 string: ', base64data.length);
//   const uploadedImage = await cloudinary.uploader.upload(base64data);
//   console.log(uploadedImage);
//   // .then((results) => console.log(results))
//   // .catch((err) => console.warn('dont do that you big dummy'));
//   // console.log(base64data.slice(0, 350));
//   // const { file } = req;
//   // const file = dataUri(req).content;
//   // console.log('real file: ', file);
//   // let uploadedImage;
//   // const reader = new FileReader();
//   // // const reader = new FileReader();

//   // reader.readAsDataURL(file);
//   // // console.log('IDK:', reader.readAsDataURL(image));
//   // reader.onloadend = async () => {
//   //   console.log('READER RESULT (STUPID GIANT STRING): ', reader.result);
//   //   // uploadPhoto(reader.result);
//   //   const uploadedImage = await cloudinary.uploader
//   //     .upload(reader.result);
//   //   console.log('uploaded image: ', uploadedImage);
//   // };
// })

imageRouter.post('/newPhoto', async (req, res) => {
  console.log('hitting the /newPhoto route on the server and trying to ping cloudinary now');
  const { data } = req.body;
  const uploadedImage = await cloudinary.uploader
    .upload(data);
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
