import React, { useState, useEffect, SyntheticEvent } from 'react';
import axios from 'axios';
import {
  Button,
  Container,
  Grid,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppType } from 'goldilocksTypes';
import { Link } from 'react-router-dom';
import moment from 'moment';
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
  component: {
    backgroundColor: 'white',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  container: {
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
  },
  greeting: {
    // backgroundColor: '#6e8010',
    padding: 10,
  },
  upcoming: {
    backgroundColor: 'rgba(249, 201, 79, 0.4)',
    padding: 10,
    textAlign: 'center',
    marginBottom: 10,
    border: '2px black',
  },
  requests: {
    backgroundColor: 'rgba(249, 201, 79, 0.8)',
    padding: 10,
    textAlign: 'center',
    marginBottom: 10,
  },
  msg: {
    padding: 10,
    textAlign: 'center',
    marginBottom: 10,
  },
  randomBtn: {
    backgroundColor: '10px',
    border: '1px',
    borderRadius: '2px',
    margin: 'auto',
    padding: 10,
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
  const [startAvail, setRandomStart] = useState();
  const [endAvail, setRandomEnd] = useState();

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
      const res = await fetch('http://localhost:3000/dashboard', {
        method: 'POST',
        headers: { jwt_token: localStorage.token, email: user.email },
      });
      const parseData = await res.json();
      setAuth(true);
      setUserEmail(parseData.email);
      setUserName(parseData.firstName);
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
    const {
      id,
      listingId,
      startDate,
      endDate,
    } = randomListings[shownIndex];
    setRandomLink(`${listingId}/${id}`);
    setRandomStart(startDate);
    setRandomEnd(endDate);
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

  const greeting = `hi ${user.firstName},`;
  const swapMsg = `You have ${swapCount} upcoming trips`;
  const requestMsg = `You have ${pendingRequestCount} requests to swap rooms`;
  const createNotif = 'it\'s probably because you don\'t have a listing yet...';
  const suggestionMsg = 'need some plans?';

  useEffect(() => {
    getDashboardInfo();
    getProfile();
    getListingInfo();
  }, []);

  // This should eventually live in another component. Or something. This is messy.
  const listingCheck = () => {
    if (hasListing && randomListings.length) {
      const humanDates = {
        startDate: moment(randomListings[shownIndex].startDate, 'YYYY-MM-DD').format('dddd, MMM Do YYYY'),
        endDate: moment(randomListings[shownIndex].endDate, 'YYYY-MM-DD').format('dddd, MMM Do YYYY'),
      };
      return (
        // <Grid id="random-listing">
        <Grid item className={classes.msg} xs={10}>
          <Grid item xs={12} style={{ paddingBottom: 5 }}>
            <Typography variant="body1">
              {suggestionMsg}
            </Typography>
            {
              randomListings.length > 0
              && (
                <Grid container item xs={12}>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      {`${randomListings[shownIndex].hostName} has a room open in ${randomListings[shownIndex].city}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      {`${humanDates.startDate} to ${humanDates.endDate}`}
                    </Typography>
                  </Grid>
                </Grid>
              )
            }
          </Grid>
          <Link to={`/view-listing/${randomLink}`}>
            <Button
              className={classes.randomBtn}
              type="button"
              component={Link}
              to={
                {
                  pathname: `/view-listing/${randomLink}`,
                  state: {
                    startAvail: randomListings[shownIndex] ? randomListings[shownIndex].startDate : '0',
                    endAvail: randomListings[shownIndex] ? randomListings[shownIndex].endDate : '0',
                  },
                }
              }
            >
              View Listing!
            </Button>
          </Link>
          <Button
            className={classes.randomBtn}
            type="submit"
            onClick={getNewListing}
          >
            Show me another!
          </Button>
        </Grid>
      );
    }
    return (
      <>
        <Grid item className={classes.msg} xs={10}>
          <Grid item xs={12} style={{ paddingBottom: 5 }}>
            <Typography variant="body1">
              {createNotif}
            </Typography>
          </Grid>
          <Grid item xs={12}>
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
        </Grid>
      </>
    );
  };

  return (
    <Container className={classes.root}>
      <Grid container className={classes.component} xs={11} spacing={3}>
        <Grid container item className={classes.container} xs={8}>
          <Grid item className={classes.greeting} xs={10}>
            <Typography variant="h3">
              {greeting}
            </Typography>
          </Grid>
          <Grid item className={classes.upcoming} xs={10}>
            <Typography variant="h5">
              {swapMsg}
            </Typography>
          </Grid>
          <Grid item className={classes.requests} xs={10}>
            <Typography variant="h5">
              {requestMsg}
            </Typography>
          </Grid>
          {listingCheck()}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
