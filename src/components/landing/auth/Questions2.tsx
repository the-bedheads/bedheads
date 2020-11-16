import React, { useState } from 'react';
import clsx from 'clsx';
import {
  Button,
  Dialog,
  DialogTitle,
  Typography,
  AppBar,
  TextField,
  DialogActions,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core';
import Filter6Icon from '@material-ui/icons/Filter6';
import Filter7Icon from '@material-ui/icons/Filter7';
import Filter8Icon from '@material-ui/icons/Filter8';
import Filter9Icon from '@material-ui/icons/Filter9';
import Filter9PlusIcon from '@material-ui/icons/Filter9Plus';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import '../../../App.css';
import { MyQ2Props } from 'goldilocksTypes';

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
  buttonMargin: {
    margin: theme.spacing(2),
  },
}));

const Questions2: React.FC<MyQ2Props> = (Props: MyQ2Props): JSX.Element => {
  const classes = useStyles();
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
        <Grid container alignContent="center" justify="center">
          <Typography>
            <Filter6Icon />
            What is your favorite way to spend a Sunday night?
          </Typography>
          <FormControl className={clsx(classes.margin, classes.root)} variant="outlined">
            <InputLabel htmlFor="response1">Question 6</InputLabel>
            <OutlinedInput
              type="text"
              multiline
              rows={3}
              fullWidth
              required
              defaultValue={q6}
              labelWidth={80}
              onChange={(e) => handleResponse(e, 'response6')}
            />
          </FormControl>
          <Typography>
            <Filter7Icon />
            How do you think you are as a roommate?
          </Typography>
          <FormControl className={clsx(classes.margin, classes.root)} variant="outlined">
            <InputLabel htmlFor="response1">Question 7</InputLabel>
            <OutlinedInput
              type="text"
              multiline
              rows={3}
              fullWidth
              required
              defaultValue={q7}
              labelWidth={80}
              onChange={(e) => handleResponse(e, 'response7')}
            />
          </FormControl>
          <Typography>
            <Filter8Icon />
            What do you do for a living?
          </Typography>
          <FormControl className={clsx(classes.margin, classes.root)} variant="outlined">
            <InputLabel htmlFor="response1">Question 8</InputLabel>
            <OutlinedInput
              type="text"
              multiline
              rows={3}
              fullWidth
              required
              defaultValue={q8}
              labelWidth={80}
              onChange={(e) => handleResponse(e, 'response8')}
            />
          </FormControl>
          <Typography>
            <Filter9Icon />
            Describe a typical day in your life.
          </Typography>
          <FormControl className={clsx(classes.margin, classes.root)} variant="outlined">
            <InputLabel htmlFor="response1">Question 9</InputLabel>
            <OutlinedInput
              type="text"
              multiline
              rows={3}
              fullWidth
              required
              defaultValue={q9}
              labelWidth={80}
              onChange={(e) => handleResponse(e, 'response9')}
            />
          </FormControl>
          <Typography>
            <Filter9PlusIcon />
            Do you have any allergies or special food requirements?
          </Typography>
          <FormControl className={clsx(classes.margin, classes.root)} variant="outlined">
            <InputLabel htmlFor="response1">Question 10</InputLabel>
            <OutlinedInput
              type="text"
              multiline
              rows={3}
              fullWidth
              required
              defaultValue={q10}
              labelWidth={80}
              onChange={(e) => handleResponse(e, 'response10')}
            />
          </FormControl>
          <Button
            className={clsx(classes.buttonMargin, classes.root)}
            onClick={(event) => continueStep(event)}
            color="primary"
            variant="outlined"
          >
            Continue
          </Button>
          <Button
            className={clsx(classes.buttonMargin, classes.root)}
            onClick={(event) => backAStep(event)}
            color="secondary"
            variant="outlined"
          >
            Back
          </Button>
        </Grid>
      </Dialog>
    </>
  );
};

export default Questions2;
