const Sequelize = require('sequelize');
require('dotenv').config();

const { DATABASE, USER_NAME, USER_PASSWORD, HOST, DB_PORT } = process.env;

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
const PersonalityScaleModel = require('./Models/personalityScale');
const MessageModel = require('./Models/message');
const ThreadModel = require('./Models/thread');
const BulletinModel = require('./Models/bulletin')
const ReviewsModel = require('./Models/review');

const User = UserModel(db, Sequelize);
const Survey = SurveyModel(db, Sequelize);
const Request = RequestModel(db, Sequelize);
const ListingPhotos = ListingPhotosModel(db, Sequelize);
const Listing = ListingModel(db, Sequelize);
const Invite = InviteModel(db, Sequelize);
const Availability = AvailabilityModel(db, Sequelize);
const PersonalityScale = PersonalityScaleModel(db, Sequelize);
const Message = MessageModel(db, Sequelize);
const Thread = ThreadModel(db, Sequelize);
const Bulletin = BulletinModel(db, Sequelize);
const Reviews = ReviewsModel(db, Sequelize);

const models = {
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
  Reviews
};

Object.keys(models).forEach((model) => {
  if (models[model].associate) {
    models[model].associate(models);
  }
});

db.sync()
  .then(() => console.info('✅ 🎃 ✅ Connected to database'))
  .catch((err) => console.warn(`❌ ${err}`));

module.exports = {
  db,
  models,
  User,
  Listing,
  Survey,
  Request,
  ListingPhotos,
  Invite,
  Availability,
  PersonalityScale,
  Thread,
  Message,
  Bulletin,
  Reviews
};
