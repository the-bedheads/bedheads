import React, { useState } from 'react';
import clsx from 'clsx';
import {
  Box,
  AppBar,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  OutlinedInput,
  IconButton,
  Paper,
  Typography,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
  AccountCircle, VisibilityOff, Visibility, EmojiEmotions, Email, Lock,
} from '@material-ui/icons';
import { MyProps } from 'goldilocksTypes';
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
    margin: theme.spacing(2),
  },
  buttonMargin: {
    margin: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    borderRadius: 20,
    borderColor: '#f8c009',
    border: '3px solid',
    margin: theme.spacing(2),
  },
  logo: {
    maxHeight: 45,
    alignItems: 'center',
  },
}));

const UserDetailsForm: React.FC<MyProps> = (Props: MyProps) => {
  const classes = useStyles();
  const [showPassword, setPassword] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    nextStep, handleChange, firstName, lastName, pronouns, email, password,
  } = Props;

  const continueStep = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    nextStep();
  };

  const toggleShowPassword = () => {
    setPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Dialog open fullWidth>
        <AppBar title="Enter Personal Details" />
        <DialogTitle id="form-dialog-title">
          <Box display="flex" alignItems="center">
            <Box flexGrow={1}>Step One: Enter profile details</Box>
            <Box>
              <Typography>
                <img src={logo} alt="logo" className={classes.logo} />
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <Grid container alignContent="center" justify="center">
          <Paper className={classes.paper}>
            <FormControl className={clsx(classes.margin, classes.root)} variant="outlined">
              <InputLabel htmlFor="first-name">Enter First Name</InputLabel>
              <OutlinedInput
                name="firstName"
                type="text"
                fullWidth
                color="secondary"
                defaultValue={firstName}
                startAdornment={(
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                )}
                onChange={(e) => handleChange(e, 'firstName')}
                labelWidth={138}
              />
            </FormControl>
            <FormControl className={clsx(classes.margin, classes.root)} variant="outlined">
              <InputLabel htmlFor="last-name">Enter Last Name</InputLabel>
              <OutlinedInput
                name="lastName"
                type="text"
                fullWidth
                color="secondary"
                defaultValue={lastName}
                startAdornment={(
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                )}
                onChange={(e) => handleChange(e, 'lastName')}
                labelWidth={138}
              />
            </FormControl>
            <FormControl className={clsx(classes.margin, classes.root)} variant="outlined">
              <InputLabel htmlFor="pronouns">Enter Preferred Pronouns</InputLabel>
              <OutlinedInput
                name="pronouns"
                type="text"
                fullWidth
                color="secondary"
                defaultValue={pronouns}
                startAdornment={(
                  <InputAdornment position="start">
                    <EmojiEmotions />
                  </InputAdornment>
                )}
                onChange={(e) => handleChange(e, 'pronouns')}
                labelWidth={204}
              />
            </FormControl>
            <FormControl className={clsx(classes.margin, classes.root)} variant="outlined">
              <InputLabel htmlFor="email">Enter Email Address</InputLabel>
              <OutlinedInput
                name="email"
                type="email"
                fullWidth
                color="secondary"
                defaultValue={email}
                startAdornment={(
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                )}
                onChange={(e) => handleChange(e, 'email')}
                labelWidth={160}
              />
            </FormControl>
            <FormControl className={clsx(classes.margin, classes.root)} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Create Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                fullWidth
                color="secondary"
                onChange={(e) => handleChange(e, 'password')}
                startAdornment={(
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                )}
                endAdornment={(
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )}
                labelWidth={134}
              />
            </FormControl>
            <Button
              className={clsx(classes.buttonMargin, classes.root)}
              onClick={(e) => continueStep(e)}
              color="primary"
              variant="contained"
            >
              Continue
            </Button>
          </Paper>
        </Grid>
      </Dialog>
    </>
  );
};

export default UserDetailsForm;
