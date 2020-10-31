import React, { useEffect, useState } from 'react';
import { Grid, Box, makeStyles } from '@material-ui/core';
import axios from 'axios';
import ProfileInfo from './ProfileInfo';
import SidebarInfo from './SidebarInfo';

const useStyles = makeStyles({
  main: {
    marginTop: '10px',
    marginBottom: '10px',
  },
});

const Profile = () => {
  const classes = useStyles();
  const [user, setUser] = useState({
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    name: 'Stacy',
    pronouns: 'she/them',
    location: 'Cleveland, Ohio',
    listingPhoto: 'https://images.unsplash.com/photo-1520619831939-20749195c50f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=651&q=80',
    userBio: 'Hi, im stacy. I like stuff and things and honestly, im just trying to make this long enough to see how text wrapping is going to work. Am I done yet?',
  });

  return (
    <Grid container spacing={2} className={classes.main} direction="row" justify="center">
      <Grid item xs={3}>
        <SidebarInfo user={user} />
      </Grid>
      <Grid item xs={9}>
        <ProfileInfo user={user} />
      </Grid>
    </Grid>
  );
};

export default Profile;
