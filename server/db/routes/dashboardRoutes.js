const { Router } = require('express');
const axios = require('axios');
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
    const results = {};
    const { userId, listingId } = req.query;
    const swapCountUrl = `http://${process.env.HOST}:${process.env.PORT}/availability/countSwaps/${userId}`;
    axios.get(swapCountUrl)
      .then((swaps) => {
        results.confirmedSwapCount = swaps.data.count;
        const availabilityArrayUrl = `http://${process.env.HOST}:${process.env.PORT}/availability/mineIdOnly/${userId}`;
        axios.get(availabilityArrayUrl)
          .then((arr) => {
            const { data } = arr;
            const countRequestUrl = `http://${process.env.HOST}:${process.env.PORT}/request/countByArray`;
            axios.get(countRequestUrl, {
              params: {
                arr: data,
              },
            })
              .then((requests) => {
                results.pendingRequests = requests.data;
                const otherAvailabilitiesUrl = `http://${process.env.HOST}:${process.env.PORT}/availability/others/currentUser/${userId}`;
                axios.get(otherAvailabilitiesUrl)
                  .then(async (avails) => {
                    const { data } = avails;
                    const getBigData = async () => Promise.all(data.map(async (avlb) => {
                      const obj = {};
                      const { listing_id, host_id } = avlb;
                      const listingUrl = `http://${process.env.HOST}:${process.env.PORT}/listing/byId/${listing_id}`;
                      const userUrl = `http://${process.env.HOST}:${process.env.PORT}/user/byId/${host_id}`;
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
                      .then((datum) => datum);
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
