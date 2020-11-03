import React, { useEffect, useState, FunctionComponent } from 'react';
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

const Profile: FunctionComponent = (props: any): JSX.Element => {
  const { location } = props;
  const [hostData] = useState(location.state.hostData);
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.main} direction="row" justify="center">
      <Grid item xs={3}>
        <SidebarInfo host={hostData} />
      </Grid>
      <Grid item xs={9}>
        <ProfileInfo host={hostData} />
      </Grid>
    </Grid>
  );
};

export default Profile;
