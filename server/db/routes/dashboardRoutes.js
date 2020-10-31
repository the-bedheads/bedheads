const axios = require('axios');
const { Router } = require('express');
const { Op } = require('sequelize');

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
    // working availability axios call goes here
  });

module.exports = {
  dashboardRouter,
};
