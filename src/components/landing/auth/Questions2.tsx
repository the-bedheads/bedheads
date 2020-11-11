import React, { useState } from 'react';
import {
  Button, Dialog, DialogTitle, Typography, AppBar, TextField, DialogActions,
} from '@material-ui/core';
import Filter6Icon from '@material-ui/icons/Filter6';
import Filter7Icon from '@material-ui/icons/Filter7';
import Filter8Icon from '@material-ui/icons/Filter8';
import Filter9Icon from '@material-ui/icons/Filter9';
import Filter9PlusIcon from '@material-ui/icons/Filter9Plus';
import '../../../App.css';

interface MyProps {
  q6: string,
  q7: string,
  q8: string,
  q9: string,
  q10: string,
  nextStep: () => void,
  prevStep: () => void,
  handleResponse: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: string
  ) => void,
}

const Questions2: React.FC<MyProps> = (Props: MyProps): JSX.Element => {
  const {
    nextStep, prevStep, handleResponse, q6, q7, q8, q9, q10,
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
    <>
      <Dialog open fullWidth>
        <AppBar title="New User Questionnaire" />
        <DialogTitle id="form-dialog-title">Step 3: Fill Out Survey (2/2)</DialogTitle>
        <Typography>
          <Filter6Icon />
          What is your favorite way to spend a Sunday night?
        </Typography>
        <TextField
          name="response6"
          autoFocus
          multiline
          rows={2}
          variant="outlined"
          fullWidth
          required
          defaultValue={q6}
          onChange={(e) => handleResponse(e, 'response6')}
        />
        <br />
        <Typography>
          <Filter7Icon />
          How do you think you are as a roommate?
        </Typography>
        <TextField
          name="response7"
          autoFocus
          multiline
          rows={2}
          variant="outlined"
          fullWidth
          required
          defaultValue={q7}
          onChange={(e) => handleResponse(e, 'response7')}
        />
        <br />
        <Typography>
          <Filter8Icon />
          What do you do for a living?
        </Typography>
        <TextField
          name="response8"
          autoFocus
          multiline
          rows={2}
          variant="outlined"
          fullWidth
          required
          defaultValue={q8}
          onChange={(e) => handleResponse(e, 'response8')}
        />
        <br />
        <Typography>
          <Filter9Icon />
          Describe a typical day in your life.
        </Typography>
        <TextField
          name="response9"
          autoFocus
          multiline
          rows={2}
          variant="outlined"
          fullWidth
          required
          defaultValue={q9}
          onChange={(e) => handleResponse(e, 'response9')}
        />
        <br />
        <Typography>
          <Filter9PlusIcon />
          Do you have any allergies or special food requirements?
        </Typography>
        <TextField
          name="response10"
          autoFocus
          multiline
          rows={2}
          variant="outlined"
          fullWidth
          required
          defaultValue={q10}
          onChange={(e) => handleResponse(e, 'response10')}
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
  );
};

export default Questions2;
