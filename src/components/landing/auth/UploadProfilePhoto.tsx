import React, { useState } from 'react';
import clsx from 'clsx';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Paper,
  AppBar,
  Grid,
  Snackbar,
  Typography,
} from '@material-ui/core';
import {
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';
import { MyUploadPhotoProps } from 'goldilocksTypes';
import axios from 'axios';
import logo from '../../../assets/logo.png';

interface MyProps {
  setProfilePhotoUrl: React.Dispatch<React.SetStateAction<string>>,
  profilePhotoUrl: string,
  nextStep: () => void,
  prevStep: () => void,
}

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

const UploadProfilePhoto: React.FC<MyProps> = (Props: MyProps): JSX.Element => {
  const classes = useStyles();
  const {
    nextStep,
    prevStep,
    setProfilePhotoUrl,
  } = Props;

  const rh = process.env.REACT_APP_HOST;
  const rp = process.env.REACT_APP_PORT;
  const [openToast, setOpenToast] = useState(false);

  const handleCloseToast = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenToast(false);
  };

  const uploadPhoto = (photoString: any) => {
    axios.post('/image/newPhoto', {
      data: photoString,
    })
      .then(({ data }) => {
        setProfilePhotoUrl(data);
        setOpenToast(true);
      })
      .catch((err) => console.error(err));
  };

  const handleFileChange = (e: any) => {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      uploadPhoto(reader.result);
    };
  };

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
        <DialogTitle id="form-dialog-title">
          <Box display="flex" alignItems="center">
            <Box flexGrow={1}>Step Four: Upload profile photo</Box>
            <Box>
              <Typography>
                <img src={logo} alt="logo" className={classes.logo} />
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <Paper className={classes.paper}>
          <Button
            className={clsx(classes.buttonMargin, classes.root)}
            variant="contained"
            component="label"
          >
            Choose photo
            <input
              type="file"
              style={{ display: 'none' }}
              onChange={(e) => handleFileChange(e)}
            />
          </Button>
          <br />
          <Grid container alignContent="center" justify="center" className={clsx(classes.margin, classes.root)}>
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
              <MuiAlert severity="success">Photo uploaded successfully</MuiAlert>
            </Snackbar>
          </Grid>
        </Paper>
      </Dialog>
    </>
  );
};

export default UploadProfilePhoto;
