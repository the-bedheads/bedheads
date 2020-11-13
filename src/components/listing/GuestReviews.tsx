import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Grid,
  List,
  ListItemText,
} from '@material-ui/core';
import ReviewList from './ReviewList';

interface ReviewInt {
  allReviews: any,
  listingId: number,
}

const GuestReviews: React.FC<ReviewInt> = ({ allReviews, listingId }): JSX.Element => {
  const [author, setAuthor] = useState<string>('Krissy');
  const [reviewData, setReviewData] = useState<any>([{
    timestamp: null,
    comments: null,
  }]);
  const [data, setData] = useState([]);
  const [timeStamp, setTimestamp] = useState<string>('June 10, 1992');

  const getGuestReviews = () => {
    axios.get(`/reviews/getReviews/${listingId}`)
      .then((reviewInfo) => {
        if (!reviewInfo) {
          setReviewData('Sorry, there are no reviews for this user.');
        }
        return reviewInfo.data.map((info: { createdAt: any; guestComments: any; }) => {
          const {
            createdAt,
            guestComments,
          } = info;
          setReviewData([{
            timestamp: createdAt,
            comments: guestComments,
          }]);
          return reviewData;
        });
      })
      .catch((err) => err.message);
  };

  const renderReviews = () => {
    console.info(allReviews);
    const reviews = allReviews
      .map((review: { createdAt: any; hostComments: any; }) => (
        <List>
          <ListItemText>
            {`Date: ${review.createdAt}`}
          </ListItemText>
          <ListItemText>
            {review.hostComments}
          </ListItemText>
        </List>
      ));
    return reviews;
  };

  useEffect(() => {
    getGuestReviews();
  }, []);

  return (
    <>
      {renderReviews()}
    </>
  );
};

export default GuestReviews;
