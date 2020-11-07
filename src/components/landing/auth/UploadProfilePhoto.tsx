import React, { useState } from 'react';
import {
  Button, Dialog, DialogTitle, DialogContent, AppBar, TextField, DialogActions,
} from '@material-ui/core';

interface MyProps {
  nextStep: () => void,
  prevStep: () => void,
}

const UploadProfilePhoto: React.FC<MyProps> = (Props: MyProps): JSX.Element => (
  <>
    <Dialog open fullWidth>
      <AppBar title="Upload Profile Photo">
        <DialogTitle id="form-dialog-title">Upload Your Profile Photo</DialogTitle>
        <TextField
          name="response6"
          autoFocus
          multiline
          rows={3}
          variant="outlined"
          fullWidth
        />
      </AppBar>
    </Dialog>
  </>
);

export default UploadProfilePhoto;
