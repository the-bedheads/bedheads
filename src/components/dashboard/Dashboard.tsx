import React, { useState, useEffect, SyntheticEvent } from 'react';
import axios from 'axios';
import { createGenerateClassName } from '@material-ui/core';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppType } from 'goldilocksTypes';
import Navbar from '../global/Navbar';

interface AuthProps {
  handleLogin: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
  user: AppType,
}

const Dashboard: React.FC<AuthProps> = ({
  handleLogin: [isAuthenticated, setAuth],
  user,
}) => {
  const listingId = 1;
  const [randomListings, setRandomListings] = useState<any>([]);
  const [shownIndex, setShownIndex] = useState(0);
  const [swapCount, setSwapCount] = useState(0);
  const [pendingRequestCount, setPendingRequestCount] = useState(0);

  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(user.id);
  const [userListingId, setUserListingId] = useState(0);

  // const checkAuth = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3000/auth/verify', {
  //       method: 'POST',
  //       headers: { jwt_token: localStorage.token },
  //     });

  //     const parseRes = await response.json();

  //     console.log('web token?', parseRes);
  //     if (parseRes === true) {
  //       setAuth(true);
  //     }
  //     setAuth(false);
  //   } catch (err) {
  //     console.warn(err.message);
  //   }
  // };

  const getProfile = async () => {
    try {
      const res = await fetch('http://localhost:3000/dashboard', {
        method: 'POST',
        headers: { jwt_token: localStorage.token, email: user.email },
      });
      const parseData = await res.json();
      setAuth(true);
    } catch (err) {
      console.warn(err.message);
    }
  };

  const getListingInfo = async () => {
    await axios.get(`listing/user/${userId}`)
      .then(({ data }) => {
        console.log(data);
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

  const getRandomAvlb = () => {
    const len = randomListings.length;
    return Math.floor(Math.random() * len);
  };

  const getNewListing = () => {
    setShownIndex(getRandomAvlb());
  };

  const getDashboardInfo = () => {
    axios.get('/dashboardInfo', {
      params: {
        userId,
        listingId,
      },
    })
      .then((results) => {
        const { data } = results;
        setSwapCount(data.confirmedSwapCount);
        setPendingRequestCount(data.pendingRequests.count);
        setRandomListings(data.openAvailabilities);
        setShownIndex(getRandomAvlb());
      });
  };

  useEffect(() => {
    getDashboardInfo();
    getProfile();
  }, []);

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
        <button type="submit">View Listing!</button>
        <button type="submit" onClick={getNewListing}>Show me another!</button>
      </div>
      <button
        className="btn btn-success btn-block"
        type="submit"
        onClick={(e) => logout(e)}
      >
        Logout
      </button>
    </>
  );
};

export default Dashboard;
