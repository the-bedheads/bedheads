import React from 'react';
import {
  AppBar, TextField, Button, Dialog, DialogTitle,
} from '@material-ui/core';

interface MyProps {
  firstName: string,
  lastName: string,
  pronouns: string,
  dob: string,
  email: string,
  password: string,
  nextStep: () => void,
  handleChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: string
  ) => void,
}

const UserDetailsForm: React.FC<MyProps> = (Props: MyProps) => {
  const {
    nextStep, handleChange, firstName, lastName, pronouns, email, password,
  } = Props;

  const continueStep = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    nextStep();
  };

  return (
    <>
      <Dialog open fullWidth>
        <AppBar title="Enter Personal Details" />
        <DialogTitle id="form-dialog-title">Step 1: Enter profile details</DialogTitle>
        <TextField
          name="firstName"
          label="First Name"
          variant="outlined"
          color="secondary"
          margin="normal"
          fullWidth
          defaultValue={firstName}
          onChange={(e) => handleChange(e, 'firstName')}
        />
        <TextField
          name="lastName"
          label="Last Name"
          variant="outlined"
          color="secondary"
          margin="normal"
          fullWidth
          defaultValue={lastName}
          onChange={(e) => handleChange(e, 'lastName')}
        />
        <TextField
          name="pronouns"
          label="Pronouns"
          variant="outlined"
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
          variant="outlined"
          color="secondary"
          margin="normal"
          fullWidth
          defaultValue={email}
          onChange={(e) => handleChange(e, 'email')}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          color="secondary"
          margin="normal"
          fullWidth
          defaultValue={password}
          onChange={(e) => handleChange(e, 'password')}
        />
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
