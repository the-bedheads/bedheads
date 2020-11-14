const { Router } = require('express');
const { User, PersonalityScale } = require('../index');

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
            profilePhoto: user.dataValues.profile_photo,
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
    User.findOne({
      where: {
        email: address,
      },
      include: { model: PersonalityScale },
    })
      .then(({ dataValues }) => {
        const {
          id,
          pronouns,
          dob,
          email,
          swapCount,
          guestRating,
          hostRating,
          inviteCount,
          userBio,
          personalityScale,
        } = dataValues;
        const result = {
          id,
          pronouns,
          dob,
          email,
          profilePhoto: dataValues.profile_photo,
          swapCount,
          guestRating,
          hostRating,
          inviteCount,
          userBio,
          firstName: dataValues.first_name,
          lastName: dataValues.last_name,
          personalityScale,
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
        profilePhoto: dataValues.profile_photo,
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

// get user's personality data
userRouter
  .get('/personalityData/:userId', (req, res) => {
    const { userId } = req.params;
    PersonalityScale.findOne({
      where: {
        userId,
      },
      include: { model: User },
    })
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send(err));
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
