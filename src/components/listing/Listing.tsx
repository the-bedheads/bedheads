import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { AppInterface, ListingLocationState, ListingLocationInterface } from 'goldilocksTypes';
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
  const location = useLocation<ListingLocationInterface>();
  const [userId] = useState(localStorage.userId);
  const { id } = useParams<{ id: any }>();
  const { avbId } = useParams<{ avbId: any }>();
  const [startAvail] = useState(location.state.startAvail);
  const [endAvail] = useState(location.state.endAvail);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            <ListingInfo listingId={id} />
          </Paper>
          <UserReviews
            listingId={id}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Paper className={classes.paper}>
            <HostInfo
              hostId={id}
              userId={userId}
              avbId={avbId}
              dates={{ startAvail, endAvail }}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Listing;
