require('dotenv').config();
const userData = require('./sampleData/users');
const listingData = require('./sampleData/listings');
const availabilityData = require('./sampleData/availabilities');

const {
  User,
  Survey,
  Request,
  ListingPhotos,
  Listing,
  Invite,
  Availability
} = require('../db/index');

const seed = () => {
  User.bulkCreate(userData)
  .then(results => {
    // console.log("USERS:", results);
    if (results.length) {
      // console.log('Users added to DB:', results);
      console.log(`✅🎃✅ ${results.length} users successfully added to DB`);
    } else {
      console.log('❌☠️❌ USERS not added');
    }
  })
  .then(() => {
    Listing.bulkCreate(listingData)
    .then(results => {
      if (results.length) {
        // console.log('Listings added to DB:', results);
        console.log(`✅🎃✅ ${results.length} listings successfully added to DB`);
      } else {
        console.log('❌☠️❌ LISTINGS NOT ADDED');
      }
    })
  })
  .catch(err => console.error('Database falied to give results. Error:', err));
}

seed();
