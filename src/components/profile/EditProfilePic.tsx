import React, { FunctionComponent, useState } from 'react';
import {
  Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions,
} from '@material-ui/core';

interface BioProps {
  handleClose: (
    i: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    check: boolean,
    type: string,
  ) => void,
  handleClickOff: (type: string) => void,
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
  pic: string,
  picOpen: boolean,
}

const EditProfilePic: FunctionComponent<BioProps> = (Props: BioProps): JSX.Element => {
  const {
    handleClose,
    handleClickOff,
    picOpen,
  } = Props;

  return (
    <Dialog open={picOpen} onClose={() => handleClickOff('pic')} fullWidth maxWidth="md" aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Something here to let you pick a new picture</DialogTitle>
      <DialogActions>
        <Button onClick={(i) => handleClose(i, false, 'pic')} color="primary">
          Cancel
        </Button>
        <Button onClick={(i) => handleClose(i, true, 'pic')} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfilePic;
