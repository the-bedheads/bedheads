import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Grid,
} from '@material-ui/core';
import ReviewList from './ReviewList';

interface ReviewInt {
  allReviews: any,
  listingId: number,
}

const HostReviews: React.FC<ReviewInt> = ({ allReviews, listingId }): JSX.Element => {
  const [author, setAuthor] = useState<string>('Krissy');
  const [reviewData, setReviewData] = useState<any>([{
    timestamp: null,
    comments: null,
  }]);
  const [data, setData] = useState([]);
  const [timeStamp, setTimestamp] = useState<string>('June 10, 1992');

  const getHostReviews = () => {
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
      .map((review: { createdAt: any; guestComments: any; }) => (
        <Grid>
          <Typography>
            {`Date: ${review.createdAt}`}
          </Typography>
          <Typography>
            {review.guestComments}
          </Typography>
        </Grid>
      ));
    return reviews;
  };

  useEffect(() => {
    getHostReviews();
  }, []);

  return (
    <>
      {renderReviews()}
    </>
  );
};

export default HostReviews;
