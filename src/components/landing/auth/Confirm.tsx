import React from 'react';
import clsx from 'clsx';
import axios from 'axios';
import {
  Grid,
  Paper,
  AppBar,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TestProps } from 'goldilocksTypes';
import logo from '../../../assets/logo.png';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: '40ch',
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    borderRadius: 20,
    borderColor: '#f8c009',
    border: '3px solid',
  },
  buttonMargin: {
    margin: theme.spacing(2),
  },
  logo: {
    maxHeight: 45,
    alignItems: 'center',
  },
}));

const Confirm: React.FC<TestProps> = (Props): JSX.Element => {
  const classes = useStyles();
  const {
    nextStep,
    prevStep,
    firstName,
    lastName,
    pronouns,
    email,
    password,
    q1,
    q2,
    q3,
    q4,
    q5,
    q6,
    q7,
    q8,
    q9,
    q10,
    profilePhotoUrl,
  } = Props;

  const getUserProfile = async () => {
    await axios.get(`user/email/${email}`)
      .then(({ data }) => {
        const { personalityScale } = data;
        localStorage.setItem('userId', data.id);
        localStorage.setItem('firstName', data.firstName);
        localStorage.setItem('pronouns', data.pronouns);
        localStorage.setItem('email', data.email);
        localStorage.setItem('profilePhoto', data.profilePhoto);
        localStorage.setItem('swapCount', data.swapCount);
        localStorage.setItem('guestRating', data.guestRating);
        localStorage.setItem('hostRating', data.hostRating);
        localStorage.setItem('inviteCount', data.inviteCount);
        localStorage.setItem('userBio', data.userBio);
        localStorage.setItem('openness', personalityScale.openness);
        localStorage.setItem('conscientiousness', personalityScale.conscientiousness);
        localStorage.setItem('extraversion', personalityScale.extraversion);
        localStorage.setItem('agreeableness', personalityScale.agreeableness);
        localStorage.setItem('neuroticism', personalityScale.neuroticism);
        localStorage.setItem('hasListing', data.hasListing);
      });
  };

  const continueStep = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    try {
      const body = {
        firstName,
        lastName,
        pronouns,
        email,
        password,
        profilePhotoUrl,
        q1,
        q2,
        q3,
        q4,
        q5,
        q6,
        q7,
        q8,
        q9,
        q10,
      };

      const rh = process.env.REACT_APP_HOST;
      const rp = process.env.REACT_APP_PORT;

      const response = await fetch('/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem('token', parseRes.jwtToken);
        await getUserProfile();
      }
    } catch (err) {
      console.warn(err.message);
    }
    nextStep();
  };
  const backAStep = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    prevStep();
  };

  return (
    <>
      <AppBar title="Confirm Details" />
      <Grid container spacing={1} justify="center">
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography variant="h5">Confirm Personal Details</Typography>
            <List>
              <ListItem>
                <ListItemText primary="First Name" secondary={firstName} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Last Name" secondary={lastName} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Preferred Pronouns" secondary={pronouns} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Email" secondary={email} />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Typography variant="h5">Confirm Survey Responses (1/2)</Typography>
            <br />
            <List>
              <ListItem>
                <ListItemText
                  primary="Finish this sentence: Strangers would describe me as ____, but I know that I am ____."
                  secondary={q1}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="What does it feel like when you feel your best?"
                  secondary={q2}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="What is your relationship like with your neighbors"
                  secondary={q3}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="How would you describe the vibe of your home? What makes it that way?"
                  secondary={q4}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="How do you decompress day to day?"
                  secondary={q5}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Typography variant="h5">Confirm Survey Responses (2/2)</Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="What is your favorite way to spend a Sunday night?"
                  secondary={q6}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="How do you think you are as a roommate?"
                  secondary={q7}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="What do you do for a living?"
                  secondary={q8}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Describe a typical day in your life."
                  secondary={q9}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Do you have any allergies, food restrictions or require ADA accommodations?"
                  secondary={q10}
                />
              </ListItem>
            </List>
          </Paper>
          <Button
            className={clsx(classes.buttonMargin)}
            color="primary"
            variant="contained"
            onClick={(event) => continueStep(event)}
          >
            Submit
          </Button>
          <Button
            className={clsx(classes.buttonMargin)}
            onClick={(event) => backAStep(event)}
            color="secondary"
            variant="contained"
          >
            Back
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Confirm;
