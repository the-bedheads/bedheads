import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const HostInfo = (props: any) => {
  const {
    hostId,
    userId,
    avbId,
  } = props;
  const [hostData, setHostData] = useState({
    firstName: '',
    lastName: '',
    pronouns: '',
    hostRating: '',
    id: 0,
    profilePhoto: '',
    userBio: '',
  });

  const getHost = () => {
    axios.get(`/user/${hostId}`)
      .then(({ data }) => {
        const {
          firstName,
          lastName,
          pronouns,
          hostRating,
          id,
          profilePhoto,
          userBio,
        } = data;
        setHostData({
          firstName,
          lastName,
          pronouns,
          hostRating,
          id,
          profilePhoto,
          userBio,
        });
      })
      .catch((err) => err);
  };

  const requestSwap = () => {
    const params = { userId, avbId };
    axios.post('/request/newRequest', { params });
  };

  useEffect(() => {
    getHost();
  }, []);

  return (
    <div className="host-info">
      <h3>host info</h3>
      <Button
        component={Link}
        to={
          {
            pathname: '/hostProfile',
            state: { hostData },
          }
        }
      >
        <img
          src="https://i.ibb.co/ZMtTcsm/bettythedog.jpg"
          alt="dog portrait"
          width="150"
        />
      </Button>
      {hostData.firstName}
      {' '}
      {hostData.lastName}
      {' '}
      (
      {hostData.pronouns}
      )
      <br />
      host rating:
      {' '}
      {hostData.hostRating}
      <br />
      <Button variant="outlined" color="secondary">
        message host
      </Button>
      <br />
      <br />
      <Button variant="outlined" color="secondary" onClick={requestSwap}>
        request swap
      </Button>
    </div>
  );
};

export default HostInfo;
