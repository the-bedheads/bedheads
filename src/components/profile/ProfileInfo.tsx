import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { ProfileInfoInterface } from 'goldilocksTypes';
import {
  Grid,
  Container,
  Box,
  Button,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
  main: {
    backgroundColor: 'white',
    align: 'center',
    justify: 'center',
    marginBottom: '10px',
  },
  buttonStyle: {
    padding: '5px 10px 10px',
    justifyContent: 'center',
    display: 'flex',
  },
  infoStyle: {
    position: 'relative',
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
    height: '60%',
    width: '60%',
    padding: '10px 10px 5px',
  },
});

const ProfileInfo: FC<ProfileInfoInterface> = ({ host }): JSX.Element => {
  const classes = useStyles();
  const [bio] = useState(host.userBio);
  const [listingPic, setListingPic] = useState('');

  useEffect(() => {
    axios.get(`/listingPhotos/${host.id}`)
      .then(({ data }) => setListingPic(data.url));
  }, []);

  return (
    <>
      <Container className={classes.main}>
        <Grid container justify="center" item xs={12}>
          <img
            src={listingPic}
            alt="No listing photo yet"
            className={classes.imgStyle}
          />
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.buttonStyle}>
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
