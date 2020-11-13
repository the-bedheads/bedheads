import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';

interface ReviewInt {
  allReviews: any,
  listingId: number,
}

const GuestReviews: React.FC<ReviewInt> = ({ allReviews, listingId }): JSX.Element => (
  <Box>{listingId}</Box>
);

export default GuestReviews;
