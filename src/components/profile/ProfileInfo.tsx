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
            alt="This person hasn't uploaded any pics of their place yet!"
            className={classes.imgStyle}
          />
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.buttonStyle}>
            {/* <Button
              variant="contained"
              color="primary"
            >
              Availability
            </Button> */}
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
