const { Router } = require('express');
const { User } = require('../index');

const userRouter = Router();

userRouter
  .get('/', (req, res) => {
    User.findAll()
      .then((users) => {
        const result = users.map((user) => {
          const {
            id,
            pronouns,
            dob,
            email,
            password,
            profilePhoto,
            swapCount,
            guestRating,
            hostRating,
            inviteCount,
            userBio,
          } = user.dataValues;
          return {
            id,
            pronouns,
            dob,
            email,
            password,
            profilePhoto,
            swapCount,
            guestRating,
            hostRating,
            inviteCount,
            userBio,
            firstName: user.dataValues.first_name,
            lastName: user.dataValues.last_name,
          };
        });
        res.send(result);
      })
      .catch((err) => res.status(500).send(err));
  })
  .get('/email/:address', (req, res) => {
    const { address } = req.params;
    console.log('here?');
    User.findOne({
      where: {
        email: address,
      },
    })
      .then((response) => {
        console.log(response, 'wheres my fucking response');
        const {
          id,
          pronouns,
          dob,
          email,
          profilePhoto,
          swapCount,
          guestRating,
          hostRating,
          inviteCount,
          userBio,
        } = response.dataValues;
        const result = {
          id,
          pronouns,
          dob,
          email,
          profilePhoto,
          swapCount,
          guestRating,
          hostRating,
          inviteCount,
          userBio,
          firstName: response.dataValues.first_name,
          lastName: response.dataValues.last_name,
        };
        res.send(result);
      })
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

// retrieve user info when accessing their listing
userRouter.get('/:userId', (req, res) => {
  const { userId } = req.params;
  User.findOne({
    where: {
      id: userId,
    },
  })
    .then(({ dataValues }) => {
      const {
        id,
        pronouns,
        dob,
        email,
        password,
        profilePhoto,
        swapCount,
        guestRating,
        hostRating,
        inviteCount,
        userBio,
      } = dataValues;
      const result = {
        id,
        pronouns,
        dob,
        email,
        password,
        profilePhoto,
        swapCount,
        guestRating,
        hostRating,
        inviteCount,
        userBio,
        firstName: dataValues.first_name,
        lastName: dataValues.last_name,
      };
      res.send(result);
    })
    .catch((err) => err);
});

// get single user
userRouter
  .get('/oneUser/:userId', (req, res) => {
    const { userId } = req.params;
    User.findOne({
      where: {
        id: userId,
      },
    })
      .then((users) => res.send(users))
      .catch((err) => res.status(500).send(err));
  });

// update user info
userRouter
  .patch('/bio/:userId', (req, res) => {
    const { userId } = req.params;
    const { newBio } = req.body.params;
    console.log(req);
    User.update({ userBio: newBio }, {
      where: {
        id: userId,
      },
    })
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err));
  });
module.exports = {
  userRouter,
};
