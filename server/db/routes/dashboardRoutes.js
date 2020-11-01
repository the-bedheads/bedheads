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
                  .then(async (avails) => {
                    const { data } = avails;
                    const getBigData = async () => Promise.all(data.map(async (avlb) => {
                      const obj = {};
                      const { listing_id, host_id } = avlb;
                      const listingUrl = `http://localhost:3000/listing/byId/${listing_id}`;
                      const userUrl = `http://localhost:3000/user/byId/${host_id}`;
                      const first = await axios.get(listingUrl)
                        .then(async (listing) => {
                          obj.city = listing.data.listingCity;
                          const second = await axios.get(userUrl)
                            .then((user) => {
                              obj.hostName = user.data.first_name;
                              return Object.assign(avlb, obj);
                            })
                            .catch((err) => res.status(500).send(err));
                          return second;
                        })
                        .catch((err) => res.status(500).send(err));
                      return first;
                    }))
                    const bigData = await getBigData()
                      .then((datum) => datum)
                    results.openAvailabilities = bigData;
                    res.send(results);
                  })
                  .catch((err) => res.status(500).send(err));
              })
              .catch((err) => res.status(501).send(err));
          })
          .catch((err) => res.status(502).send(err));
      })
      .catch((err) => res.status(503).send(err));
  });

module.exports = {
  dashboardRouter,
};
