const jwt = require('jsonwebtoken');
require('dotenv').config();
const { webTokenSecret } = process.env;

module.exports = async (req, res, next) => {
  try {
    const token = req.header('jwt_token');
    // Check if invalid token
    if (!token) {
      return res.status(403).json({ msg: 'Authorization denied, no token!' });
    }
    const payload = jwt.verify(token, webTokenSecret);
    req.user = payload.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid web token' });
  }
};
