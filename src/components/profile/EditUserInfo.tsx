import React, { FunctionComponent } from 'react';
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
  handleTextChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: string,
  ) => void,
  name: string,
  pronouns: string,
  infoOpen: boolean,
  picOpen: boolean,
}

const EditUserInfo: FunctionComponent<BioProps> = (Props: BioProps): JSX.Element => {
  const {
    handleClose,
    handleClickOff,
    handleTextChange,
    name,
    pronouns,
    infoOpen,
  } = Props;

  return (
    <Dialog open={infoOpen} onClose={() => handleClickOff('info')} fullWidth maxWidth="md" aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit your Information</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          multiline
          rows={3}
          variant="outlined"
          label="Name"
          defaultValue={name}
          fullWidth
          onChange={(e) => handleTextChange(e, 'name')}
        />
      </DialogContent>
      <DialogContent>
        <TextField
          autoFocus
          multiline
          rows={3}
          variant="outlined"
          label="Preferred pronouns"
          defaultValue={pronouns}
          fullWidth
          onChange={(e) => handleTextChange(e, 'pronouns')}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={(i) => handleClose(i, false, 'info')} color="primary">
          Cancel
        </Button>
        <Button onClick={(i) => handleClose(i, true, 'info')} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserInfo;
