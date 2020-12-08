import React, { useState } from 'react';
import clsx from 'clsx';
import emailjs from 'emailjs-com';
import { Email, EmojiEmotions, PersonPin } from '@material-ui/icons';
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
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import '../../App.css';
import generateVerificationCode from '../../invite/verificationCode';
import logo from '../../assets/logo.png';

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

const Invite: React.FC = (props): JSX.Element => {
  const classes = useStyles();
  const [friendEmail, setFriendEmail] = useState<string>('');
  const [friendName, setFriendName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [vCode, setVCode] = useState<string>('changed?');
  const [openToast, setOpenToast] = useState(false);

  const handleCloseToast = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenToast(false);
  };

  const sendEmail = (event: any): void => {
    event.preventDefault();
    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      event.target, process.env.REACT_APP_EMAILJS_USER_ID,
    )
      .then((result) => {
        setOpenToast(true);
        event.target.reset();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="invite-container">
      <form className="contact-form" onSubmit={sendEmail}>
        <Typography
          className="invite-header"
          variant="h1"
        >
          Invite A Friend
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
              </Grid>
            </Grid>
            <Grid
              container
              justify="center"
              alignItems="center"
            >
              <FormControl className={classes.root} variant="outlined">
                <InputLabel
                  htmlFor="Name"
                  variant="outlined"
                >
                  Enter your friend&lsquo;s name
                </InputLabel>
                <OutlinedInput
                  type="text"
                  name="user_name"
                  color="secondary"
                  fullWidth
                  startAdornment={(
                    <InputAdornment position="start">
                      <EmojiEmotions />
                    </InputAdornment>
                  )}
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>):
                  void => setFriendName(ev.target.value)}
                  labelWidth={199}
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
                  htmlFor="Email"
                >
                  Enter your friend&lsquo;s email
                </InputLabel>
                <OutlinedInput
                  type="email"
                  name="user_email"
                  color="secondary"
                  fullWidth
                  startAdornment={(
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  )}
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
                    setFriendEmail(ev.target.value);
                    setVCode(generateVerificationCode());
                  }}
                  labelWidth={197}
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
                  htmlFor="Sender Email"
                >
                  Enter your email
                </InputLabel>
                <OutlinedInput
                  type="email"
                  color="secondary"
                  fullWidth
                  startAdornment={(
                    <InputAdornment position="start">
                      <PersonPin />
                    </InputAdornment>
                  )}
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
                    setUserEmail(ev.target.value);
                  }}
                  labelWidth={136}
                />
              </FormControl>
              <OutlinedInput
                type="hidden"
                name="message"
                value={vCode}
              />
              <Grid
                container
                justify="center"
                alignItems="center"
              >
                <input type="submit" value="SUBMIT" />
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
                  <MuiAlert severity="success">Invite sent</MuiAlert>
                </Snackbar>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </form>
    </div>
  );
};

export default Invite;
