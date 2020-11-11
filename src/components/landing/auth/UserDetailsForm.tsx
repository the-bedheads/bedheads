import React, { useState } from 'react';
import clsx from 'clsx';
import {
  AppBar,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  OutlinedInput,
  IconButton,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
  AccountCircle, VisibilityOff, Visibility, EmojiEmotions, Email, Lock,
} from '@material-ui/icons';
import { MyProps } from 'goldilocksTypes';

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
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '35ch',
  },
}));

// interface MyProps {
//   firstName: string,
//   lastName: string,
//   pronouns: string,
//   dob: string,
//   email: string,
//   password: string,
//   nextStep: () => void,
//   handleChange: (
//     e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
//     type: string
//   ) => void,
// }

const UserDetailsForm: React.FC<MyProps> = (Props: MyProps) => {
  const classes = useStyles();
  const [showPassword, setPassword] = useState<boolean>(false);
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
        <DialogTitle id="form-dialog-title">Step 1: Enter profile details</DialogTitle>
        <FormControl className={clsx(classes.margin, classes.root)} variant="outlined">
          <InputLabel htmlFor="first-name">First Name</InputLabel>
          <OutlinedInput
            name="firstName"
            type="text"
            fullWidth
            defaultValue={firstName}
            startAdornment={(
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            )}
            onChange={(e) => handleChange(e, 'firstName')}
            labelWidth={75}
          />
        </FormControl>
        <FormControl className={clsx(classes.margin, classes.root)} variant="outlined">
          <InputLabel htmlFor="last-name">Last Name</InputLabel>
          <OutlinedInput
            name="lastName"
            type="text"
            fullWidth
            defaultValue={lastName}
            startAdornment={(
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            )}
            onChange={(e) => handleChange(e, 'lastName')}
            labelWidth={75}
          />
        </FormControl>
        <FormControl className={clsx(classes.margin, classes.root)} variant="outlined">
          <InputLabel htmlFor="pronouns">Pronouns</InputLabel>
          <OutlinedInput
            name="pronouns"
            type="text"
            fullWidth
            defaultValue={pronouns}
            startAdornment={(
              <InputAdornment position="start">
                <EmojiEmotions />
              </InputAdornment>
            )}
            onChange={(e) => handleChange(e, 'pronouns')}
            labelWidth={70}
          />
        </FormControl>
        <FormControl className={clsx(classes.margin, classes.root)} variant="outlined">
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput
            name="email"
            type="email"
            fullWidth
            defaultValue={email}
            startAdornment={(
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            )}
            onChange={(e) => handleChange(e, 'email')}
            labelWidth={53}
          />
        </FormControl>
        <FormControl className={clsx(classes.margin, classes.root)} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            fullWidth
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
            labelWidth={70}
          />
        </FormControl>
        <br />
        <Button
          className={classes.root}
          onClick={(e) => continueStep(e)}
          color="primary"
          variant="outlined"
        >
          Continue
        </Button>
      </Dialog>
    </>
  );
};

export default UserDetailsForm;
