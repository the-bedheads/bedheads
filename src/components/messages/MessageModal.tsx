import React, { FC } from 'react';
import {
  Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions,
} from '@material-ui/core';

interface MessageProps {
  handleClose: (i: React.MouseEvent<HTMLButtonElement, MouseEvent>, check: boolean) => void,
  handleClickOff: () => void,
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
  message: string,
  open: boolean,
  name: string,
}

const MessageModal: FC<MessageProps> = (props): JSX.Element => {
  const {
    handleClose,
    handleClickOff,
    handleTextChange,
    message,
    open,
    name,
  } = props;

  return (
    <Dialog open={open} onClose={handleClickOff} fullWidth maxWidth="md" aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        {`Send ${name} a message!`}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          multiline
          rows={3}
          variant="outlined"
          defaultValue={message}
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

export default MessageModal;
