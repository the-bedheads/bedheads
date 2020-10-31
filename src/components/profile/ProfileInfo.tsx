import React, { FunctionComponent } from 'react';
import {
  Grid, Container, Box, Button, makeStyles,
} from '@material-ui/core';

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
    align: 'center',
    justify: 'center',
  },
  buttonStyle: {
    padding: '5px 10px 10px',
    justifyContent: 'center',
    display: 'flex',
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
  imgStyle: {
    height: '30%',
    width: '30%',
    padding: '10px 10px 5px',
  },
});

const ProfileInfo: FunctionComponent<SidebarProps> = ({ user }): JSX.Element => {
  const classes = useStyles();
  return (
    <>
      <Container className={classes.main}>
        <Grid container justify="center" item xs={12}>
          <img
            src={user.listingPhoto}
            alt="nobodys home"
            className={classes.imgStyle}
          />
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.buttonStyle}>
            <Button
              variant="contained"
              color="primary"
            >
              Availability
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Container className={classes.infoStyle}>
            {user.userBio}
          </Container>
        </Grid>
      </Container>
    </>
  );
};

export default ProfileInfo;
