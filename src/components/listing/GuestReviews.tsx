import React, { useState } from 'react';
import {
  Avatar,
  Divider,
  Typography,
  Grid,
  List,
  ListItemText,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import moment from 'moment';

interface ReviewInt {
  allReviews: any,
  listingId: number,
  reviewer: any,
}
const useStyles = makeStyles((theme: Theme) => createStyles({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const GuestReviews: React.FC<ReviewInt> = ({ allReviews, listingId, reviewer }): JSX.Element => {
  const classes = useStyles();

  const postReviews = () => {
    console.info(allReviews);
    // TODO: Helper function
    const reviews = allReviews
      .map((review: { createdAt: any; hostComments: any; user: any; }) => (
        <List>
          <ListItemText>
            {`Reviewed: ${moment().format('MMMM DD, YYYY')}`}
          </ListItemText>
          <ListItemText>
            <Grid
              container
              xs={6}
              spacing={2}
              justify="center"
            >
              <Grid
                item
                xs={3}
                alignItems="flex-end"
                direction="column"
                justify="center"
                spacing={2}
              >
                <Grid
                  item
                  alignItems="center"
                  direction="column"
                  justify="center"
                >
                  <Avatar
                    className={classes.large}
                    src={review.user.profile_photo}
                  />
                  <Grid alignItems="center" direction="column" justify="center">
                    <Typography>{review.user.first_name}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={9}>
                <Grid container>
                  <Grid item justify="center">
                    <Typography>{review.hostComments}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider
              variant="middle"
              light={false}
              orientation="horizontal"
            />
          </ListItemText>
        </List>
      ));
    return reviews;
  };

  return (
    <>
      {postReviews()}
    </>
  );
};

export default GuestReviews;
