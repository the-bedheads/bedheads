const Sequelize = require('sequelize');
require('dotenv').config();

const {
  DATABASE,
  USER_NAME,
  USER_PASSWORD,
  HOST,
  DB_PORT,
} = process.env;

const db = new Sequelize({
  dialect: 'postgres',
  host: HOST,
  port: DB_PORT,
  username: USER_NAME,
  password: USER_PASSWORD,
  database: DATABASE,
  logging: false,
});

const UserModel = require('./Models/user');
const SurveyModel = require('./Models/survey');
const RequestModel = require('./Models/request');
const ListingPhotosModel = require('./Models/listingPhotos');
const ListingModel = require('./Models/listing');
const InviteModel = require('./Models/invite');
const AvailabilityModel = require('./Models/availability');

const User = UserModel(db, Sequelize);
const Survey = SurveyModel(db, Sequelize);
const Request = RequestModel(db, Sequelize);
const ListingPhotos = ListingPhotosModel(db, Sequelize);
const Listing = ListingModel(db, Sequelize);
const Invite = InviteModel(db, Sequelize);
const Availability = AvailabilityModel(db, Sequelize);

// User.sync();

// db.sync()
//   .then(() => console.info('database & tables created'))
//   .catch((err) => console.error('err in sync', err));

db.sync({ force: true })
  .then(() => console.log('✅🎃✅ Connected to database'))
  .catch(() => console.log('❌☠️❌ Database connection failed'));

// db.authenticate()
//   .then(() => console.log('✅🎃✅ Connected to database'))
//   .catch(() => console.log('❌☠️❌ Database connection failed'));

module.exports.db = db;
