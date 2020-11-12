import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';

type ReviewType = {
  hostComments: string,
  guestComments: string,
  author: string,
};

interface ReviewInt {
  review: ReviewType;
}

const ReviewList: React.FC<ReviewInt> = ({ review }): JSX.Element => {
  const [allReviews] = useState(review);

  useEffect(() => {

  }, [allReviews]);

  return (
    <Box>{review.guestComments}</Box>
  );
};

export default ReviewList;
