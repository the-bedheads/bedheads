require('dotenv').config();
const axios = require('axios');
const { Router } = require('express');
const { config } = require('../utils/personalityTraits');

const personalityRouter = Router();

personalityRouter.post('/', async (req, res) => {
  const { text } = req.body;
  config.data = text;
  const obj = {};
  await axios(config)
    .then((response) => {
      const { personality } = response.data;
      personality.forEach(trait => {
        obj[trait.name] = trait.percentile;
      });
    })
    .catch((error) => console.warn(error));
  res.send(obj);
});

module.exports = { 
  personalityRouter
};
