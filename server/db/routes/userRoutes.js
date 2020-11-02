const { Router } = require('express');

const {
  User,
  Survey,
  Request,
  ListingPhotos,
  Listing,
  Invite,
  Availability,
} = require('../index');

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
  });

// retrieve user info when accessing their listing
userRouter.get('/:userId', (req, res) => {
  const { userId } = req.params;
  User.findOne({
    where: {
      id: userId,
    },
  })
    .then((userInfo) => res.send(userInfo))
    .catch((err) => err);
});

module.exports = {
  userRouter,
};
