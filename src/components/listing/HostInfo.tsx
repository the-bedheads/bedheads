import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button, Box, Typography, Card, CardActions, CardContent,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const HostInfo = (props: any) => {
  const classes = useStyles();
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
      <Box textAlign="center" color="inherited" margin="normal">
        <Button
          component={Link}
          to={
            {
              pathname: '/hostProfile',
              state: { hostData },
            }
          }
          variant="contained"
        >
          <img
            src="https://i.ibb.co/ZMtTcsm/bettythedog.jpg"
            alt="dog portrait"
            width="150"
          />
        </Button>
      </Box>
      <br />
      <Typography>
        Host:
        {' '}
        {hostData.firstName}
        {' '}
        {hostData.lastName}
      </Typography>
      <Typography>
        Rating:
        {' '}
        {hostData.hostRating}
      </Typography>
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
