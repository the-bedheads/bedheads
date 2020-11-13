const { Router } = require('express');
const {
  Availability,
  Reviews
} = require('../index');
const reviewRouter = Router();

// TODO: GET ALL REVIEWS: Get all of a user's reviews about them as a GUEST or HOST

reviewRouter
  .get('/allReviews/:userId', async (req, res) => {
    const { userId } = req.body.params;
    await Reviews.findAll({
      order: [
        ['updatedAt', 'DESC'],
      ],
      where: {
        revieweeId: userId,
      },
    })
      .then((dataValues) => {
        res.send(dataValues);
      })
      .catch(err => console.warn('Error loading reviews...'))
  })

// TODO: Write a review
reviewRouter
  .post('/newReview', async (req, res) => {
    let { guestRating, hostRating, guestReview, hostReview, isComplete, userId, hostId, avyId } = req.body.params;
    await Availability.findOne({
      where: {
        guest_id: Number(userId)
      }
    })
      .then(({ dataValues }) => {
        hostId = dataValues.host_id;
        avyId = dataValues.id;

        Reviews.create({
          guestRating: guestRating,
          hostRating: hostRating,
          hostComments: hostReview,
          guestComments: guestReview,
          completed: isComplete,
          reviewerId: userId,
          revieweeId: hostId,
          availabilityId: avyId,
        })
          .then(() => {
            res.status(200).send('Review submitted');
          })
          .catch(err => {
            res.status(401).send('You must complete a swap with this user to leave a review.')
          })
      })
      .catch(err => res.send(err.message));

  });

module.exports = {
  reviewRouter,
};
