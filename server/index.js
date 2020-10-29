const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./db/index.js');
const { listingRouter } = require('./db/routes/listingRoutes');
const { userRouter } = require('./db/routes/userRoutes');
const { availabilityRouter } = require('./db/routes/availabilityRoutes');

const PORT = process.env.PORT || 3000;
const app = express();

app.use('/listing', listingRouter);
app.use('/user', userRouter);
app.use('/availability', availabilityRouter);

app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Listening on port :${PORT}!`);
});
