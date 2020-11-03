const router = require("express").Router();
const authorize = require("../utils/authorize");
const { db, User } = require("../db/index");

// router.post("/", authorize, (req, res) => {
//   const results = {};
//   const { email } = req.query;
//   const user = User.findAll({
//     where: {
//       email: 'poop@gmail.com',
//     },
//   });
//   res.send(user);
//   console.log(req.query);
// });

router.post("/", authorize, async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("reqbodyindashroute", req.body);
    const user = await User.findAll({
      where: {
        email: email,
      },
    });

    console.log(user[0].dataValues);
    res.send(user[0].dataValues);
    // res.status(200).send(user[0].dataValues);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error authorizing user to dashboard, ln 16");
  }
});
module.exports = router;
