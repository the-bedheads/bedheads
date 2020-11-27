const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (userId) => {
  const payload = {
    user: {
      id: userId,
    },
  };
  return jwt.sign(payload, process.env.webTokenSecret, { expiresIn: "1h" });
};

module.exports = generateToken;
