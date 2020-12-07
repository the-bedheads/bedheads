import React, { FC, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Button,
  TextField,
  makeStyles,
  FormControl,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import { AppInterface } from 'goldilocksTypes';

const useStyles = makeStyles({
  bottom: {
    marginBottom: '10px',
  },
  fieldInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  gridContainer: {
    display: 'flex',
    marginBottom: '10px',
    justifyContent: 'center',
  },
  label: {
    color: 'black',
  },
});

const CreateListing: FC<AppInterface> = ({ user, setUser }): JSX.Element => {
  const classes = useStyles();
  const [photoUrl, setPhotoUrl] = useState('');
  const [listingDescription, setListingDescription] = useState('');
  const [listingAddress, setListingAddress] = useState('');
  const [listingCity, setListingCity] = useState('');
  const [listingState, setListingState] = useState('');
  const [listingZipCode, setListingZipCode] = useState('');
  const [listingTitle, setListingTitle] = useState('');
  const [pets, setPets] = useState(false);
  const [ada, setAda] = useState(false);
  const [smoking, setSmoking] = useState(false);
  const [roommates, setRoommates] = useState(false);
  const [internet, setInternet] = useState(false);
  const [privateBath, setPrivateBath] = useState(false);
  const rh = process.env.REACT_APP_HOST;
  const rp = process.env.REACT_APP_PORT;

  const uploadPhoto = (photoString: any) => {
    axios.post(`http://${rh}:${rp}/image/newPhoto`, {
      data: photoString,
    })
      .then(({ data }) => {
        setPhotoUrl(data);
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

  const handleTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    string: string,
  ) => {
    if (string === 'listingDescription') {
      setListingDescription(e.target.value);
    } else if (string === 'listingAddress') {
      setListingAddress((e.target.value).toLowerCase());
    } else if (string === 'listingCity') {
      setListingCity((e.target.value).toLowerCase());
    } else if (string === 'listingState') {
      setListingState((e.target.value).toLowerCase());
    } else if (string === 'listingZipCode') {
      setListingZipCode(e.target.value);
    } else if (string === 'listingTitle') {
      setListingTitle(e.target.value);
    }
  };

  const toggleSwitch = (string: string) => {
    if (string === 'pets') {
      setPets(!pets);
    } else if (string === 'ada') {
      setAda(!ada);
    } else if (string === 'smoking') {
      setSmoking(!smoking);
    } else if (string === 'roommates') {
      setRoommates(!roommates);
    } else if (string === 'internet') {
      setInternet(!internet);
    } else if (string === 'privateBath') {
      setPrivateBath(!privateBath);
    }
  };

  const handleClose = async () => {
    if (listingAddress && listingCity && listingState && listingZipCode
      && listingTitle && listingDescription && photoUrl
    ) {
      await axios.post('/listing', {
        listingAddress,
        listingCity,
        listingState,
        listingZipCode,
        listingTitle,
        listingDescription,
        pets,
        ada,
        smoking,
        roommates,
        internet,
        privateBath,
        userId: user.id,
        photoUrl,
      })
        .then(() => {
          const tempUser = { ...user };
          tempUser.hasListing = 'true';
          localStorage.setItem('hasListing', 'true');
          if (setUser) {
            setUser(tempUser);
          }
        })
        .catch((err) => console.warn(err));
    }
  };

  return (
    <Container>
      <Grid>
        Welcome to Goldilocks!
      </Grid>
      <Grid>
        We&apos;re glad you decided to join us. Goldilocks is a room-sharing collective designed to
        help you find a safe place to stay on your journeys, while simultaneously providing a
        like-minded traveller the same courtesy. To accomplish this, we ask that you provide some
        basic information about your place. Please fill in the form below, then click
        &quot;Submit&quot; when you&apos;re ready.
      </Grid>
      <Grid
        container
        className={classes.gridContainer}
        spacing={1}
      >
        <Grid item xs={2} className={classes.fieldInfo}>
          Address:
        </Grid>
        <Grid item xs={10}>
          <TextField
            variant="outlined"
            placeholder="Address"
            fullWidth
            onChange={(e) => handleTextChange(e, 'listingAddress')}
          />
        </Grid>
      </Grid>
      <Grid
        container
        className={classes.gridContainer}
        spacing={1}
      >
        <Grid item xs={2} className={classes.fieldInfo}>
          City:
        </Grid>
        <Grid item xs={10}>
          <TextField
            variant="outlined"
            placeholder="City"
            fullWidth
            onChange={(e) => handleTextChange(e, 'listingCity')}
          />
        </Grid>
      </Grid>
      <Grid
        container
        className={classes.gridContainer}
        spacing={1}
      >
        <Grid item xs={2} className={classes.fieldInfo}>
          State:
        </Grid>
        <Grid item xs={10}>
          <TextField
            variant="outlined"
            placeholder="State"
            fullWidth
            onChange={(e) => handleTextChange(e, 'listingState')}
          />
        </Grid>
      </Grid>
      <Grid
        container
        className={classes.gridContainer}
        spacing={1}
      >
        <Grid item xs={2} className={classes.fieldInfo}>
          ZIP Code:
        </Grid>
        <Grid item xs={10}>
          <TextField
            variant="outlined"
            placeholder="Zip Code"
            fullWidth
            onChange={(e) => handleTextChange(e, 'listingZipCode')}
          />
        </Grid>
      </Grid>
      <Grid
        container
        className={classes.gridContainer}
        spacing={1}
      >
        <Grid item xs={2} className={classes.fieldInfo}>
          Title:
        </Grid>
        <Grid item xs={10}>
          <TextField
            variant="outlined"
            placeholder="Give your place a fun title!"
            fullWidth
            onChange={(e) => handleTextChange(e, 'listingTitle')}
          />
        </Grid>
      </Grid>
      <Grid
        container
        className={classes.gridContainer}
        spacing={1}
      >
        <Grid item xs={2} className={classes.fieldInfo}>
          Description:
        </Grid>
        <Grid item xs={10}>
          <TextField
            multiline
            rows={3}
            variant="outlined"
            placeholder="Describe your place!"
            fullWidth
            onChange={(e) => handleTextChange(e, 'listingDescription')}
          />
        </Grid>
      </Grid>
      <Grid className={classes.gridContainer}>
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
      </Grid>
      <Grid className={classes.gridContainer}>
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
      </Grid>
      <Grid className={classes.gridContainer}>
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
      </Grid>
      <Grid className={classes.gridContainer}>
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
      </Grid>
      <Grid className={classes.gridContainer}>
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
      </Grid>
      <Grid className={classes.gridContainer}>
        <FormControl component="fieldset">
          <FormControlLabel
            value
            control={<Switch color="primary" />}
            label="Is your place ADA-compliant?"
            labelPlacement="start"
            color="black"
            onChange={() => toggleSwitch('ada')}
            classes={{
              label: classes.label,
            }}
          />
        </FormControl>
      </Grid>
      <Grid className={classes.gridContainer}>
        <Button
          variant="contained"
          component="label"
          className={classes.bottom}
        >
          Upload Photos
          <input
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => handleFileChange(e)}
          />
        </Button>
      </Grid>
      <Grid className={classes.gridContainer}>
        <Button
          variant="contained"
          component="label"
          onClick={handleClose}
          color="primary"
          className={classes.bottom}
        >
          Submit
        </Button>
      </Grid>
    </Container>
  );
};

export default CreateListing;
