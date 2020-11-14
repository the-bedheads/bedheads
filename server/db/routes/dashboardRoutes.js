const { Router } = require('express');
const axios = require('axios');

const h = process.env.HOST;
const p = process.env.PORT;
const dashboardRouter = Router();

dashboardRouter
  .get('/', async (req, res) => {
    const results = {};
    const obj = {};
    const { userId } = req.query;
    const swapCountUrl = `http://${h}:${p}/availability/countSwaps/${userId}`;
    const availabilityArrayUrl = `http://${h}:${p}/availability/mineIdOnly/${userId}`;
    const otherAvailabilitiesUrl = `http://${h}:${p}/availability/others/currentUser/${userId}`;
    const countRequestUrl = `http://${h}:${p}/request/countByArray`;

    // Get count of current user's outstanding/upcoming swaps
    await axios.get(swapCountUrl)
      .then((swaps) => {
        results.confirmedSwapCount = swaps.data.count;
      })
      .catch((err) => console.warn(err));

    // Find list of availabilities that current user has
    await axios.get(availabilityArrayUrl)
      .then((arr) => {
        const { data } = arr;
        obj.avlbArray = data;
      })
      .catch((err) => console.warn(err));

    // If user has no availabilites, don't look for pending requests
    if (obj.avlbArray.length) {
      await axios.get(countRequestUrl, {
        params: {
          arr: obj.avlbArray,
        },
      })
        .then((requests) => {
          results.pendingRequests = requests.data;
        })
        .catch((err) => console.warn(err));
    } else {
      results.pendingRequests = {
        count: 0,
      };
    }

    // Get availabilities that current user could potentially request/swap with
    await axios.get(otherAvailabilitiesUrl)
      .then((avails) => {
        const { data } = avails;
        obj.avails = data;
      })
      .catch((err) => console.warn(err));

    // Add host name and city to availabilities found in above axios call
    const getAccumulatedData = async () => {
      const arr = [];
      await Promise.all(obj.avails.map(async (avlb) => {
        const newObj = {};
        const { listingId, host_id: hostId } = avlb;
        const listingUrl = `http://${h}:${p}/listing/byId/${listingId}`;
        const userUrl = `http://${h}:${p}/user/byId/${hostId}`;
        await axios.get(listingUrl)
          .then(({ data }) => {
            newObj.city = data.listingCity;
          })
          .catch((err) => console.warn(err));
        await axios.get(userUrl)
          .then(({ data }) => {
            newObj.hostName = data.first_name;
          })
          .catch((err) => console.warn(err));
        const blah = await Object.assign(avlb, newObj);
        arr.push(blah);
        return blah;
      }));
      return arr;
    };

    const bigData = await getAccumulatedData()
      .then((data) => data);
    results.openAvailabilities = bigData;
    res.send(results);
  });

module.exports = {
  dashboardRouter,
};
