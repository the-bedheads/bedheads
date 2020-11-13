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

  const getCalendar = () => axios.get(`listing/user/${user.id}`)
    .then(({ data }) => {
      axios.get(`availability/allAvailabilities/${data.id}`)
        // eslint-disable-next-line @typescript-eslint/no-shadow
        .then(({ data }) => {
          const tempAcc: Array<Availability> = [];
          const tempPending: Array<Availability> = [];
          const tempCompleted: Array<Availability> = [];
          data.forEach((entry: Availability) => {
            const { type } = entry;
            if (type === 'swap') {
              tempAcc.push(entry);
            } else if (type === 'req') {
              tempPending.push(entry);
            } else {
              tempCompleted.push(entry);
            }
          });
          setAccSwaps(tempAcc);
          setPendingSwaps(tempPending);
          setCompletedSwaps(tempCompleted);
        });
    });

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
        These swaps are still pending. Check back later!
      </Grid>
      <Grid>
        <SwapList swaps={pendingSwaps} />
      </Grid>
      <Grid>
        These swaps have already happened. Please submit a review for your experience!
      </Grid>
      {/* <SwapList /> */}
    </Container>
  );
};

export default Swaps;
