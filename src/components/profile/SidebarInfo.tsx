import React, { FunctionComponent } from 'react';
import {
  Grid, Container, Box, makeStyles, Button,
} from '@material-ui/core';
import {
  Link,
  BrowserRouter as Router,
} from 'react-router-dom';

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
});

const Sidebar: FunctionComponent<SidebarProps> = ({ user }): JSX.Element => {
  const classes = useStyles();
  return (
    <Container className={classes.main}>
      <Grid item xs={12}>
        <img
          src={user.image}
          alt="ya dun goofed"
          className={classes.imgStyle}
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

export default Sidebar;
