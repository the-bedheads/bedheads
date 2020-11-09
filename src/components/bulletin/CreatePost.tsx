import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [postBody, setPostBody] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // axios.post('/bulletin');
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(postBody);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        create post
      </Button>
      <form className="create" onSubmit={handleSubmit}>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">say something! be nice!</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              value={postBody}
              label="Post"
              type="text"
              // onInput={(e) => setPostBody((<HTMLTextAreaElement>e.target).value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary">
              submit
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}
