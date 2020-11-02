const jwt = require("jsonwebtoken");
require("dotenv").config();
const { webTokenSecret } = process.env;

module.exports = (req, res, next) => {
  try {
    const token = req.header("token");
    console.log("Token", token);

    // Check if invalid token
    if (!token) {
      return res.status(403).json({ msg: "Authorization denied, no token!" });
    }

    const verify = jwt.verify(token, webTokenSecret);
    console.log(req.user);
    req.user = verify.user;
    console.log("verified user id", verify.user); // { id: 28 }
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid web token" });
  }
};
