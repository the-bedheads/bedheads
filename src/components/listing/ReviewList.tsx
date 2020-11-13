import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';

interface ReviewProps {
  data: Array<number>,
}

const ReviewList: React.FC<ReviewProps> = ({ data }): JSX.Element => (
  <Grid />
);

export default ReviewList;
