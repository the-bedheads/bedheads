import React from 'react';
import axios from 'axios';
import {
  Grid, Paper, AppBar, List, ListItem, ListItemText, Button, Typography,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { toast } from 'react-toastify';

interface TestProps {
  firstName: string,
  lastName: string,
  pronouns: string,
  dob: string,
  email: string,
  password: string,
  q1: string,
  q2: string,
  q3: string,
  q4: string,
  q5: string,
  q6: string,
  q7: string,
  q8: string,
  q9: string,
  q10: string,
  nextStep: () => void,
  prevStep: () => void,
  onSubmitForm: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
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
  } = Props;

  const getUserProfile = async () => {
    await axios.get(`user/email/${email}`)
      .then(({ data }) => {
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
      });
  };

  const continueStep = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    try {
      const body = {
        firstName, lastName, pronouns, email, password, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10,
      };
      const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/auth/register`,
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
        toast.success('New user created!');
      } else {
        toast.error(parseRes);
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
      <div className={classes.root}>
        <AppBar title="Confirm Details" />
        <br />
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography variant="h5">Confirm Personal Details</Typography>
              <br />
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
                <ListItem>
                  <ListItemText primary="Password" secondary={password} />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography variant="h5">Confirm Survey Responses</Typography>
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
          </Grid>
        </Grid>
        <br />
        <Button
          className="confirm-btn"
          color="primary"
          variant="contained"
          onClick={(event) => continueStep(event)}
        >
          Submit
        </Button>
        <Button
          className="confirm-btn"
          onClick={(event) => backAStep(event)}
          color="secondary"
          variant="contained"
        >
          Back
        </Button>
      </div>
    </>
  );
};

export default Confirm;
