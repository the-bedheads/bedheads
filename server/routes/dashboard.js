const router = require("express").Router();
const authorize = require("../utils/authorize");
const { db, User } = require("../db/index");

router.post("/", authorize, async (req, res) => {
  const { email } = req.headers;
  try {
    const user = await User.findAll({
      where: {
        email,
      },
    });
    res.json(user[0].dataValues);
  } catch (err) {
    console.warn(err.message);
    res.status(500).send("Error authorizing user to dashboard, ln 16");
  }
});
module.exports = router;
