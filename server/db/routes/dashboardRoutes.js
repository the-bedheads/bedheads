const { Router } = require('express');
const axios = require('axios');
const { Op } = require('sequelize');
const fetch = require("node-fetch");

const {
  User,
  Survey,
  Request,
  ListingPhotos,
  Listing,
  Invite,
  Availability,
} = require('../index');

const dashboardRouter = Router();

dashboardRouter
  .get('/', (req, res) => {
    console.log('GOT A PING TO THE DASHBOARD ROUTER!!!!!');
    const results = {};
    const { userId, listingId } = req.query;
    // axios.get('/listing', )
    const url = `http://localhost:3000/availability/countSwaps/${userId}`;
    console.log(url);
    axios.get(url)
    // console.log(swapCount);
      .then((swaps) => console.log('swaps:', swaps.data))
      .catch((err) => console.log('ERROR', err, 'ERROR'));
    res.send('hello!!!!!!');
  });

module.exports = {
  dashboardRouter,
};
