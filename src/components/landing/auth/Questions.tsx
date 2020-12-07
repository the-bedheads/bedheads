import React, { useState } from 'react';
import clsx from 'clsx';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Typography,
  AppBar,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  Paper,
  Snackbar,
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
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';
import { MyQ1Props } from 'goldilocksTypes';
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
  const [openToast, setOpenToast] = useState(false);

  const handleCloseToast = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenToast(false);
  };

  const continueStep = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    return (q1.length && q2.length && q3.length && q4.length && q5.length)
      ? nextStep() : setOpenToast(true);
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
            <Box flexGrow={1}>Step Two: Personality Questionnaire (1/2)</Box>
            <Box>
              <Typography>
                <img src={logo} alt="logo" className={classes.logo} />
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <Grid container justify="center">
          <Paper className={classes.paper}>
            <Typography className="signup-questionnaire">
              <Filter1Icon />
              Finish this sentence...
              <br />
              &ldquo;Strangers would describe me as ____,
              {' '}
              <br />
              but I know that I am ____.&ldquo;
            </Typography>
            <FormControl
              className={clsx(classes.margin, classes.root)}
              required
              variant="outlined"
            >
              <InputLabel htmlFor="response1">Question 1</InputLabel>
              <OutlinedInput
                name="res1"
                type="text"
                multiline
                rows={3}
                fullWidth
                required
                color="secondary"
                defaultValue={q1}
                labelWidth={87}
                onChange={(e) => handleResponse(e, 'response1')}
              />
            </FormControl>
            <Typography className="signup-questionnaire">
              <Filter2Icon />
              What does it feel like when you feel your best?
            </Typography>
            <FormControl
              className={clsx(classes.margin, classes.root)}
              required
              variant="outlined"
            >
              <InputLabel htmlFor="response2">Question 2</InputLabel>
              <OutlinedInput
                type="text"
                multiline
                rows={3}
                fullWidth
                required
                color="secondary"
                defaultValue={q2}
                labelWidth={88}
                onChange={(e) => handleResponse(e, 'response2')}
              />
            </FormControl>
            <Typography className="signup-questionnaire">
              <Filter3Icon />
              What is your relationship like with your neighbors?
            </Typography>
            <FormControl
              className={clsx(classes.margin, classes.root)}
              required
              variant="outlined"
            >
              <InputLabel htmlFor="response3">Question 3</InputLabel>
              <OutlinedInput
                type="text"
                multiline
                rows={3}
                fullWidth
                required
                color="secondary"
                defaultValue={q3}
                labelWidth={89}
                onChange={(e) => handleResponse(e, 'response3')}
              />
            </FormControl>
            <Typography className="signup-questionnaire">
              <Filter4Icon />
              How would you describe the vibe of your home?
            </Typography>
            <FormControl
              className={clsx(classes.margin, classes.root)}
              required
              variant="outlined"
            >
              <InputLabel htmlFor="response4">Question 4</InputLabel>
              <OutlinedInput
                type="text"
                multiline
                rows={3}
                fullWidth
                required
                color="secondary"
                defaultValue={q4}
                labelWidth={90}
                onChange={(e) => handleResponse(e, 'response4')}
              />
            </FormControl>
            <Typography className="signup-questionnaire">
              <Filter5Icon />
              How do you decompress day to day?
            </Typography>
            <FormControl
              className={clsx(classes.margin, classes.root)}
              required
              variant="outlined"
            >
              <InputLabel htmlFor="response5">Question 5</InputLabel>
              <OutlinedInput
                type="text"
                multiline
                rows={3}
                fullWidth
                required
                color="secondary"
                defaultValue={q5}
                labelWidth={89}
                onChange={(e) => handleResponse(e, 'response5')}
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
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              open={openToast}
              autoHideDuration={6000}
              onClose={handleCloseToast}
              action={(
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseToast}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
            >
              <MuiAlert severity="error">All questions must have a response</MuiAlert>
            </Snackbar>
            ;
          </Paper>
        </Grid>
      </Dialog>
    </>
  );
};

export default Questions;
