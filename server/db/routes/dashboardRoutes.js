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
    const results = {};
    const { userId, listingId } = req.query;
    const swapCountUrl = `http://localhost:3000/availability/countSwaps/${userId}`;
    axios.get(swapCountUrl)
      .then((swaps) => {
        results.confirmedSwapCount = swaps.data.count;
        const availabilityArrayUrl = `http://localhost:3000/availability/mineIdOnly/${userId}`;
        axios.get(availabilityArrayUrl)
          .then((arr) => {
            const { data } = arr;
            const countRequestUrl = 'http://localhost:3000/request/countByArray';
            axios.get(countRequestUrl, {
              params: {
                arr: data,
              },
            })
              .then((requests) => {
                results.pendingRequests = requests.data;
                const otherAvailabilitiesUrl = `http://localhost:3000/availability/others/currentUser/${userId}`;
                axios.get(otherAvailabilitiesUrl)
                  .then((avails) => {
                    const { data } = avails;
                    results.openAvailabilities = data;
                    res.send(results);
                  })
                  .catch((err) => res.status(500).send(err));
                // res.send(results);
              })
              .catch((err) => res.status(500).send(err));
          })
          .catch((err) => res.status(500).send(err));
      })
      .catch((err) => res.status(500).send(err));
  });

module.exports = {
  dashboardRouter,
};
