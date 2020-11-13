const { Router } = require('express');
const Sequelize = require('sequelize');
const axios = require('axios');

const {
  Bulletin, User, Listing,
} = require('../index');

const bulletinRouter = Router();

bulletinRouter.get('/', (req, res) => {
  Bulletin.findAll({
    include: {
      model: User,
      include: {
        model: Listing,
      },
    },
  })
    .then((posts) => res.send(posts))
    .catch((err) => res.send(err.message));
});

module.exports = {
  bulletinRouter,
};
