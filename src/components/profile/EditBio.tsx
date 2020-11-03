import React, { FC } from 'react';
import {
  Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions,
} from '@material-ui/core';

interface BioProps {
  handleClose: (i: React.MouseEvent<HTMLButtonElement, MouseEvent>, check: boolean) => void,
  handleClickOff: () => void,
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
  bio: string,
  open: boolean,
}

const EditBio: FC<BioProps> = (props): JSX.Element => {
  const {
    handleClose,
    handleClickOff,
    handleTextChange,
    bio,
    open,
  } = props;

  return (
    <Dialog open={open} onClose={handleClickOff} fullWidth maxWidth="md" aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit your Bio</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          multiline
          rows={3}
          variant="outlined"
          defaultValue={bio}
          fullWidth
          onChange={(e) => handleTextChange(e)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={(i) => handleClose(i, false)} color="primary">
          Cancel
        </Button>
        <Button onClick={(i) => handleClose(i, true)} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBio;
