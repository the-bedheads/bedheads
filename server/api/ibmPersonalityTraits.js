require('dotenv').config();
const axios = require('axios');
const { Router } = require('express');
const { config } = require('../utils/personalityTraits');

const personalityRouter = Router();

personalityRouter.post('/', async (req, res) => {
  const { body } = req.body;
  config.data = body;
  const obj = {};
  await axios(config)
    .then((response) => {
      const { personality } = response.data;
      personality.forEach(trait => {
        if (trait.name === 'Emotional range') {
          obj.neuroticism = trait.percentile;
        } else {
          obj[trait.name.toLowerCase()] = trait.percentile;
        }
      });
    })
    .catch((error) => console.warn(error));
  res.send(obj);
});

module.exports = {
  personalityRouter,
};
