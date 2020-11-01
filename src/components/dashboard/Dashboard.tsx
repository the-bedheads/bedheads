import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createGenerateClassName } from '@material-ui/core';

interface UserInfo {
  createdAt: string;
  dob: string;
  email: string;
  first_name: string;
  guestRating: number;
  hostRating: number;
  id: number;
  inviteCount: number;
  last_name: string;
  password: string;
  profilePhoto: string;
  pronouns: string;
  swapCount: number;
  updatedAt: string;
}

interface ListingInfo {
  ada: boolean;
  createdAt: string;
  id: number;
  internet: boolean;
  listingAddress: string;
  listingDescription: string;
  listingTitle: string;
  pets: boolean;
  privateBath: boolean;
  roommates: boolean;
  smoking: boolean;
  updatedAt: string;
  user_id: number;
}

const Dashboard = () => {
  const userEmail = 'khellstorm@gmail.com';
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(0);
  const [userListingId, setUserListingId] = useState(0);
  const [randomListings, setRandomListings] = useState([]);
  const [swapCount, setSwapCount] = useState(0);

  axios.get(`/user/email/${userEmail}`)
    .then(({ data }) => {
      const info: UserInfo = data;
      setUserName(info.first_name);
      setUserId(info.id);
    })
    // .then(() => {
    //   axios.get(`/listing/user/${userId}`)
    //     .then(({ data }) => {
    //       console.log(data);
    //     })
    //     .catch(() => console.log('no listing found for that user'));
    // })
    .catch((err) => console.error(err));

  useEffect(() => {
    axios.get(`/user/email/${userEmail}`)
      .then(({ data }) => {
        const info: UserInfo = data;
        console.log(info, 'info');
        setUserName(info.first_name);
        setUserId(info.id);
        return info.id;
      })
      // .then((id) => {
      //   axios.get(`/listing/user/${id}`)
      //     .then(({ data }) => {
      //       console.log(data, 'data');
      //     })
      //     .catch(() => console.log('no listing found for that user'));
      // })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      Dashboard Page (Where the user arrives after logging in)
      <h4>
        Hello,
        {userName}
      </h4>
      <div className="user-notifications" />
    </>
  );
};

export default Dashboard;
