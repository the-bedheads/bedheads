import React, { FC, useState, useEffect } from 'react';
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
import RadarChart from './RadarChart';

const useStyles = makeStyles({
  main: {
    backgroundColor: 'white',
    margin: 'auto',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  imgStyle: {
    height: '100%',
    width: '100%',
    padding: '10px 10px 5px',
    justifyContent: 'center',
  },
  infoStyle: {
    justifyContent: 'center',
    paddingTop: '5px',
    paddingBottom: '5px',
  },
  textStyle: {
    textAlign: 'center',
    wordWrap: 'break-word',
    justifyContent: 'center',
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
  const [personalityData, setPersonalityData] = useState({
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0,
  });

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

  const getPersonalityData = () => {
    axios.get(`/user/personalityData/${host.id}`)
      .then(({ data }) => {
        setPersonalityData({
          openness: data.openness,
          conscientiousness: data.conscientiousness,
          extraversion: data.extraversion,
          agreeableness: data.agreeableness,
          neuroticism: data.neuroticism,
        });
      })
      .catch((err) => console.warn(err));
  };

  useEffect(() => {
    getPersonalityData();
  }, []);

  return (
    <Container className={classes.main} disableGutters>
      <Grid container item xs={12}>
        <Grid container className={classes.infoStyle}>
          <img
            src={host.profilePhoto}
            alt="Not found"
            className={classes.imgStyle}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Container className={classes.infoStyle} disableGutters>
          <Grid container className={classes.textStyle}>
            {`${host.firstName} (${host.pronouns})`}
          </Grid>
          <Grid container className={classes.textStyle}>
            New Orleans, LA
          </Grid>
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
      <Grid container className={classes.textStyle}>
        {`Your match profile with ${host.firstName}`}
      </Grid>
      <Grid className={classes.infoStyle}>
        <RadarChart hostData={personalityData} hostName={host.firstName} />
      </Grid>
    </Container>
  );
};

export default Sidebar;
