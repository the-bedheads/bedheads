import React, { FunctionComponent, useState } from 'react';
import {
  Grid, Container, Box, Button, makeStyles,
} from '@material-ui/core';

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
    position: 'relative',
    borderStyle: 'solid',
    justifyContent: 'center',
    width: '50%',
    marginTop: '5px',
    marginBottom: '5px',
    '&:hover': {
      '& $overlayStyle': {
        opacity: '1',
      },
    },
  },
  imgStyle: {
    height: '30%',
    width: '30%',
    padding: '10px 10px 5px',
  },
});

const ProfileInfo: FunctionComponent<ProfileProps> = ({ host }): JSX.Element => {
  const classes = useStyles();
  const [bio] = useState(host.userBio);

  return (
    <>
      <Container className={classes.main}>
        <Grid container justify="center" item xs={12}>
          <img
            src="https://images.unsplash.com/photo-1520619831939-20749195c50f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=651&q=80"
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
            {bio}
          </Container>
        </Grid>
      </Container>
    </>
  );
};

export default ProfileInfo;
