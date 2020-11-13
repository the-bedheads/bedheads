const multer = require('multer');
const Datauri = require('datauri');
const path = require('path');

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');
// const dUri = new Datauri();
// const dataUri = (r) => dUri.format(path.extname(r.file.originalname).toString(), r.file.buffer);

module.exports = {
  multerUploads,
  // dataUri,
};
