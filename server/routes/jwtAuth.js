const router = require("express").Router();
const { db, User } = require("../db/index.js");
const bcrypt = require("bcryptjs");
const validEmail = require("../utils/validEmail");
const generateToken = require("../utils/jsonWebToken");
const authorize = require("../utils/authorize");

// Signup/Register
router.post("/register", async (req, res) => {
  //1. Destructure the req.body (name, email, password)
  // Change back to camel case
  const { firstName, lastName, email, password } = req.body;
  try {
    //2. Check if user exists
    console.log(req.body);
    console.log("Entered variables", firstName, lastName, email, password);
    const existingUser = await User.findOne({
      where: {
        email: email,
      },
    });
    if (existingUser === null && email.length && password.length >= 6) {
      //2.a. If not, bcrypt user's password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);

      // Insert user into database
      // Change back to camel case
      await db.query(`INSERT INTO users (first_name, last_name, email, password) 
      VALUES ('${firstName}', '${lastName}', '${email}', '${hashedPassword}');`);

      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      console.log("USER ID   ", user.id);
      const jwtToken = generateToken(user.id);
      console.log("NUT LMAO", jwtToken);
      return res.json({ jwtToken });
    } else {
      // 2.b. If user already exists, throw error
      return res.status(401).json("Already registered");
    }

    // 3. Generate JWT
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Verify (login) registered user
router.post("/login", validEmail, async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user === null) {
      return res.status(401).send("Invalid credentials, line 53");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    console.log("password is valid?", validPassword);
    if (!validPassword) {
      return res.status(401).send("Invalid Password, line 58");
    }
    const jwtToken = generateToken(user.id);
    console.log({ jwtToken });
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error logging in line 64 jwtAuth.js");
  }
});

router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error verifying user token.");
  }
});

// router.get("/", (req, res) => {
//   res.json({ message: "👽" });
// });

module.exports = router;
