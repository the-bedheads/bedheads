import React, { useState } from 'react';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Typography,
  AppBar,
  Paper,
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
    margin: theme.spacing(1),
  },
  buttonMargin: {
    margin: theme.spacing(2),
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

const Questions2: React.FC<MyQ2Props> = (Props: MyQ2Props): JSX.Element => {
  const classes = useStyles();
  const {
    nextStep, prevStep, handleResponse, q6, q7, q8, q9, q10,
  } = Props;

  const continueStep = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    return (q6.length && q7.length && q8.length && q9.length && q10.length) ? nextStep() : toast.warn('All questions must have a response.', {
      position: 'bottom-right',
    });
  };

  const backAStep = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    prevStep();
  };

  return (
    <>
      <Dialog open fullWidth>
        <AppBar title="New User Questionnaire" />
        <DialogTitle id="form-dialog-title">
          <Box display="flex" alignItems="center">
            <Box flexGrow={1}>Step Three: Complete Questionnaire (2/2)</Box>
            <Box>
              <Typography>
                <img src={logo} alt="logo" className={classes.logo} />
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <Grid container alignContent="center" justify="center">
          <Paper className={classes.paper}>
            <Typography className="signup-questionnaire">
              <Filter6Icon />
              What is your favorite way to spend a Sunday night?
            </Typography>
            <FormControl
              className={clsx(classes.margin, classes.root)}
              required
              variant="outlined"
            >
              <InputLabel htmlFor="response1">Question 6</InputLabel>
              <OutlinedInput
                type="text"
                multiline
                rows={3}
                fullWidth
                required
                color="secondary"
                defaultValue={q6}
                labelWidth={89}
                onChange={(e) => handleResponse(e, 'response6')}
              />
            </FormControl>
            <Typography className="signup-questionnaire">
              <Filter7Icon />
              How do you think you are as a roommate?
            </Typography>
            <FormControl
              className={clsx(classes.margin, classes.root)}
              required
              variant="outlined"
            >
              <InputLabel htmlFor="response1">Question 7</InputLabel>
              <OutlinedInput
                type="text"
                multiline
                rows={3}
                fullWidth
                required
                color="secondary"
                defaultValue={q7}
                labelWidth={88}
                onChange={(e) => handleResponse(e, 'response7')}
              />
            </FormControl>
            <Typography className="signup-questionnaire">
              <Filter8Icon />
              What do you do for a living?
            </Typography>
            <FormControl
              className={clsx(classes.margin, classes.root)}
              required
              variant="outlined"
            >
              <InputLabel htmlFor="response1">Question 8</InputLabel>
              <OutlinedInput
                type="text"
                multiline
                rows={3}
                fullWidth
                required
                color="secondary"
                defaultValue={q8}
                labelWidth={88}
                onChange={(e) => handleResponse(e, 'response8')}
              />
            </FormControl>
            <Typography className="signup-questionnaire">
              <Filter9Icon />
              Describe a typical day in your life.
            </Typography>
            <FormControl
              className={clsx(classes.margin, classes.root)}
              required
              variant="outlined"
            >
              <InputLabel htmlFor="response1">Question 9</InputLabel>
              <OutlinedInput
                type="text"
                multiline
                rows={3}
                fullWidth
                required
                color="secondary"
                defaultValue={q9}
                labelWidth={88}
                onChange={(e) => handleResponse(e, 'response9')}
              />
            </FormControl>
            <Typography className="signup-questionnaire">
              <Filter9PlusIcon />
              Do you have any allergies or special food requirements?
            </Typography>
            <FormControl
              className={clsx(classes.margin, classes.root)}
              required
              variant="outlined"
            >
              <InputLabel htmlFor="response1">Question 10</InputLabel>
              <OutlinedInput
                type="text"
                multiline
                rows={3}
                fullWidth
                required
                color="secondary"
                defaultValue={q10}
                labelWidth={95}
                onChange={(e) => handleResponse(e, 'response10')}
              />
            </FormControl>
            <Button
              className={clsx(classes.buttonMargin, classes.root)}
              onClick={(event) => continueStep(event)}
              color="primary"
              variant="contained"
            >
              Continue
            </Button>
            <Button
              className={clsx(classes.buttonMargin, classes.root)}
              onClick={(event) => backAStep(event)}
              color="secondary"
              variant="contained"
            >
              Back
            </Button>
          </Paper>
        </Grid>
      </Dialog>
    </>
  );
};

export default Questions2;
