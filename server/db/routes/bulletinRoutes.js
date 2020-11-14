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
      as: 'author',
      include: {
        model: Listing,
      },
    },
  })
    .then((posts) => res.send(posts))
    .catch((err) => res.send(err.message));
});

bulletinRouter.post('/', (req, res) => {
  const { userId, title, body } = req.body;
  Bulletin.create({
    userId,
    title,
    body,
  })
    .then(() => res.send('success adding bulletin!'))
    .catch(() => res.send('error adding bulletin'));
});

module.exports = {
  bulletinRouter,
};
