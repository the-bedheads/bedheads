import React, { useState, useEffect, SyntheticEvent } from 'react';
import axios from 'axios';
import {
  Button,
  Container,
  Grid,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppType } from 'goldilocksTypes';
import { Link } from 'react-router-dom';
import ListingModal from '../listing/ListingModal';

interface AuthProps {
  handleLogin: [React.Dispatch<React.SetStateAction<boolean>>],
  user: AppType,
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    padding: '25px',
  },
  container: {
    backgroundColor: '#7694af',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
  },
  greeting: {
    backgroundColor: '#6e8010',
  },
  upcoming: {
    backgroundColor: '#90789e',
  },
  requests: {
    backgroundColor: '#ff176d',
  },
  msg: {
    backgroundColor: 'bisque',
  },
  create: {
    backgroundColor: 'white',
  },
}));

const Dashboard: React.FC<AuthProps> = ({
  handleLogin: [setAuth],
  user,
}) => {
  const classes = useStyles();
  const [randomListings, setRandomListings] = useState<any>([]);
  const [shownIndex, setShownIndex] = useState(0);
  const [swapCount, setSwapCount] = useState(0);
  const [pendingRequestCount, setPendingRequestCount] = useState(0);
  const [randomLink, setRandomLink] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(user.id);
  const [hasListing, setHasListing] = useState(false);
  const [open, setOpen] = useState(false);
  const [listingDescription, setListingDescription] = useState('listing');
  const [listingAddress, setListingAddress] = useState('address');
  const [listingCity, setListingCity] = useState('city');
  const [listingState, setListingState] = useState('state');
  const [listingZipCode, setListingZipCode] = useState('zip');
  const [listingTitle, setListingTitle] = useState('title');
  const [pets, setPets] = useState(false);
  const [ada, setAda] = useState(false);
  const [smoking, setSmoking] = useState(false);
  const [roommates, setRoommates] = useState(false);
  const [internet, setInternet] = useState(false);
  const [privateBath, setPrivateBath] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');

  const getRandomAvlb = () => {
    const len = randomListings.length;
    return Math.floor(Math.random() * len);
  };

  const getDashboardInfo = () => {
    axios.get('/dashboardInfo', {
      params: {
        userId: localStorage.userId,
      },
    })
      .then(({ data }) => {
        const {
          confirmedSwapCount,
          pendingRequests,
          openAvailabilities,
        } = data;
        setSwapCount(confirmedSwapCount);
        setPendingRequestCount(pendingRequests.count);
        setRandomListings(openAvailabilities);
        const i = 0;
        setShownIndex(i);
        if (randomListings.length) {
          const { id, listingId } = randomListings[shownIndex];
          setRandomLink(`${listingId}/${id}`);
        }
      });
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    string: string,
  ) => {
    if (string === 'listingDescription') {
      setListingDescription(e.target.value);
    } else if (string === 'listingAddress') {
      setListingAddress((e.target.value).toLowerCase());
    } else if (string === 'listingCity') {
      setListingCity((e.target.value).toLowerCase());
    } else if (string === 'listingState') {
      setListingState((e.target.value).toLowerCase());
    } else if (string === 'listingZipCode') {
      setListingZipCode(e.target.value);
    } else if (string === 'listingTitle') {
      setListingTitle(e.target.value);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (i: React.MouseEvent<HTMLButtonElement, MouseEvent>, check: boolean) => {
    if (check) {
      axios.post('/listing', {
        listingAddress,
        listingCity,
        listingState,
        listingZipCode,
        listingTitle,
        listingDescription,
        pets,
        ada,
        smoking,
        roommates,
        internet,
        privateBath,
        userId,
        photoUrl,
      })
        .then(() => {
          getDashboardInfo();
          setHasListing(true);
        })
        .catch((err) => console.warn(err));
      // save changes to DB
      // update field on screen
    }
    setOpen(false);
  };

  const toggleSwitch = (string: string) => {
    if (string === 'pets') {
      setPets(!pets);
    } else if (string === 'ada') {
      setAda(!ada);
    } else if (string === 'smoking') {
      setSmoking(!smoking);
    } else if (string === 'roommates') {
      setRoommates(!roommates);
    } else if (string === 'internet') {
      setInternet(!internet);
    } else if (string === 'privateBath') {
      setPrivateBath(!privateBath);
    }
  };

  const handleClickOff = () => {
    setOpen(false);
  };

  const getProfile = async () => {
    try {
      const res = await fetch(`http://${process.env.HOST}:${process.env.PORT}/dashboard`, {
        method: 'POST',
        headers: { jwt_token: localStorage.token, email: user.email },
      });
      const parseData = await res.json();
      setAuth(true);
      setUserEmail(parseData.email);
      setUserName(parseData.first_name);
    } catch (err) {
      console.warn(err.message);
    }
  };

  const getListingInfo = async () => {
    await axios.get(`listing/user/${userId}`)
      .then(({ data }) => {
        if (data) {
          setHasListing(true);
        }
      });
  };

  const logout = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      localStorage.removeItem('token');
      setAuth(false);
      toast.success('Successfully logged out!');
    } catch (err) {
      console.warn(err.message);
    }
  };

  const getNewListing = () => {
    setShownIndex(getRandomAvlb());
    const { id, listingId } = randomListings[shownIndex];
    setRandomLink(`${listingId}/${id}`);
  };

  const postUserInfo = () => {
    axios.post('/dashboard', {
      params: {
        userEmail,
      },
    })
      .then((results) => {
        const { data } = results;
        console.warn('hit post User info');
      });
  };

  useEffect(() => {
    getDashboardInfo();
    getProfile();
    getListingInfo();
  }, []);

  // This should eventually live in another component. Or something. This is messy.
  const listingCheck = () => {
    if (hasListing) {
      return (
        <Grid id="random-listing">
          <p>Need a weekend getaway?</p>
          {
            randomListings.length > 0
            && (
              <Grid>
                <p>
                  {`${randomListings[shownIndex].hostName} has a room open in ${randomListings[shownIndex].city}`}
                </p>
                <p>
                  {`${randomListings[shownIndex].startDate} to ${randomListings[shownIndex].endDate}`}
                </p>
              </Grid>
            )
          }
          <Link to={`/view-listing/${randomLink}`}>
            <Button type="button">
              View Listing!
            </Button>
          </Link>
          <button type="submit" onClick={getNewListing}>Show me another!</button>
        </Grid>
      );
    }
    return (
      <>
        <Grid item className={classes.msg} xs={8}>
          It looks like you don&apos;t have a listing yet.
        </Grid>
        <Grid item className={classes.create} xs={8}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
          >
            Let&apos;s fix that!
          </Button>
          <ListingModal
            handleClose={handleClose}
            handleClickOff={handleClickOff}
            handleTextChange={handleTextChange}
            toggleSwitch={toggleSwitch}
            setPhotoUrl={setPhotoUrl}
            open={open}
          />
        </Grid>
      </>
    );
  };

  return (
    <Container className={classes.root}>
      <Grid container className={classes.container} xs={11} spacing={3}>
        <Grid item className={classes.greeting} xs={8}>
          <h4>
            {`Hello, ${user.firstName}!!`}
          </h4>
        </Grid>
        <Grid item className={classes.upcoming} xs={8}>
          <h4>
            {`You have ${swapCount} upcoming trips`}
          </h4>
        </Grid>
        <Grid item className={classes.requests} xs={8}>
          <h4>
            {`You have ${pendingRequestCount} requests to swap rooms`}
          </h4>
        </Grid>
        {listingCheck()}
      </Grid>
    </Container>
  );
};

export default Dashboard;
