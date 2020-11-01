import React, { FunctionComponent, useState } from 'react';
import {
  Grid, Container, Box, makeStyles, Button, IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import {
  Link,
  BrowserRouter as Router,
} from 'react-router-dom';
import EditProfilePic from './EditProfilePic';
import EditUserInfo from './EditUserInfo';

type UserType = {
  image: string,
  name: string,
  pronouns: string,
  location: string,
  listingPhoto: string,
  userBio: string,
};
interface SidebarProps {
  user: UserType,
}

const useStyles = makeStyles({
  main: {
    border: 1,
    borderRadius: 2,
    borderStyle: 'solid',
    justifyContent: 'center',
  },
  imgStyle: {
    height: '100%',
    width: '100%',
    padding: '10px 10px 5px',
  },
  infoStyle: {
    border: 1,
    borderRadius: 2,
    borderStyle: 'solid',
    justifyContent: 'center',
    width: '50%',
    marginTop: '5px',
    marginBottom: '5px',
  },
  textStyle: {
    textAlign: 'center',
    wordWrap: 'break-word',
  },
  buttonStyle: {
    padding: '5px 10px 10px',
    justifyContent: 'center',
    display: 'flex',
  },
  overlayStyle: {
    color: 'black',
    position: 'absolute',
    bottom: '0',
    right: '0',
    opacity: '.25',
  },
  editStyle: {
    position: 'absolute',
    bottom: '0',
    right: '0',
  },
  picOverlayStyle: {
    position: 'relative',
    '&:hover': {
      '& $overlayStyle': {
        opacity: '1',
      },
    },
  },
});

const UserSidebarInfo: FunctionComponent<SidebarProps> = ({ user }): JSX.Element => {
  const classes = useStyles();
  const [picOpen, setPicOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [pic, setPic] = useState(user.image);
  const [name, setName] = useState(user.name);
  const [pronouns, setPronouns] = useState(user.pronouns);
  const [location, setLocation] = useState(user.location);
  const [tempPic, setTempPic] = useState(pic);
  const [tempName, setTempName] = useState(user.name);
  const [tempPronouns, setTempPronouns] = useState(user.pronouns);
  const [tempLocation, setTempLocation] = useState(user.location);

  const handleOpen = (type: string) => {
    if (type === 'pic') {
      setPicOpen(true);
    } else {
      setInfoOpen(true);
    }
  };

  const handleClose = (
    i: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    check: boolean,
    type: string,
  ) => {
    if (type === 'pic') {
      if (check) {
        // save changes to DB
        // update field on screen
        setPic(tempPic);
      }
      setPicOpen(false);
    } else {
      if (check) {
        if (name !== tempName) {
          setName(tempName);
        }
        if (pronouns !== tempPronouns) {
          setPronouns(tempPronouns);
        }
        if (location !== tempLocation) {
          setLocation(tempLocation);
        }
        // save changes to DB
        // update field on screen
      }
      setInfoOpen(false);
    }
  };

  const handleClickOff = (type: string) => {
    if (type === 'pic') {
      setPicOpen(false);
    } else {
      setInfoOpen(false);
    }
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: string,
  ) => {
    if (type === 'pic') {
      setTempPic(e.target.value);
    } else if (type === 'name') {
      setTempName(e.target.value);
    } else if (type === 'pronouns') {
      setTempPronouns(e.target.value);
    } else if (type === 'location') {
      setTempLocation(e.target.value);
    }
  };

  return (
    <Container className={classes.main}>
      <Grid item xs={12} className={classes.picOverlayStyle}>
        <img
          src={pic}
          alt="ya dun goofed"
          className={classes.imgStyle}
        />
        <IconButton className={classes.editStyle} onClick={() => handleOpen('pic')}>
          <EditIcon className={classes.overlayStyle} />
        </IconButton>
        <EditProfilePic
          handleClose={handleClose}
          handleClickOff={handleClickOff}
          handleTextChange={handleTextChange}
          pic={pic}
          picOpen={picOpen}
        />
      </Grid>
      <Grid item xs={12} className={classes.picOverlayStyle}>
        <Container className={classes.infoStyle}>
          <Box className={classes.textStyle}>
            {name}
          </Box>
          <Box className={classes.textStyle}>
            {pronouns}
          </Box>
          <Box className={classes.textStyle}>
            {location}
          </Box>
          <IconButton className={classes.editStyle} onClick={() => handleOpen('info')}>
            <EditIcon className={classes.overlayStyle} />
          </IconButton>
          <EditUserInfo
            handleClose={handleClose}
            handleClickOff={handleClickOff}
            handleTextChange={handleTextChange}
            name={name}
            pronouns={pronouns}
            location={location}
            infoOpen={infoOpen}
            picOpen={picOpen}
          />
        </Container>
      </Grid>
      {/* <Grid item xs={12}>
        spotify
      </Grid>
      <Grid item xs={12}>
        instagram
      </Grid> */}
    </Container>
  );
};

export default UserSidebarInfo;
