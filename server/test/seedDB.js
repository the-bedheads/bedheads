require('dotenv').config();
const userData = require('./sampleData/users');
const listingData = require('./sampleData/listings');
const availabilityData = require('./sampleData/availabilities');
const requestData = require('./sampleData/requests');
const listingPhotosData = require('./sampleData/listingPhotos');
const personalityData = require('./sampleData/personalityScales');
const messageData = require('./sampleData/message');
const threadData = require('./sampleData/thread');
const bulletinData = require('./sampleData/bulletin');

const {
  User,
  Survey,
  Request,
  ListingPhotos,
  Listing,
  Invite,
  Availability,
  PersonalityScale,
  Message,
  Thread,
  Bulletin,
} = require('../db/index');

const seed = async () => {
  await User.bulkCreate(userData)
    .then(({ length }) => {
      if (length) {
        console.info(`✅🎃✅ ${length} users successfully added to DB`);
      } else {
        console.warn('❌☠️❌ USERS not added');
      }
    });
  await Listing.bulkCreate(listingData)
    .then(({ length }) => {
      if (length) {
        console.info(`✅🎃✅ ${length} listings successfully added to DB`);
      } else {
        console.warn('❌☠️❌ LISTINGS NOT ADDED');
      }
    });
  await Availability.bulkCreate(availabilityData)
    .then(({ length }) => {
      if (length) {
        console.info(`✅🎃✅ ${length} availabilities successfully added to DB`);
      } else {
        console.warn('❌☠️❌ AVAILABILITIES NOT ADDED');
      }
    });
  await Request.bulkCreate(requestData)
    .then(({ length }) => {
      if (length) {
        console.info(`✅🎃✅ ${length} requests successfully added to DB`);
      } else {
        console.warn('❌☠️❌ REQUESTS NOT ADDED');
      }
    });
  await ListingPhotos.bulkCreate(listingPhotosData)
    .then(({ length }) => {
      if (length) {
        console.info(`✅🎃✅ ${length} listing photos successfully added to DB`);
      } else {
        console.warn('❌☠️❌ LISTING PHOTOS NOT ADDED');
      }
    });
  await PersonalityScale.bulkCreate(personalityData)
    .then(({ length }) => {
      if (length) {
        console.info(`✅🎃✅ ${length} personality scales successfully added to DB`);
      } else {
        console.warn('❌☠️❌ PERSONALITY SCALES NOT ADDED');
      }
    });
  await Thread.bulkCreate(threadData)
    .then(({ length }) => {
      if (length) {
        console.info(`✅🎃✅ ${length} threads successfully added to DB`);
      } else {
        console.warn('❌☠️❌ THREADS NOT ADDED');
      }
    });
  await Message.bulkCreate(messageData)
    .then(({ length }) => {
      if (length) {
        console.info(`✅🎃✅ ${length} messages successfully added to DB`);
      } else {
        console.warn('❌☠️❌ MESSAGES NOT ADDED');
      }
    });
  await Bulletin.bulkCreate(bulletinData)
    .then(({ length }) => {
      if (length) {
        console.info(`✅🎃✅ ${length} bulletins successfully added to DB`);
      } else {
        console.warn('❌☠️❌ BULLETINGS NOT ADDED');
      }
    });
};

seed();
