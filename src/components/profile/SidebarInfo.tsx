import React, { FC, useState } from 'react';
import axios from 'axios';
import {
  Grid,
  Container,
  Box,
  makeStyles,
  Button,
} from '@material-ui/core';
import { ProfileSidebarInterface } from 'goldilocksTypes';
import MessageModal from '../messages/MessageModal';

const useStyles = makeStyles({
  main: {
    border: 1,
    borderRadius: 2,
    borderStyle: 'solid',
    justifyContent: 'center',
  },
  imgStyle: {
    height: '100%',
    width: '100%',
    padding: '10px 10px 5px',
  },
  infoStyle: {
    border: 1,
    borderRadius: 2,
    borderStyle: 'solid',
    justifyContent: 'center',
    width: '75%',
    paddingTop: '5px',
    paddingBottom: '5px',
  },
  textStyle: {
    textAlign: 'center',
    wordWrap: 'break-word',
  },
  buttonStyle: {
    padding: '5px 10px 10px',
    justifyContent: 'center',
    display: 'flex',
  },
});

const Sidebar: FC<ProfileSidebarInterface> = ({ host, userId }): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

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
        hostId: host.id,
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
    <Container className={classes.main}>
      <Grid item xs={12}>
        <img
          src={host.profilePhoto}
          alt="Not found"
          className={classes.imgStyle}
        />
      </Grid>
      <Grid item xs={12}>
        <Container className={classes.infoStyle}>
          <Box className={classes.textStyle}>
            {host.firstName}
          </Box>
          <Box className={classes.textStyle}>
            {host.pronouns}
          </Box>
          <Box className={classes.textStyle}>
            New Orleans, LA
          </Box>
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Box className={classes.buttonStyle}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
          >
            {`Message ${host.firstName}`}
          </Button>
          <MessageModal
            handleClose={handleClose}
            handleClickOff={handleClickOff}
            handleTextChange={handleTextChange}
            message={message}
            open={open}
            name={host.firstName}
          />
        </Box>
      </Grid>
      {/* <Grid item xs={12}>
        spotify
      </Grid>
      <Grid item xs={12}>
        instagram
      </Grid> */}
    </Container>
  );
};

export default Sidebar;
