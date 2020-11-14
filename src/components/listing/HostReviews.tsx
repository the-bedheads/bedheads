import React, { useState } from 'react';
import {
  List,
  ListItemText,
  Avatar,
  Grid,
  Divider,
  Container,
  Typography,
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

const HostReviews: React.FC<ReviewInt> = ({ allReviews, listingId, reviewer }): JSX.Element => {
  const classes = useStyles();

  const postReviews = () => {
    const reviews = allReviews
      .map((review: { createdAt: any; guestComments: any; user: any; }) => (
        <List>
          <ListItemText
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            {`Reviewed: ${moment().format('MMMM DD, YYYY')}`}
          </ListItemText>
          <ListItemText>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs
                alignItems="center"
                direction="column"
                justify="center"
                spacing={2}
              >
                <Grid>
                  <Avatar
                    className={classes.large}
                    src={review.user.profile_photo}
                  />
                  <Grid alignItems="center" direction="column" justify="center">
                    <Typography>{review.user.first_name}</Typography>
                  </Grid>
                </Grid>
                <Grid>
                  <Grid item xs={12}>
                    {review.guestComments}
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
    <Container>
      {postReviews()}
    </Container>
  );
};

export default HostReviews;
