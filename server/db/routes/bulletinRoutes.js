const { Router } = require('express');
const Sequelize = require('sequelize');
const axios = require('axios');

const {
  Bulletin,
} = require('../index');

const bulletinRouter = Router();

bulletinRouter.get('/', (req, res) => {
  Bulletin.findAll({})
    .then((posts) => res.send(posts))
    .catch((err) => res.send(err.message));
});

module.exports = {
  bulletinRouter,
};
