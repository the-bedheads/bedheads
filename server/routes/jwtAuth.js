const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { db, User, PersonalityScale, Survey } = require('../db/index.js');
const validEmail = require('../utils/validEmail');
const generateToken = require('../utils/jsonWebToken');
const authorize = require('../utils/authorize');
const axios = require('axios');

router.post('/register', async (req, res) => {
  const {
    firstName, lastName, pronouns, email, password, profilePhotoUrl: pic,
    q1, q2, q3, q4, q5, q6, q7, q8, q9, q10,
  } = req.body;
  const compiledResponse = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10].join(' ');
  // console.info('compiled response:', compiledResponse);
  try {
    // TODO: Confirm values are being passed through (for debugging)
    // console.info("Entered variables", firstName, lastName, pronouns, email, password, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10);
    const existingUser = await User.findOne({
      where: {
        email,
      },
    });
    console.log('tried to find a user');
    if (existingUser === null && password.length >= 6) {
      const hashedPassword = await bcrypt.hash(password, 10);

      console.log('now awaiting user creation');
      await db.query(`INSERT INTO users (first_name, last_name, pronouns, email, password, profile_photo) 
      VALUES ('${firstName}', '${lastName}', '${pronouns}', '${email}', '${hashedPassword}', '${pic}');`);

      const user = await User.findOne({
        where: {
          email,
        },
      });

      console.log('just got back a user. new user\'s id: ', user.id);
      // console.info('responses:', q1.length, q2.length, q3.length, q4.length, q5.length, q6.length, q7.length, q8.length, q9.length, q10.length);
      // await db.query(`INSERT INTO surveys (q1response, q2response, q3response, q4response,
      //    q5response, q6response, q7response, q8response, q9response, q10response, user_id)
      // VALUES ('${q1}', '${q2}', '${q3}', '${q4}', '${q5}', '${q6}',
      //  '${q7}', '${q8}', '${q9}', '${q10}', '${user.id}');`);
      const survey = await Survey.create({
        user_id: user.id,
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
      })
        .then(() => console.info('survey added to db'))
        .catch((err) => err);

      console.log('now making a post request to axios personality route');
      await axios.post(`http://${process.env.HOST}:${process.env.PORT}/personality`, {
        body: compiledResponse,
      })
        .then((ha) => console.info('getting data back from IBM API call:', ha.data))
        .catch((err) => console.warn('error from IBM API Call. line 43 in jwtauth'));

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
    console.info({ jwtToken });
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
      const query = db.query(`INSERT INTO invites (verificationCode, newUserEmail, sender_id) 
      VALUES ('${verificationCode}', '${newUserEmail}', '${senderId}');`);
      res.status(200).send('Invited friend to Goldilocks!');
    })
    .catch((err) => {
      res.status(500).send('Error inviting friend');
    });
});

module.exports = router;
