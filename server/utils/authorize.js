const jwt = require("jsonwebtoken");
require("dotenv").config();
const { webTokenSecret } = process.env;

module.exports = (req, res, next) => {
  // Get token from the header
  const token = req.header("jwt_token");
  console.log("Token", token);

  // Check if invalid token
  if (!token) {
    return res.status(400).json({ msg: "Authorization denied!" });
  }

  // Otherwise, verify the session
  try {
    const verify = jwt.verify(token, webTokenSecret);
    console.log("req.user", req.user);
    req.user = verify.user;
    console.log("is verified");
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid web token" });
  }
};
