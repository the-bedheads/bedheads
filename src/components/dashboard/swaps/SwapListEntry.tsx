import React, { useState, useEffect, FC } from 'react';
import axios from 'axios';
import { SwapListEntryInterface } from 'goldilocksTypes';
import {
  Grid,
  Box,
  makeStyles,
  Button,
  Container,
} from '@material-ui/core';

const useStyles = makeStyles({
  main: {
    borderStyle: 'solid',
    width: '75%',
  },
  boxStyle: {
    display: 'flex',
    justifyContent: 'center',
  },
  imageStyle: {
    borderStyle: 'none solid none none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgStyle: {
    height: '100%',
    width: '100%',
  },
  bottomBorder: {
    borderStyle: 'none none solid none',
  },
});

const SwapListEntry: FC<SwapListEntryInterface> = ({ swap, guestId, type }) => {
  const classes = useStyles();
  const [swappee, setSwappee] = useState({ firstName: '' });
  const [photo, setPhoto] = useState('');
  const [address, setAddress] = useState('');

  const approveSwap = () => {
    const params = {
      avbId: swap.availability_id,
      guestId,
    };
    axios.post('/availability/confirm', { params })
      .catch((err) => console.warn(err.message));
  };

  const declineSwap = () => {
    const params = {
      avbId: swap.availability_id,
      guestId,
    };
    axios.delete('/request/decline', { params })
      .catch((err) => console.warn(err.message));
  };

  const renderInfo = () => {
    if (type === 'con') {
      return (
        <Grid xs={12}>
          Stuff
          <br />
          <br />
          <br />
        </Grid>
      );
    }
    return (
      <Container>
        <Grid xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={approveSwap}
          >
            Approve Swap!
          </Button>
        </Grid>
        <Grid xs={12}>
          <Button
            variant="contained"
            color="secondary"
            onClick={declineSwap}
          >
            Decline Swap!
          </Button>
        </Grid>
      </Container>

    );
  };

  useEffect(() => {
    if (guestId) {
      axios.get(`user/${guestId}`)
        .then(({ data }) => {
          setSwappee(data);
        });
      axios.get(`listingPhotos/${guestId}`)
        .then(({ data }) => {
          setPhoto(data.url);
        });
      axios.get(`listing/user/${guestId}`)
        .then(({ data }) => {
          setAddress(data.listingAddress);
        });
    }
  }, [guestId]);

  return (
    <Box className={classes.boxStyle}>
      <Grid container spacing={0} className={classes.main}>
        <Grid xs={3} className={classes.imageStyle}>
          <img
            src={photo}
            alt="not found"
            className={classes.imgStyle}
          />
        </Grid>
        <Grid xs={9}>
          <Grid xs={12} className={classes.bottomBorder}>
            {`${swap.start} to ${swap.end}`}
          </Grid>
          <Grid xs={12} className={classes.bottomBorder}>
            {address}
          </Grid>
          <Grid xs={12} className={classes.bottomBorder}>
            {swappee.firstName}
          </Grid>
          {renderInfo()}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SwapListEntry;
