import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Box,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { HostInfoInterface } from 'goldilocksTypes';
import MessageModal from '../messages/MessageModal';

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
    marginBottom: '20px',
  },
});

const HostInfo: FC<HostInfoInterface> = (props): JSX.Element => {
  const classes = useStyles();
  const {
    hostId,
    userId,
    avbId,
    dates,
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
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

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
    const params = { userId, avbId, dates };
    axios.post('/request/newRequest', { params })
      .catch((err) => console.warn(err));
  };

  useEffect(() => {
    getHost();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = async (
    i: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    check: boolean,
  ) => {
    if (check) {
      const params = {
        userId,
        hostId: hostData.id,
        newMessage: message,
        activeThread: 0,
      };
      const threadId = await axios.get('/message/thread', { params })
        .then(({ data }) => data.id);
      params.activeThread = threadId;
      await axios.post('/message/newMessage', { params });
      setMessage('');
    }
    setOpen(false);
  };

  const handleClickOff = () => {
    setOpen(false);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="host-info">
      <Box
        textAlign="center"
        color="inherited"
        margin="normal"
        className={classes.pos}
      >
        <Button
          component={Link}
          to={
            {
              pathname: '/view-hostProfile',
              state: { hostData, userId },
            }
          }
          variant="contained"
        >
          <img
            src={hostData.profilePhoto}
            alt="dog portrait"
            width="100%"
          />
        </Button>
      </Box>
      <Typography>
        {`Host: ${hostData.firstName} ${hostData.lastName}`}
      </Typography>
      <Typography className={classes.pos}>
        {`Rating: ${hostData.hostRating}`}
      </Typography>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleOpen}
        className={classes.pos}
      >
        message host
      </Button>
      <MessageModal
        handleClose={handleClose}
        handleClickOff={handleClickOff}
        handleTextChange={handleTextChange}
        message={message}
        open={open}
        name={hostData.firstName}
      />
      <Button
        variant="outlined"
        color="secondary"
        onClick={requestSwap}
        className={classes.pos}
      >
        request swap
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        component={Link}
        to={
          {
            pathname: '/writeReview',
          }
        }
      >
        write review
      </Button>
    </div>
  );
};

export default HostInfo;
