const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./db/index.js');

const PORT = process.env.PORT || 3000;
<<<<<<< HEAD
const { listingRouter } = require("./db/routes/listingRoutes");
const { userRouter } = require("./db/routes/userRoutes");
const { availabilityRouter } = require("./db/routes/availabilityRoutes");
const { dashboardRouter } = require("./db/routes/dashboardRoutes.js");
const { mapRouter } = require("./api/Map");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { requestRouter } = require("./db/routes/requestRoutes.js");
const { listingPhotosRouter } = require("./db/routes/listingPhotosRoutes.js");
=======
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { listingRouter } = require('./db/routes/listingRoutes');
const { userRouter } = require('./db/routes/userRoutes');
const { availabilityRouter } = require('./db/routes/availabilityRoutes');
const { dashboardRouter } = require('./db/routes/dashboardRoutes.js');
const { mapRouter } = require('./api/Map');
const { requestRouter } = require('./db/routes/requestRoutes.js');
const { imageRouter } = require('./api/cloudinaryRoutes');
>>>>>>> (add) call to server to add image to cloudinary

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const DIR = path.join(__dirname, '../build');
const html_file = path.join(DIR, 'index.html');
app.use(express.static(DIR));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

/// ///////////////////////// ROUTES ////////////////////////////
app.use(express.static(path.join(__dirname, '../build')));

app.use('/auth', require('./routes/jwtAuth'));
app.use('/dashboard', require('./routes/dashboard'));

<<<<<<< HEAD
app.use("/listing", listingRouter);
app.use("/user", userRouter);
app.use("/availability", availabilityRouter);
app.use("/dashboardInfo", dashboardRouter);
app.use("/request", requestRouter);
app.use("/map", mapRouter);
app.use("/listingPhotos", listingPhotosRouter);
app.get("/*", (req, res) => {
=======
app.use('/listing', listingRouter);
app.use('/user', userRouter);
app.use('/availability', availabilityRouter);
app.use('/dashboardInfo', dashboardRouter);
app.use('/request', requestRouter);
app.use('/map', mapRouter);
app.use('/image', imageRouter);

app.get('/*', (req, res) => {
>>>>>>> (add) call to server to add image to cloudinary
  res.render(html_file);
});

app.listen(PORT, () => {
  console.log(`Listening on port :${PORT}!`);
});
