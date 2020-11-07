import React, { useState } from 'react';
import {
  Button, Dialog, DialogTitle, Typography, AppBar, TextField, DialogActions,
} from '@material-ui/core';

interface MyProps {
  nextStep: () => void,
  prevStep: () => void,
}

const UploadProfilePhoto: React.FC<MyProps> = (Props: MyProps): JSX.Element => {
  const { nextStep, prevStep } = Props;

  const continueStep = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    nextStep();
  };

  const backAStep = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    prevStep();
  };

  return (
    <>
      <Dialog open fullWidth>
        <AppBar title="Upload Profile Photo" />
        <DialogTitle id="form-dialog-title">Upload Your Profile Photo</DialogTitle>
        <Typography>Greg\s Upload Button Here</Typography>
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
  );
};

export default UploadProfilePhoto;
