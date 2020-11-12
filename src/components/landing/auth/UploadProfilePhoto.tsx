import React, { useState } from 'react';
import {
  Button, Dialog, DialogTitle, Typography, AppBar, TextField, DialogActions,
} from '@material-ui/core';
import axios from 'axios';

interface MyProps {
  setProfilePhotoUrl: React.Dispatch<React.SetStateAction<string>>,
  profilePhotoUrl: string,
  nextStep: () => void,
  prevStep: () => void,
}

const UploadProfilePhoto: React.FC<MyProps> = (Props: MyProps): JSX.Element => {
  const {
    nextStep,
    prevStep,
    setProfilePhotoUrl,
  } = Props;

  const rh = process.env.REACT_APP_HOST;
  const rp = process.env.REACT_APP_PORT;

  const uploadPhoto = (photoString: any) => {
    console.log('hitting the uploadPhoto function');
    axios.post(`http://${rh}:${rp}/image/newPhoto`, {
      data: photoString,
    })
      .then(({ data }) => {
        console.log('returned string after axios request and cloudinary uploader:', data);
        setProfilePhotoUrl(data);
      })
      .catch((err) => console.warn(err));
  };

  const handleFileChange = (e: any) => {
    console.log('hitting the handleFileChange function');
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
