import React from 'react';
import {
  AppBar, TextField, Button, Dialog, DialogTitle,
} from '@material-ui/core';
// import MuiThemeProvider from '@material-ui/core/styles';

interface MyProps {
  firstName: string,
  lastName: string,
  pronouns: string,
  dob: string,
  email: string,
  password: string,
  nextStep: () => void,
  prevStep: () => void,
  handleChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: string
  ) => void,
}

const UserDetailsForm: React.FC<MyProps> = (Props: MyProps) => {
  const {
    nextStep, prevStep, handleChange, firstName, lastName, pronouns, dob, email, password,
  } = Props;

  const continueStep = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    nextStep();
  };

  const backAStep = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    prevStep();
  };

  return (
    // <MuiThemeProvider>
    <>
      <Dialog open fullWidth>
        <AppBar title="Enter Personal Details" />
        <DialogTitle id="form-dialog-title">Step 1: Enter profile details</DialogTitle>
        <br />
        <TextField
          name="firstName"
          placeholder="Enter Your First Name"
          label="First Name"
          onChange={(event) => handleChange(event, 'firstName')}
          defaultValue={firstName}
        />
        <br />
        <TextField
          name="lastName"
          placeholder="Enter Your Last Name"
          label="Last Name"
          onChange={(event) => handleChange(event, 'lastName')}
          defaultValue={lastName}
        />
        <br />
        <TextField
          name="pronouns"
          placeholder="Preferred Pronouns"
          label="Pronouns"
          onChange={(event) => handleChange(event, 'pronouns')}
          defaultValue={pronouns}
        />
        <br />
        <TextField
          name="dob"
          placeholder="Enter Your Birthday"
          type="date"
          onChange={(event) => handleChange(event, 'dob')}
          defaultValue={dob}
        />
        <br />
        <TextField
          name="email"
          placeholder="Enter Your Email Address"
          label="Email"
          type="email"
          onChange={(event) => handleChange(event, 'email')}
          defaultValue={email}
        />
        <br />
        <TextField
          name="password"
          placeholder="Create a password"
          label="Password"
          type="password"
          onChange={(event) => handleChange(event, 'password')}
          defaultValue={password}
        />
        <br />
        <Button
          className="question-btn"
          onClick={(event) => continueStep(event)}
          color="primary"
          variant="contained"
        >
          Continue
        </Button>
        <Button
          className="question-btn"
          onClick={(event) => backAStep(event)}
          color="secondary"
          variant="contained"
        >
          Back
        </Button>
      </Dialog>
    </>
    // </MuiThemeProvider>
  );
};

export default UserDetailsForm;
