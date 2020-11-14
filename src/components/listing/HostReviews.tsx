import React, { useState } from 'react';
import {
  Avatar,
  Grid,
  Divider,
  Container,
  Typography,
  Paper,
  Box,
} from '@material-ui/core';
import {
  makeStyles,
  createStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import { Rating } from '@material-ui/lab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import moment from 'moment';

interface ReviewInt {
  allReviews: any,
  listingId: number,
  reviewer: any,
}
const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    padding: theme.spacing(0, 3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  paper: {
    maxWidth: 800,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

const HostReviews: React.FC<ReviewInt> = ({ allReviews, listingId, reviewer }): JSX.Element => {
  const classes = useStyles();

  const postReviews = () => {
    const reviews = allReviews
      .map((review: {
        createdAt: any;
        guestComments: any;
        user: any;
        guestRating: any;
      }) => (
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar
                  className={classes.large}
                  src={review.user.profile_photo}
                />
              </Grid>
              <Grid item xs>
                <Typography
                  variant="overline"
                  display="block"
                  component="legend"
                >
                  <Box
                    component="fieldset"
                    fontWeight="fontWeightBold"
                    borderColor="transparent"
                    m={1}
                  >
                    {review.user.first_name}
                    <StyledRating
                      icon={(
                        <FavoriteIcon
                          fontSize="small"
                        />
                        )}
                      name="read-only"
                      value={review.guestRating}
                      readOnly
                    />
                  </Box>
                </Typography>
                <Typography>
                  <Box fontSize={13}>
                    {review.guestComments}
                  </Box>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          <Divider
            light={false}
            orientation="vertical"
          />
        </div>
      ));
    return reviews;
  };

  return (
    <Container>
      {postReviews()}
    </Container>
  );
};

export default HostReviews;
