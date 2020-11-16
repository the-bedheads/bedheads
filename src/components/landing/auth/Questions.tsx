import React from 'react';
import clsx from 'clsx';
import {
  Button,
  Dialog,
  DialogTitle,
  Typography,
  AppBar,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  Box,
} from '@material-ui/core';
import {
  makeStyles,
  Theme,
  createStyles,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import Filter1Icon from '@material-ui/icons/Filter1';
import Filter2Icon from '@material-ui/icons/Filter2';
import Filter3Icon from '@material-ui/icons/Filter3';
import Filter4Icon from '@material-ui/icons/Filter4';
import Filter5Icon from '@material-ui/icons/Filter5';
import { MyQ1Props } from 'goldilocksTypes';

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

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      root: {
        alignItems: 'left',
      },
    },
  },
});

const Questions: React.FC<MyQ1Props> = (Props: MyQ1Props): JSX.Element => {
  const classes = useStyles();
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
        <Grid container justify="center">
          <Typography component="h6" align="left">
            <Filter1Icon />
            Finish this sentence:
            <br />
            &ldquo;Strangers would describe me as ____,
            <br />
            but I know that I am ____.&ldquo;
          </Typography>
          <FormControl className={clsx(classes.margin, classes.root)} variant="outlined">
            <InputLabel htmlFor="response1">Question 1</InputLabel>
            <OutlinedInput
              name="res1"
              type="text"
              multiline
              rows={3}
              fullWidth
              required
              defaultValue={q1}
              labelWidth={80}
              onChange={(e) => handleResponse(e, 'response1')}
            />
          </FormControl>
          <Typography>
            <Filter2Icon />
            What does it feel like when you feel your best?
          </Typography>
          <FormControl className={clsx(classes.margin, classes.root)} variant="outlined">
            <InputLabel htmlFor="response2">Question 2</InputLabel>
            <OutlinedInput
              type="text"
              multiline
              rows={3}
              fullWidth
              required
              defaultValue={q2}
              labelWidth={80}
              onChange={(e) => handleResponse(e, 'response2')}
            />
          </FormControl>
          <Typography>
            <Filter3Icon />
            What is your relationship like with your neighbors?
          </Typography>
          <FormControl className={clsx(classes.margin, classes.root)} variant="outlined">
            <InputLabel htmlFor="response3">Question 3</InputLabel>
            <OutlinedInput
              type="text"
              multiline
              rows={3}
              fullWidth
              required
              defaultValue={q3}
              labelWidth={80}
              onChange={(e) => handleResponse(e, 'response3')}
            />
          </FormControl>
          <Typography>
            <Filter4Icon />
            How would you describe the vibe of your home?
          </Typography>
          <FormControl className={clsx(classes.margin, classes.root)} variant="outlined">
            <InputLabel htmlFor="response4">Question 4</InputLabel>
            <OutlinedInput
              type="text"
              multiline
              rows={3}
              fullWidth
              required
              defaultValue={q4}
              labelWidth={80}
              onChange={(e) => handleResponse(e, 'response4')}
            />
          </FormControl>
          <Typography>
            <Filter5Icon />
            How do you decompress day to day?
          </Typography>
          <FormControl className={clsx(classes.margin, classes.root)} variant="outlined">
            <InputLabel htmlFor="response5">Question 5</InputLabel>
            <OutlinedInput
              type="text"
              multiline
              rows={3}
              fullWidth
              required
              defaultValue={q5}
              labelWidth={80}
              onChange={(e) => handleResponse(e, 'response5')}
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

export default Questions;
