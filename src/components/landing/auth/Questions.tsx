import React, { useState } from 'react';
import {
  Button, Dialog, DialogTitle, DialogContent, Typography, AppBar, TextField, DialogActions,
} from '@material-ui/core';
import Filter1Icon from '@material-ui/icons/Filter1';
import Filter2Icon from '@material-ui/icons/Filter2';
import Filter3Icon from '@material-ui/icons/Filter3';
import Filter4Icon from '@material-ui/icons/Filter4';
import Filter5Icon from '@material-ui/icons/Filter5';

interface MyProps {
  q1: string,
  q2: string,
  q3: string,
  q4: string,
  q5: string,
  nextStep: () => void,
  prevStep: () => void,
  handleResponse: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: string
  ) => void,
}

const Questions: React.FC<MyProps> = (Props: MyProps): JSX.Element => {
  const {
    nextStep, prevStep, handleResponse, q1, q2, q3, q4, q5,
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
        <DialogTitle id="form-dialog-title">Step 2: Fill Out Survey (1/2)</DialogTitle>
        <Typography>
          <Filter1Icon />
          Finish this sentence: Strangers would describe me as ____, but I know that I am ____.
        </Typography>
        <TextField
          name="response1"
          autoFocus
          multiline
          rows={2}
          variant="outlined"
          fullWidth
          defaultValue={q1}
          onChange={(e) => handleResponse(e, 'response1')}
        />
        <br />
        <Typography>
          <Filter2Icon />
          What does it feel like when you feel your best?
        </Typography>
        <TextField
          name="response2"
          autoFocus
          multiline
          rows={2}
          variant="outlined"
          fullWidth
          defaultValue={q2}
          onChange={(e) => handleResponse(e, 'response2')}
        />
        <br />
        <Typography>
          <Filter3Icon />
          What is your relationship like with your neighbors?
        </Typography>
        <TextField
          name="response3"
          autoFocus
          multiline
          rows={2}
          variant="outlined"
          fullWidth
          defaultValue={q3}
          onChange={(e) => handleResponse(e, 'response3')}
        />
        <br />
        <Typography>
          <Filter4Icon />
          How would you describe the vibe of your home? What makes it that way?
        </Typography>
        <TextField
          name="response4"
          autoFocus
          multiline
          rows={2}
          variant="outlined"
          fullWidth
          defaultValue={q4}
          onChange={(e) => handleResponse(e, 'response4')}
        />
        <br />
        <Typography>
          <Filter5Icon />
          How do you decompress day to day?
        </Typography>
        <TextField
          name="response5"
          autoFocus
          multiline
          rows={2}
          variant="outlined"
          fullWidth
          defaultValue={q5}
          onChange={(e) => handleResponse(e, 'response5')}
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

export default Questions;
