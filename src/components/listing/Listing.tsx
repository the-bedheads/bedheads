import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { AppInterface } from 'goldilocksTypes';
import UserReviews from './UserReviews';
import ListingInfo from './ListingInfo';
import HostInfo from './HostInfo';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flewGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Listing: React.FC<AppInterface> = ({ user }): JSX.Element => {
  const classes = useStyles();
  const [userId] = useState(localStorage.userId);
  const { id } = useParams<{ id: any }>();
  const { avbId } = useParams<{ avbId: any }>();

  // const [avbId] = useState(3);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            <ListingInfo listingId={id} />
          </Paper>
          <UserReviews
            user={user}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Paper className={classes.paper}>
            <HostInfo
              hostId={id}
              userId={userId}
              avbId={avbId}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Listing;
