require('dotenv').config();
require('./db/index.js');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { listingRouter } = require('./db/routes/listingRoutes');
const { userRouter } = require('./db/routes/userRoutes');
const { availabilityRouter } = require('./db/routes/availabilityRoutes');
const { mapRouter } = require('./api/Map');

const PORT = process.env.PORT || 3000;
/// ///////////////////////// MIDDLEWARE ////////////////////////////
const app = express();
app.use('/auth', require('./routes/jwtAuth'));
app.use('/dashboard', require('./routes/dashboard'));

app.use('/listing', listingRouter);
app.use('/user', userRouter);
app.use('/availability', availabilityRouter);
app.use('/map', mapRouter);
app.use(express.static(path.join(__dirname, '../build')));
app.use(express.json()); // req.body
app.use(cors());
app.use(cookieParser());
/// ///////////////////////// ROUTES ////////////////////////////
/// ///////////////////////// CONFIRM DATABASE CONNECTION ////////////////////////////
app.listen(PORT, () => {
  console.log(`Listening on port :${PORT}!`);
});