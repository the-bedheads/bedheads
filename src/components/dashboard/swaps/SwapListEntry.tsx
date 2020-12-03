import React, { useState, useEffect, FC } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { SwapListEntryInterface } from 'goldilocksTypes';
import {
  Grid,
  Box,
  makeStyles,
  Button,
  Container,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { flexibleCompare } from '@fullcalendar/react';

const useStyles = makeStyles({
  main: {
    width: '75%',
  },
  boxStyle: {
    display: 'flex',
    justifyContent: 'center',
    height: '200px',
    margin: '15px 0px',
  },
  imageStyle: {
    width: '240px',
    height: '170px',
    margin: 'auto',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  imgStyle: {
    margin: 'auto',
    display: 'block',
    position: 'absolute',
    objectFit: 'cover',
    width: '80%',
    height: '100%',
  },
  bottomBorder: {
    borderStyle: 'none none solid none',
    borderWidth: 'thin',
    padding: '4px',
    flex: 0,
  },
  buttonGridStyle: {
    justify: 'center',
    alignItems: 'center',
    height: '100%',
  },
  infoHolderStyle: {
    display: 'flex',
    flexDirection: 'column',
  },
  outerStyle: {
    flex: '1',
  },
  innerStyle: {
    height: '100%',
  },
  centerStyle: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const SwapListEntry: FC<SwapListEntryInterface> = ({ swap, guestId, type }) => {
  const classes = useStyles();
  const [swappee, setSwappee] = useState({ firstName: '' });
  const [photo, setPhoto] = useState('');
  const [address, setAddress] = useState('');
  const [userId] = useState(localStorage.userId);
  const [listingId, setListingId] = useState(0);
  const [swappeeAvbId, setSwappeeAvbId] = useState(0);

  const approveSwap = () => {
    const params = {
      avbId: swap.availabilityId,
      guestId,
    };
    axios.post('/availability/confirm', { params })
      .then((result) => (result ? toast.success('Swap approved!', {
        position: 'bottom-right'
      }) : toast.warn('Problem approving swap.', {
        position: 'bottom-right'
      })))
      .catch((err) => console.warn(err.message));
  };

  const declineSwap = () => {
    const params = {
      avbId: swap.availabilityId,
      guestId,
    };
    axios.delete('/request/decline', { params })
      .then((result) => (result ? toast.success('Swap declined.', {
        position: 'bottom-right'
      }) : toast.warn('Trouble declining swap.', {
        position: 'bottom-right'
      })))
      .catch((err) => console.warn(err.message));
  };

  const renderInfo = () => {
    if (type === 'con') {
      return (
        <Grid className={classes.outerStyle}>
          <Container className={classes.innerStyle}>
            <Grid
              className={classes.buttonGridStyle}
              container
              direction="row"
            >
              <Grid item xs={12} className={classes.centerStyle}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={
                    {
                      pathname: `/view-listing/${swap.guestId}/${swappeeAvbId}`,
                      state: {
                        startAvail: swap.start,
                        endAvail: swap.end,
                      },
                    }
                  }
                >
                  View Room!
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      );
    }
    if (type === 'complete') {
      return (
        <Grid className={classes.outerStyle}>
          <Container className={classes.innerStyle}>
            <Grid
              className={classes.buttonGridStyle}
              container
              direction="row"
            >
              <Grid item xs={12} className={classes.centerStyle}>
                <Button
                  component={Link}
                  to={
                    {
                      pathname: '/writeReview',
                      state: {
                        availabilityId: swap.id,
                        reviewerId: userId,
                        revieweeId: guestId,
                      },
                    }
                  }
                  variant="contained"
                >
                  Review Swap!
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      );
    }
    return (
      <Grid className={classes.outerStyle}>
        <Container className={classes.innerStyle}>
          <Grid
            className={classes.buttonGridStyle}
            container
            direction="row"
          >
            <Grid item xs={4} className={classes.centerStyle}>
              <Button
                variant="contained"
                color="primary"
                onClick={approveSwap}
              >
                Approve Swap!
              </Button>
            </Grid>
            <Grid item xs={4} className={classes.centerStyle}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={
                  {
                    pathname: `/view-listing/${listingId}/${swap.availabilityId}`,
                    state: {
                      startAvail: swap.start,
                      endAvail: swap.end,
                    },
                  }
                }
              >
                View Room!
              </Button>
            </Grid>
            <Grid item xs={4} className={classes.centerStyle}>
              <Button
                variant="contained"
                color="secondary"
                onClick={declineSwap}
              >
                Decline Swap!
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    );
  };

  const getRecInfo = async () => {
    const tempListId = await axios.get(`listing/user/${guestId}`)
      .then(({ data }) => {
        setListingId(data.id);
        return data.id;
      });
    await axios.get(`user/${guestId}`)
      .then(({ data }) => {
        setSwappee(data);
      });
    await axios.get(`listingPhotos/byListingId/${tempListId}`)
      .then(({ data }) => {
        setPhoto(data.url);
      });
    await axios.get(`listing/user/${guestId}`)
      .then(({ data }) => {
        setAddress(data.listingAddress);
      });
  };

  const getAvbId = async () => {
    const avbs = await axios.get(`availability/allAvbs/${guestId}`)
      .then(({ data }) => data);
    const match = avbs.filter((avb: { startDate: string; endDate: string; }) => {
      if (avb.startDate === swap.start && avb.endDate === swap.end) {
        return avb;
      }
      return [];
    });
    setSwappeeAvbId(match.id);
  };

  useEffect(() => {
    if (guestId) {
      getRecInfo();
    }
    if (type === 'con') {
      getAvbId();
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
        <Grid xs={9} className={classes.infoHolderStyle}>
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
