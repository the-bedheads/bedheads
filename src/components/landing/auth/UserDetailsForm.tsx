import React from 'react';
import {
  AppBar, TextField, Button,
} from '@material-ui/core';
// import MuiThemeProvider from '@material-ui/core/styles';

// type State = {
//   step: number,
//   firstName: string,
//   lastName: string,
//   pronouns: string,
//   dob: string,
//   email: string,
//   password: string,
// };

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

const styles = {
  button: {
    margin: 15,
  },
};

const UserDetailsForm: React.FC<MyProps> = (Props: MyProps) => {
  const {
    nextStep, prevStep, handleChange, firstName, lastName, pronouns, dob, email, password,
  } = Props;
  // const { } = props;

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
      <AppBar title="Enter Personal Details" />
      <TextField
        placeholder="Enter Your First Name"
        label="First Name"
        onChange={(event) => handleChange(event, 'firstName')}
        defaultValue={firstName}
      />
      <br />
      <TextField
        placeholder="Enter Your Last Name"
        label="Last Name"
        onChange={(event) => handleChange(event, 'lastName')}
        defaultValue={lastName}
      />
      <br />
      <TextField
        placeholder="Preferred Pronouns"
        label="Pronouns"
        onChange={(event) => handleChange(event, 'pronouns')}
        defaultValue={pronouns}
      />
      <br />
      <TextField
        placeholder="Enter Your Birthday"
        type="date"
        onChange={(event) => handleChange(event, 'dob')}
        defaultValue={dob}
      />
      <br />
      <TextField
        placeholder="Enter Your Email Address"
        label="Email"
        type="email"
        onChange={(event) => handleChange(event, 'email')}
        defaultValue={email}
      />
      <br />
      <TextField
        placeholder="Create a password"
        label="Password"
        type="password"
        onChange={(event) => handleChange(event, 'password')}
        defaultValue={password}
      />
      <br />
      <Button
        onClick={(event) => continueStep(event)}
        color="primary"
        style={styles.button}
      >
        Continue
      </Button>
      <Button
        onClick={(event) => backAStep(event)}
        color="primary"
        style={styles.button}
      >
        Back
      </Button>
    </>
    // </MuiThemeProvider>
  );
};

export default UserDetailsForm;
