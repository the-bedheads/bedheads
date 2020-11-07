require('dotenv').config();
const axios = require('axios');
const { Router } = require('express');
const { config } = require('../utils/personalityTraits');

const personalityRouter = Router();

personalityRouter.post('/', async (req, res) => {
  const { text } = req.body;
  config.data = text;
  const obj = {};
  // console.log(config);
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

// TODO: Use axios request on front end to hit here, passing along all needed things. Then you can make the call to the IBM thingy here.
// var axios = require('axios');
// var data = 'I have scored more professional soccer goals than anyone in the history of the game, 184 to be exact, but I never once witnessed the ball hit the net. Although my eyes were open and aimed in the right direction, as soon as leather met rope the picture went black—not a slow fade, but a swift guillotine chop that separated the scene from my ability to see it.
// \n
// \nMy mind celebrated while my vision, blinded from adrenaline, lagged a beat behind, and by the time the two equalized there was a party on the field: high fives and hell yeahs, upraised arms and pumping legs and bouncing ponytails. I thrived on these brief blackouts, these zaps of instant amnesia. For thirty years scoring goals was my currency, the one skill I could barter for security and acceptance and love. Rarely did my frenetic brain pause long enough to consider what might come next, and how the shape of my life would look without soccer to fill it up.
// \n
// \nNow it’s November 2015, two weeks after I announced my retirement, and my life is in no shape at all. President Obama recently called me and my teammates “badass” and I feel entirely unworthy of the term. I either sleep for 12-hour stretches or not at all, roaming the hallways of my hotel or impulse shopping online. The only time I break a sweat is when I hustle to the minibar. I am at my heaviest weight, my hibernation weight. I am cultivating Olympic-caliber love handles. ABBY WAMBACH HAS A SERIOUS BAKED GOODS ADDICTION, reports espn.com, and it’s a charge I can’t deny. Room service delivers at least one basket of muffins per day. In an effort to carb-shame myself, I Instagram every one that touches my lips, accompanied by self-flagellating hashtags: #cantstop. #socialpressure. #onedayatatime.
// \n
// \nIt doesn’t work. I remain unashamed. The muffins keep coming. I study old pictures of myself—American flag draped over sculpted arms, face tipped up to the cheering crowd—and marvel not only at my physique but at my expression; I look much happier than I was.';

// var config = {
//   method: 'post',
//   url: 'https://api.us-south.personality-insights.watson.cloud.ibm.com/instances/f034c242-4f09-415c-8436-532ecc4fba7b/v3/profile?version=2017-10-13',
//   headers: { 
//     'Content-Type': 'text/plain;charset=utf-8', 
//     'Accept': 'application/json', 
//     'Authorization': 'Basic YXBpa2V5OndiQUtBZVRSeHVPNmRpSmhtTmdTbXZlbVVKYWhUSG1nY01CMUhiWVVaWlU0'
//   },
//   data : data
// };

// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });

module.exports = { 
  personalityRouter
};
