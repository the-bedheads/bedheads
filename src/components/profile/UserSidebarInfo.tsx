import React, { FunctionComponent, useState } from 'react';
import {
  Grid, Container, Box, makeStyles, IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PersonIcon from '@material-ui/icons/Person';
import { AppInterface } from 'goldilocksTypes';
import EditProfilePic from './EditProfilePic';
import EditUserInfo from './EditUserInfo';

const useStyles = makeStyles({
  main: {
    backgroundColor: 'white',
    justifyContent: 'center',
    maxWidth: '100%',
  },
  imgStyle: {
    height: '100%',
    width: '100%',
    padding: '10px 10px 5px',
  },
  infoStyle: {
    justifyContent: 'center',
    marginTop: '5px',
    marginBottom: '5px',
  },
  textStyle: {
    textAlign: 'center',
    justifyContent: 'center',
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

const UserSidebarInfo: FunctionComponent<AppInterface> = ({ user }): JSX.Element => {
  const classes = useStyles();
  const [picOpen, setPicOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [pic, setPic] = useState(user.profilePhoto);
  const [name, setName] = useState(user.firstName);
  const [pronouns, setPronouns] = useState(user.pronouns);
  const [location, setLocation] = useState('New Orleans, LA');
  const [tempPic, setTempPic] = useState(pic);
  const [tempName, setTempName] = useState(user.firstName);
  const [tempPronouns, setTempPronouns] = useState(user.pronouns);

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

  const renderImage = () => {
    if (pic === 'undefined') {
      return (
        <PersonIcon className={classes.imgStyle} />
      );
    }
    return (
      <img
        src={pic}
        alt="ya dun goofed"
        className={classes.imgStyle}
      />
    );
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
    }
  };

  return (
    <Container className={classes.main} disableGutters>
      <Grid item xs={12} className={classes.picOverlayStyle}>
        {renderImage()}
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
        <Container className={classes.infoStyle} disableGutters>
          <Grid container className={classes.textStyle}>
            {`${name} (${pronouns})`}
          </Grid>
          <Grid container className={classes.textStyle}>
            {location}
          </Grid>
          <IconButton className={classes.editStyle} onClick={() => handleOpen('info')}>
            <EditIcon className={classes.overlayStyle} />
          </IconButton>
          <EditUserInfo
            handleClose={handleClose}
            handleClickOff={handleClickOff}
            handleTextChange={handleTextChange}
            name={name}
            pronouns={pronouns}
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
