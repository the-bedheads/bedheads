import React, { useState, FC, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, makeStyles } from '@material-ui/core';
import { AppInterface, Availability } from 'goldilocksTypes';
import SwapList from './SwapList';

const useStyles = makeStyles({
  main: {
    paddingTop: '10px',
    paddingBottom: '10px',
    marginTop: '25px',
    backgroundColor: 'white',
    maxHeight: '90%',
    overflow: 'auto',
  },
});

const Swaps: FC<AppInterface> = ({ user }) => {
  const classes = useStyles();
  const [newUser] = useState(user);
  const [accSwaps, setAccSwaps] = useState<Array<Availability>>([]);
  const [pendingSwaps, setPendingSwaps] = useState<Array<Availability>>([]);
  const [completedSwaps, setCompletedSwaps] = useState<Array<Availability>>([]);

  const getCalendar = async () => {
    const avbId = await axios.get(`listing/user/${user.id}`)
      .then(({ data }) => data.id)
      .catch((err) => console.warn(err.message));
    const allAvb = await axios.get(`availability/allAvailabilities/${avbId}`)
      .then(({ data }) => data)
      .catch((err) => console.warn(err.message));
    const tempAcc: Array<Availability> = [];
    const tempPending: Array<Availability> = [];
    const tempCompleted: Array<Availability> = [];
    allAvb.forEach((entry: Availability) => {
      const { type } = entry;
      if (type === 'swap') {
        tempAcc.push(entry);
      } else if (type === 'req') {
        tempPending.push(entry);
      } else if (type === 'complete') {
        tempCompleted.push(entry);
      }
    });
    setAccSwaps(tempAcc);
    setPendingSwaps(tempPending);
    setCompletedSwaps(tempCompleted);
  };

  const checkConfirmed = () => {
    if (accSwaps.length) {
      return (
        <Grid>
          <Grid>
            These swaps have been confirmed. Have fun!
          </Grid>
          <Grid>
            <SwapList swaps={accSwaps} />
          </Grid>
        </Grid>
      );
    }
    return (
      <Grid>
        You don&apos;t have any upcoming swaps.
      </Grid>
    );
  };

  const checkPending = () => {
    if (pendingSwaps.length) {
      return (
        <Grid>
          <Grid>
            These swaps need your approval. What do you think?
          </Grid>
          <Grid>
            <SwapList swaps={pendingSwaps} />
          </Grid>
        </Grid>
      );
    }
    return (
      <Grid>
        You don&apos;t have any requests.
      </Grid>
    );
  };

  const checkReviews = () => {
    if (completedSwaps.length) {
      return (
        <Grid>
          <Grid>
            These swaps have already happened. Please submit a review for your experience!
          </Grid>
          <Grid>
            <SwapList swaps={completedSwaps} />
          </Grid>
        </Grid>
      );
    }
    return (
      <Grid>
        You don&apos;t have any pending reviews.
      </Grid>
    );
  };

  useEffect(() => {
    getCalendar();
  }, [newUser]);

  return (
    <Container className={classes.main}>
      {`Hello, ${user.firstName}!`}
      {checkConfirmed()}
      {checkPending()}
      {checkReviews()}
    </Container>
  );
};

export default Swaps;
