import React, { useState, FC, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid } from '@material-ui/core';
import { AppInterface, Availability } from 'goldilocksTypes';
import SwapList from './SwapList';

const Swaps: FC<AppInterface> = ({ user }) => {
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

  useEffect(() => {
    getCalendar();
  }, [newUser]);

  return (
    <Container>
      {`Hello, ${user.firstName}!`}
      <Grid>
        These swaps have been confirmed. Have fun!
      </Grid>
      <Grid>
        <SwapList swaps={accSwaps} />
      </Grid>
      <Grid>
        These swaps need your approval. What do you think?
      </Grid>
      <Grid>
        <SwapList swaps={pendingSwaps} />
      </Grid>
      <Grid>
        These swaps have already happened. Please submit a review for your experience!
      </Grid>
      <Grid>
        <SwapList swaps={completedSwaps} />
      </Grid>
    </Container>
  );
};

export default Swaps;
