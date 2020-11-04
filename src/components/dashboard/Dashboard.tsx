import React, { useState, useEffect, SyntheticEvent } from 'react';
import axios from 'axios';
import { createGenerateClassName } from '@material-ui/core';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../global/Navbar';

interface AuthProps {
  handleLogin: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const Dashboard: React.FC<AuthProps> = ({ handleLogin: [isAuthenticated, setAuth] }) => {
  // const userEmail = 'khellstorm@gmail.com';
  // const userId = 1;
  const listingId = 1;
  // const userName = 'Kyle';
  const [randomListings, setRandomListings] = useState<any>([]);
  const [shownIndex, setShownIndex] = useState(0);
  const [swapCount, setSwapCount] = useState(0);
  const [pendingRequestCount, setPendingRequestCount] = useState(0);

  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(1);
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
  //     console.error(err.message);
  //   }
  // };

  const getProfile = async () => {
    try {
      const res = await fetch('http://localhost:3000/dashboard', {
        method: 'POST',
        headers: { jwt_token: localStorage.token },
      });
      console.log('Auth state is ', isAuthenticated);
      console.log(userName, userEmail);
      const parseData = await res.json();
      console.log(parseData);
      setUserEmail(parseData.email);
      setUserName(parseData.first_name);
      console.log('final getprof');
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      localStorage.removeItem('token');
      setAuth(false);
      toast.success('Successfully logged out!');
    } catch (err) {
      console.error(err.message);
    }
  };

  const getRandomAvlb = () => {
    const len = randomListings.length;
    return Math.floor(Math.random() * len);
  };

  const getNewListing = () => {
    setShownIndex(getRandomAvlb());
  };

  const postUserInfo = () => {
    axios.post('/dashboard', {
      params: {
        userEmail,
      },
    })
      .then((results) => {
        const { data } = results;
        console.log('hit post User info');
      });
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
    // checkAuth();
    getProfile();
  }, []);

  return (
    <>
      <h4>
        Hello,
        {' '}
        {userName}
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
