import React, { FC } from 'react';
import clsx from 'clsx';
import {
  Button,
  Dialog,
  DialogTitle,
  Typography,
  AppBar,
  Grid,
} from '@material-ui/core';
import {
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import { MyUploadPhotoProps } from 'goldilocksTypes';
import axios from 'axios';

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

  const uploadPhoto = (photoString: any) => {
    axios.post(`http://${rh}:${rp}/image/newPhoto`, {
      data: photoString,
    })
      .then(({ data }) => {
        setProfilePhotoUrl(data);
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
        <DialogTitle id="form-dialog-title">Step 3: Upload Your Profile Photo</DialogTitle>
        <Button
          variant="contained"
          component="label"
        >
          Upload Profile Photo
          <input
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => handleFileChange(e)}
          />
        </Button>
        <br />
        <Grid container alignContent="center" justify="center" className={clsx(classes.margin, classes.root)}>
          <Typography>Gregs Upload Button Here</Typography>
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

export default UploadProfilePhoto;
