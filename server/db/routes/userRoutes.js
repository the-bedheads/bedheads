const { Router } = require('express');
const { User } = require('../index');

const userRouter = Router();

userRouter
  .get('/', (req, res) => {
    User.findAll()
      .then((users) => res.send(users))
      .catch((err) => res.status(500).send(err));
  })
  .get('/email/:address', (req, res) => {
    const { address } = req.params;
    User.findOne({
      where: {
        email: address,
      },
    })
      .then((user) => res.send(user))
      .catch((err) => res.status(500).send(err));
  })
  .get('/byId/:id', (req, res) => {
    const { id } = req.params;
    User.findOne({
      where: {
        id,
      },
    })
      .then((user) => res.send(user))
      .catch((err) => res.status(500).send(err));
  });

module.exports = {
  userRouter,
};
