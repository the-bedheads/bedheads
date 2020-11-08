import React, { FC, useState } from 'react';
import axios from 'axios';
import {
  Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions,
  FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Container,
  FormGroup, Switch, makeStyles,
} from '@material-ui/core';

interface BioProps {
  handleClose: (
    i: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    check: boolean,
  ) => void,
  handleClickOff: (type: string) => void,
  handleTextChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | string,
    string: string) => void,
  toggleSwitch: (string: string) => void,
  open: boolean,
}

const useStyles = makeStyles({
  label: {
    color: 'black',
  },
});

const CreateListing: FC<BioProps> = (Props: BioProps): JSX.Element => {
  const classes = useStyles();
  const {
    handleClose,
    handleClickOff,
    handleTextChange,
    toggleSwitch,
    open,
  } = Props;

  const uploadPhoto = async (photoString: any) => {
    axios.post(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/image/newListingPhoto`, {
      data: photoString,
    })
      .then((response) => response)
      // TODO: GETTING A GOOD RESPONSE, NOW JUST NEED TO GET IT BACK TO THE DASHBOARD
      // IE URL IS SHOWING BACK UP ON CLIENT SIDE!!
      .catch((err) => console.warn(err));
  };

  const handleFileChange = async (e: any) => {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      const blah = await uploadPhoto(reader.result);
      console.log(blah);
    };
  };

  return (
    <Dialog open={open} onClose={() => handleClickOff('info')} fullWidth maxWidth="md" aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit your Information</DialogTitle>
      <Button
        variant="contained"
        component="label"
      >
        Upload Photos
        <input
          type="file"
          style={{ display: 'none' }}
          onChange={(e) => handleFileChange(e)}
        />
      </Button>
      <DialogContent>
        <TextField
          autoFocus
          multiline
          variant="outlined"
          placeholder="Whats your address?"
          onChange={(e) => handleTextChange(e, 'listingAddress')}
        />
        <TextField
          autoFocus
          multiline
          variant="outlined"
          placeholder="City?"
          onChange={(e) => handleTextChange(e, 'listingCity')}
        />
        <TextField
          autoFocus
          multiline
          variant="outlined"
          placeholder="State?"
          onChange={(e) => handleTextChange(e, 'listingState')}
        />
        <TextField
          autoFocus
          multiline
          variant="outlined"
          placeholder="Zip Code?"
          onChange={(e) => handleTextChange(e, 'listingZipCode')}
        />
      </DialogContent>
      <DialogContent>
        <TextField
          autoFocus
          multiline
          variant="outlined"
          placeholder="Give your place a fun title!"
          fullWidth
          onChange={(e) => handleTextChange(e, 'listingTitle')}
        />
      </DialogContent>
      <DialogContent>
        <TextField
          autoFocus
          multiline
          rows={3}
          variant="outlined"
          placeholder="Describe your place!"
          fullWidth
          onChange={(e) => handleTextChange(e, 'listingDescription')}
        />
      </DialogContent>
      <DialogContent>
        <FormControl component="fieldset">
          <FormControlLabel
            value
            control={<Switch color="primary" />}
            label="Do you have any pets?"
            labelPlacement="start"
            color="black"
            onChange={() => toggleSwitch('pets')}
            classes={{
              label: classes.label,
            }}
          />
        </FormControl>
        <FormControl component="fieldset">
          <FormControlLabel
            value
            control={<Switch color="primary" />}
            label="Are you a smoker?"
            labelPlacement="start"
            color="black"
            onChange={() => toggleSwitch('smoking')}
            classes={{
              label: classes.label,
            }}
          />
        </FormControl>
      </DialogContent>
      <DialogContent>
        <FormControl component="fieldset">
          <FormControlLabel
            value
            control={<Switch color="primary" />}
            label="Do you have roommates?"
            labelPlacement="start"
            color="black"
            onChange={() => toggleSwitch('roommates')}
            classes={{
              label: classes.label,
            }}
          />
        </FormControl>
        <FormControl component="fieldset">
          <FormControlLabel
            value
            control={<Switch color="primary" />}
            label="Do you have access to WiFi?"
            labelPlacement="start"
            color="black"
            onChange={() => toggleSwitch('internet')}
            classes={{
              label: classes.label,
            }}
          />
        </FormControl>
      </DialogContent>
      <DialogContent>
        <FormControl component="fieldset">
          <FormControlLabel
            value
            control={<Switch color="primary" />}
            label="Do you have a private bathroom?"
            labelPlacement="start"
            color="black"
            onChange={() => toggleSwitch('privateBath')}
            classes={{
              label: classes.label,
            }}
          />
        </FormControl>
        <FormControl component="fieldset">
          <FormControlLabel
            value
            control={<Switch color="primary" />}
            label="Is your place ADA-compliant?"
            labelPlacement="start"
            color="black"
            classes={{
              label: classes.label,
            }}
          />
        </FormControl>
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

export default CreateListing;
