const router = require('express').Router();
const bcrypt = require('bcryptjs');
const {
  db,
  User,
  PersonalityScale,
  Survey,
  Reviews
} = require('../db/index.js');
const validEmail = require('../utils/validEmail');
const generateToken = require('../utils/jsonWebToken');
const authorize = require('../utils/authorize');
const axios = require('axios');
const { listingRouter } = require('../db/routes/listingRoutes');
const { Listing } = require('../index');

router.post('/register', async (req, res) => {
  const {
    firstName,
    lastName,
    pronouns,
    email,
    password,
    profilePhotoUrl: pic,
    q1,
    q2,
    q3,
    q4,
    q5,
    q6,
    q7,
    q8,
    q9,
    q10,
  } = req.body;
  const compiledResponse = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10].join(' ');
  try {
    const existingUser = await User.findOne({
      where: {
        email,
      },
    });
    if (existingUser === null && password.length >= 6) {
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        firstName,
        lastName,
        pronouns,
        email,
        password: hashedPassword,
        profilePhoto: pic,
        userBio: 'No bio created yet',
      });

      const user = await User.findOne({
        where: {
          email,
        },
      });

      await Survey.create({
        userId: user.id,
        q1response: q1,
        q2response: q2,
        q3response: q3,
        q4response: q4,
        q5response: q5,
        q6response: q6,
        q7response: q7,
        q8response: q8,
        q9response: q9,
        q10response: q10,
      });

      await axios.post(`http://${process.env.HOST}:${process.env.PORT}/personality`, {
        body: compiledResponse,
      })
        .then(({ data }) => {
          const {
            openness,
            conscientiousness,
            extraversion,
            agreeableness,
            neuroticism,
          } = data;
          PersonalityScale.create({
            userId: user.id,
            openness,
            conscientiousness,
            extraversion,
            agreeableness,
            neuroticism,
          });
        })
        .catch((err) => console.warn('error from IBM API Call'));

      const jwtToken = generateToken(user.id);
      res.json({ jwtToken });
    } else {
      res.status(401).json('User already exists, try again!');
    }
  } catch (err) {
    console.warn(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/login', validEmail, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user === null) {
      return res.status(401).json('User not found!');
    }
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json('Please provide a valid password.');
    }
    const jwtToken = generateToken(user.id);

    // TODO: Verify token is being created
    res.json({ jwtToken });
  } catch (err) {
    console.warn(err.message);
    res.status(500).send('Server error!');
  }
});

router.post('/verify', authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.warn(err.message);
    res.status(500).send('Error verifying user token.');
  }
});

router.post('/invite', (req, res) => {
  const { email, newUserEmail, verificationCode } = req.body;
  User.findOne({
    where: {
      email,
    },
  })
    .then((results) => {
      const senderId = results.id;
      const query = db.query(`INSERT INTO invites (verificationCode, newUserEmail, senderId) 
      VALUES ('${verificationCode}', '${newUserEmail}', '${senderId}');`);
      res.status(200).send('Invited friend to Goldilocks!');
    })
    .catch((err) => {
      res.status(500).send('Error inviting friend');
    });
});

module.exports = router;
