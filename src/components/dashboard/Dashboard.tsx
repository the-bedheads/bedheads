import React, { useState, useEffect, SyntheticEvent } from 'react';
import axios from 'axios';
import { createGenerateClassName, Button } from '@material-ui/core';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppType } from 'goldilocksTypes';
import { Link } from 'react-router-dom';
import Navbar from '../global/Navbar';
import ListingModal from '../listing/ListingModal';

interface AuthProps {
  handleLogin: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
  user: AppType,
}

const Dashboard: React.FC<AuthProps> = ({
  handleLogin: [isAuth, setAuth],
  user,
}) => {
  // const listingId = 1;
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
    // setRandomLink(randomListings[shownIndex].listingId);
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
        <div id="random-listing">
          <p>Need a weekend getaway?</p>
          {
            randomListings.length > 0
            && (
              <div>
                <p>
                  {randomListings[shownIndex].hostName}
                  {' '}
                  has a room open in
                  {' '}
                  {randomListings[shownIndex].city}
                </p>
                <p>
                  {randomListings[shownIndex].startDate}
                  {' to '}
                  {randomListings[shownIndex].endDate}
                </p>
              </div>
            )
          }
          <Link to={`/listing/${randomLink}`}>
            <Button type="button">
              View Listing!
            </Button>
          </Link>
          <button type="submit" onClick={getNewListing}>Show me another!</button>
        </div>
      );
    }
    return (
      <div>
        It looks like you don&apos;t have a listing yet. Let&apos;s fix that!
        <Button onClick={handleOpen}>
          Create Listing
        </Button>
        <ListingModal
          handleClose={handleClose}
          handleClickOff={handleClickOff}
          handleTextChange={handleTextChange}
          toggleSwitch={toggleSwitch}
          setPhotoUrl={setPhotoUrl}
          open={open}
        />
      </div>
    );
  };

  return (
    <>
      <h4>
        Hello,
        {' '}
        {user.firstName}
        !!
      </h4>
      <div id="user-notifications">
        <p>
          You have
          {' '}
          {swapCount}
          {' '}
          upcoming trips.
        </p>
        <p>
          You have
          {' '}
          {pendingRequestCount}
          {' '}
          requests to swap rooms
        </p>
      </div>
      {listingCheck()}
    </>
  );
};

export default Dashboard;
