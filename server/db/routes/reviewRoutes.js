const { Router } = require('express');
const { Op } = require('sequelize');
const {
  User,
  Listing,
  Availability,
  Reviews
} = require('../index');
const reviewRouter = Router();

// TODO: GET ALL REVIEWS: Get all of a user's reviews about them as a GUEST or HOST

let reviews;
let hostId;
let guestId;
let result;

reviewRouter
  .get('/getReviews/:listingId', async (req, res) => {
    const { listingId } = req.params;

    reviews = await Availability.findAll({
      where: {
        listingId: listingId,
      }
    })
      .then(res => {
        res.map(info => {
          if (info.dataValues.accepted) {
            guestId = info.dataValues.guest_id;
            hostId = info.dataValues.host_id;
          }
        })
        result = Reviews.findAll({
          where: {
            [Op.and]: [{ revieweeId: hostId }, { reviewerId: guestId }],
          },
          order: [
            ['createdAt', 'DESC'],
          ],
          include: {
            model: User,
            where: {
              id: guestId,
            }
          },
        })
        return result;
      })
      .catch(err => err.message);
    res.send(reviews);
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

module.exports = {
  reviewRouter,
};
