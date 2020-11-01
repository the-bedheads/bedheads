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
    paddingTop: '5px',
    paddingBottom: '5px',
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
  const [pic, setPic] = useState(user.image);
  const [tempPic, setTempPic] = useState(pic);

  const handleOpen = (type: string) => {
    if (type === 'pic') {
      setPicOpen(true);
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
    }
  };

  const handleClickOff = (type: string) => {
    if (type === 'pic') {
      setPicOpen(false);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setTempPic(e.target.value);
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
      <Grid item xs={12}>
        <Container className={classes.infoStyle}>
          <Box className={classes.textStyle}>
            {user.name}
          </Box>
          <Box className={classes.textStyle}>
            {user.pronouns}
          </Box>
          <Box className={classes.textStyle}>
            {user.location}
          </Box>
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Box className={classes.buttonStyle}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/messages"
          >
            Message
            {' '}
            {user.name}
          </Button>
        </Box>
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
