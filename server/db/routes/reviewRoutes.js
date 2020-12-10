const { Router } = require('express');
const { Op } = require('sequelize');
const {
  User,
  Listing,
  Availability,
  Reviews
} = require('../index');
const reviewRouter = Router();
const listingRouter = Router();

// TODO: GET ALL REVIEWS: Get all of a user's reviews about them as a GUEST or HOST

let reviews;
let hostId;
let guestId;
let result;

reviewRouter
  .get('/getReviews/:listingId', async (req, res) => {
    const { listingId } = req.params;
    reviews = await Reviews.findAll({
      where: {
        listingId,
      },
      order: [
        ['createdAt', 'DESC'],
      ],
      include: {
        model: User,
      },
    })
    res.send(reviews);
  })

reviewRouter
  .post('/newReview', async (req, res) => {
    let {
      guestRating, // TODO: user as guest
      hostRating, // TODO: user as host
      guestReview, // TODO: review of user as a guest
      hostReview, // TODO: review of user as a host
      isComplete, // TODO: Boolean for other routes
      userId, // TODO: Logged in user (Reviewer)
      hostId, // TODO: Person user is reviewing (Reviewee)
      listingProfileId, // TODO: Listing id (ref listing profile)
    } = req.body.params;
    await Listing.findOne({
      where: {
        id: listingProfileId, // Find listing id
        // userId: hostId, // Find its owner, the host
      },
    })
      .then(dataValues => {
        console.info(dataValues);
        let listingHostId = dataValues.userId; // reviewee (the host)
        let listingProfileId = dataValues.id; // availability, prob not used

        Reviews.create({
          guestRating: guestRating,
          hostRating: hostRating,
          hostComments: hostReview,
          guestComments: guestReview,
          completed: isComplete,
          reviewerId: userId,
          revieweeId: listingHostId,
          listingId: listingProfileId,
        })
          .then(() => {
            res.status(200).send('Review submitted');
          })
          .catch(err => {
            res.status(401).send('Error submitting review')
          })
      })
      .catch(err => res.send(err.message));

  });

// TODO: Find the author of a review
reviewRouter
  .get('/getAuthor', async (req, res) => {
    const { reviewerId } = req.body.params;
    const author = await User.findOne({
      where: {
        id: reviewerId,
      },
    })
    res.send(author);
  })

// TODO: Set user's rating
reviewRouter
  .get('/updateRating', async (req, res) => {
    const { hostRating } = req.body.params;
    const rating = await User.findAll({
      where: {
        hostRating: hostRating,
      },
    })
    res.send(rating);
  })

module.exports = {
  reviewRouter,
};
