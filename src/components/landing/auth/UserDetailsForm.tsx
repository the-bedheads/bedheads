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
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MyProps } from 'goldilocksTypes';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
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
        <TextField
          name="firstName"
          label="First Name"
          variant="filled"
          color="secondary"
          margin="normal"
          fullWidth
          defaultValue={firstName}
          onChange={(e) => handleChange(e, 'firstName')}
        />
        <TextField
          name="lastName"
          label="Last Name"
          variant="filled"
          color="secondary"
          margin="normal"
          fullWidth
          defaultValue={lastName}
          onChange={(e) => handleChange(e, 'lastName')}
        />
        <TextField
          name="pronouns"
          label="Pronouns"
          variant="filled"
          color="secondary"
          margin="normal"
          fullWidth
          defaultValue={pronouns}
          onChange={(e) => handleChange(e, 'pronouns')}
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          variant="filled"
          color="secondary"
          margin="normal"
          fullWidth
          defaultValue={email}
          onChange={(e) => handleChange(e, 'email')}
        />

        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => handleChange(e, 'password')}
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
          className="question-btn"
          onClick={(e) => continueStep(e)}
          color="primary"
          variant="contained"
        >
          Continue
        </Button>
      </Dialog>
    </>
  );
};

export default UserDetailsForm;
