import React, { FunctionComponent } from 'react';
import {
  Grid, Container, Box, makeStyles, Button,
} from '@material-ui/core';
import {
  Link,
  BrowserRouter as Router,
} from 'react-router-dom';

type HostDataType = {
  firstName: string,
  hostRating: number,
  lastName: string,
  pronouns: string,
  id: number,
  profilePhoto: string,
  userBio: string,
};

interface ProfileProps {
  host: HostDataType,
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

const Sidebar: FunctionComponent<ProfileProps> = ({ host }): JSX.Element => {
  const classes = useStyles();
  return (
    <Container className={classes.main}>
      <Grid item xs={12}>
        <img
          src={host.profilePhoto}
          alt="ya dun goofed"
          className={classes.imgStyle}
        />
      </Grid>
      <Grid item xs={12}>
        <Container className={classes.infoStyle}>
          <Box className={classes.textStyle}>
            {host.firstName}
          </Box>
          <Box className={classes.textStyle}>
            {host.pronouns}
          </Box>
          <Box className={classes.textStyle}>
            New Orleans, LA
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
            {host.firstName}
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
