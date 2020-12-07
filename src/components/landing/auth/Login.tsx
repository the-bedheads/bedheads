import React, { useEffect, SyntheticEvent, useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AppType } from 'goldilocksTypes';
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {
  Grid,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Snackbar,
} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
  Email,
  Lock,
} from '@material-ui/icons';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import logo from '../../../assets/logo.png';
import '../../../App.css';

interface AuthProps {
  handleLogin: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
  setUser: React.Dispatch<React.SetStateAction<AppType>>,
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: '40ch',
    },
    alignItems: 'center',
  },
  paper: {
    rounded: true,
    width: '31%',
    margin: theme.spacing(1),
    padding: theme.spacing(3),
    alignItems: 'center',
    borderRadius: 20,
    borderColor: '#f8c009',
    border: '3px solid',
  },
  logo: {
    maxHeight: 75,
    alignItems: 'center',
  },
  margin: {
    margin: theme.spacing(2),
  },
  buttonMargin: {
    margin: theme.spacing(2),
  },
}));

const Login: React.FC<AuthProps> = ({ handleLogin: [isAuth, setAuth], setUser }) => {
  const classes = useStyles();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [openToast, setOpenToast] = useState(false);

  const handleCloseToast = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenToast(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const loginUser = () => {
    setUser({
      id: localStorage.userId,
      firstName: localStorage.firstName,
      guestRating: localStorage.guestRating,
      hostRating: localStorage.hostRating,
      inviteCount: localStorage.inviteCount,
      profilePhoto: localStorage.profilePhoto,
      pronouns: localStorage.pronouns,
      swapCount: localStorage.swapCount,
      userBio: localStorage.userBio,
      email: localStorage.email,
      openness: localStorage.openness,
      conscientiousness: localStorage.conscientiousness,
      extraversion: localStorage.extraversion,
      agreeableness: localStorage.agreeableness,
      neuroticism: localStorage.neuroticism,
      hasListing: localStorage.hasListing,
    });
    setAuth(true);
  };

  const logoutUser = () => {
    setAuth(false);
  };

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

  const onLogin = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then((data) => data);

      const parseRes = await response.json();
      if (parseRes.jwtToken) {
        localStorage.setItem('token', parseRes.jwtToken);
        await getUserProfile();
        setOpenToast(true);
        loginUser();
      } else {
        setAuth(false);
      }
    } catch (err) {
      console.warn(err.message);
    }
  };

  return (
    <div className="login-container">
      <Typography
        className="logo-text"
        variant="h1"
      >
        goldilocks
      </Typography>
      <Typography
        className="logo-subtitle"
        variant="h5"
      >
        find a bed that&lsquo;s just right
      </Typography>
      <Grid
        container
        justify="center"
        className={classes.margin}
      >
        <Paper
          variant="outlined"
          className={classes.paper}
        >
          <Grid container justify="center" alignItems="center">
            <Grid item className={classes.margin}>
              <Typography className="logo-login">
                <img src={logo} alt="logo" className={classes.logo} />
              </Typography>
              <Typography
                color="primary"
                variant="h3"
              >
                Sign in
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            justify="center"
            alignItems="center"
          >
            <FormControl className={classes.root} variant="outlined">
              <InputLabel
                htmlFor="Email"
                variant="outlined"
              >
                Email
              </InputLabel>
              <OutlinedInput
                name="email"
                type="email"
                color="secondary"
                fullWidth
                startAdornment={(
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                )}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                labelWidth={48}
              />
            </FormControl>
          </Grid>
          <Grid
            container
            justify="center"
            alignItems="center"
          >
            <FormControl className={classes.root} variant="outlined">
              <InputLabel
                htmlFor="Password"
              >
                Password
              </InputLabel>
              <OutlinedInput
                name="password"
                type="password"
                color="secondary"
                fullWidth
                startAdornment={(
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                )}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                labelWidth={77}
              />
            </FormControl>
          </Grid>
          <Grid
            container
            justify="center"
            alignItems="center"
          >
            <Button
              className={clsx(classes.buttonMargin, classes.root)}
              type="submit"
              color="primary"
              variant="contained"
              onClick={onLogin}
            >
              Start Swapping
            </Button>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              open={openToast}
              autoHideDuration={6000}
              onClose={handleCloseToast}
              action={(
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseToast}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
            >
              <MuiAlert severity="success">Welcome to Goldilocks</MuiAlert>
            </Snackbar>
            <Button
              className={clsx(classes.buttonMargin, classes.root)}
              type="submit"
              color="secondary"
              variant="contained"
              component={Link}
              to={
                {
                  pathname: '/register',
                }
              }
            >
              Sign Up
            </Button>
            <Typography variant="caption">
              Not registered? Click to sign up!
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};
export default Login;
