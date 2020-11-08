const router = require('express').Router();
const { db, User } = require('../db/index.js');
const bcrypt = require('bcryptjs');
const validEmail = require('../utils/validEmail');
const generateToken = require('../utils/jsonWebToken');
const authorize = require('../utils/authorize');

router.post("/register", async (req, res) => {

  const { firstName, lastName, pronouns, email, password, profilePhotoUrl: pic, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 } = req.body;
  try {
    // TODO: Confirm values are being passed through (for debugging)
    console.info("Entered variables", firstName, lastName, pronouns, email, password, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10);
    const existingUser = await User.findOne({
      where: {
        email,
      },
    })
    if (existingUser === null && password.length >= 6) {
      const hashedPassword = await bcrypt.hash(password, 10);

      await db.query(`INSERT INTO users (first_name, last_name, pronouns, email, password, profile_photo) 
      VALUES ('${firstName}', '${lastName}', '${pronouns}', '${email}', '${hashedPassword}', '${pic}');`);

      const user = await User.findOne({
        where: {
          email,
        },
      });

      await db.query(`INSERT INTO surveys (q1response, q2response, q3response, q4response, q5response, q6response, q7response, q8response, q9response, q10response, user_id)
      VALUES ('${q1}', '${q2}', '${q3}', '${q4}', '${q5}', '${q6}', '${q7}', '${q8}', '${q9}', '${q10}', '${user.id}');`);

      const jwtToken = generateToken(user.id);
      res.json({ jwtToken });
    } else {
      res.status(401).json("User already exists, try again!");
    }
  } catch (err) {
    console.warn(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", validEmail, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user === null) {
      return res.status(401).json("User not found!");
    }
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json("Please provide a valid password.");
    }
    const jwtToken = generateToken(user.id);

    //TODO: Verify token is being created
    console.info({ jwtToken });
    res.json({ jwtToken });
  } catch (err) {
    console.warn(err.message);
    res.status(500).send("Server error!");
  }
});

router.post('/verify', authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.warn(err.message);
    res.status(500).send("Error verifying user token.");
  }
});

router.post("/invite", (req, res) => {
  const { email, newUserEmail, verificationCode } = req.body;
  User.findOne({
    where: {
      email: email,
    },
  })
    .then((results) => {
      const senderId = results.id;
      const query = db.query(`INSERT INTO invites (verificationCode, newUserEmail, sender_id) 
      VALUES ('${verificationCode}', '${newUserEmail}', '${senderId}');`);
      res.status(200).send("Invited friend to Goldilocks!");
    })
    .catch((err) => {
      res.status(500).send("Error inviting friend");
    });
});

module.exports = router;
