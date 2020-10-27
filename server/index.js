const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./db/index.js');
const { listingRouter } = require('./db/routes/listingRoutes');
const { userRouter } = require('./db/routes/userRoutes');
const { availabilityRouter } = require('./db/routes/availabilityRoutes');
const { mapRouter } = require('./api/Map');

const PORT = process.env.PORT || 3000;
const app = express();

app.use('/listing', listingRouter);
app.use('/user', userRouter);
app.use('/availability', availabilityRouter);
app.use('/map', mapRouter);

app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.json());

app.get('/register', (req, res) => {
  res.send('success');
});

app.get('/login', (req, res) => {
  res.send('success');
});

app.get('/user', (req, res) => {
  res.send(req.user);
});

app.get('/logout', (req, res) => {
  req.logout();
  res.send('You have successfully logged out.')
})

app.listen(PORT, () => {
  console.log(`Listening on port :${PORT}!`);
});
