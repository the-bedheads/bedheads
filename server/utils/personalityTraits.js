require('dotenv').config();

const url = process.env.PERSONALITY_INSIGHTS_URL;
const apiKey = process.env.PERSONALITY_INSIGHTS_API_KEY_2;

const config = {
  method: 'post',
  url,
  headers: { 
    'Content-Type': 'text/plain;charset=utf-8', 
    'Accept': 'application/json', 
    'Authorization': `Basic ${apiKey}`
  },
};

module.exports = { 
  config
};
