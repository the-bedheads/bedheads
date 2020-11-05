const jwt = require("jsonwebtoken");
require("dotenv").config();
const { webTokenSecret } = process.env;

module.exports = async (req, res, next) => {
  // const token = req.header("token");
  // console.log("Token", token);

  // // Check if invalid token
  // if (!token) {
  //   return res.status(403).json({ msg: "Authorization denied, no token!" });
  // }

  try {
    const token = req.header("jwt_token");
    console.log("Token", token);

    // Check if invalid token
    if (!token) {
      return res.status(403).json({ msg: "Authorization denied, no token!" });
    }

    // const verify = jwt.verify(token, webTokenSecret);
    // req.user = verify.user;
    const payload = jwt.verify(token, webTokenSecret);
    console.log(payload, 'payload');
    req.user = payload.user;
    // console.log("verified user id", verify.user); // { id: 28 }
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid web token" });
  }
};
