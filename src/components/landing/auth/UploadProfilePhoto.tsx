import React, { FC } from 'react';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Paper,
  AppBar,
  Grid,
  Typography,
} from '@material-ui/core';
import {
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
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

  const uploadPhoto = (photoString: any) => {
    axios.post('/image/newPhoto', {
      data: photoString,
    })
      .then(({ data }) => {
        setProfilePhotoUrl(data);
        toast.success('Photo successfully uploaded!');
      })
      .catch((err) => console.warn(err));
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
          </Grid>
        </Paper>
      </Dialog>
    </>
  );
};

export default UploadProfilePhoto;
