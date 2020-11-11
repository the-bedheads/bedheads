const { Router } = require('express');

const {
  User,
  Survey,
  Request,
  ListingPhotos,
  Listing,
  Invite,
  Availability,
  Reviews
} = require('../index');

const reviewRouter = Router();

// TODO: Get all reviews for a user's listing profile
reviewRouter
  .get('/:userId', async (req, res) => {
    const { userId } = req.params;
    const test = await Reviews.findAll({
      order: [
        ['updatedAt', 'DESC'],
      ],
    },
      {
        where: {
          user_id: userId,
        },
      })
      .then((allReviews) => res.send(allReviews))
      .catch(err => console.warn('Error loading reviews...'))
  })

// TODO: Write a review
reviewRouter
  .post('/newReview', async (req, res) => {
    // TODO: Availability.findOne
    const { guestRating, hostRating, guestReview, hostReview, isComplete, userId } = req.body;
    await Availability.findOne({
      where: {
        guest_id: userId
      }
    })
      .then(({ dataValues }) => {
        Reviews.create({
          guestRating: guestRating,
          hostRating: hostRating,
          hostComments: hostReview,
          guestComments: guestReview,
          completed: isComplete,
          reviewerId: userId,
          revieweeId: dataValues.host_id,
          availabilityId: dataValues.id,
        })
          .then((review) => {
            res.status(200).send('Review submitted');
          })
          .catch(err => {
            res.status(401).send('You must complete a swap with this user to leave a review.')
          })
      })
      .catch(err => res.send(err.message));

  });
// const { ratingValue, review, isComplete } = req.body;


// User.findOne({
//   where: {
//     email,
//   },
// })
//   .then((results) => {
//     const revieweeId = results.id;
//     await db.query(`INSERT INTO reviews (host_rating, host_comments, completed) 
//     VALUES ('${ratingValue}', '${review}', '${isComplete}');`);
//     res.status(200).send('Review submitted!');
//   })
//   .catch((err) => {
//     res.status(500).send('Trouble submitting review...');
//   });

module.exports = {
  reviewRouter,
};
