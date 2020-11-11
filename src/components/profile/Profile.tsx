import React, { useState, FunctionComponent } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { ProfileProps } from 'goldilocksTypes';
import ProfileInfo from './ProfileInfo';
import SidebarInfo from './SidebarInfo';

const useStyles = makeStyles({
  main: {
    marginTop: '10px',
    marginBottom: '10px',
  },
});

const Profile: FunctionComponent<ProfileProps> = (props): JSX.Element => {
  const { location } = props;
  const [hostData] = useState(location.state.hostData);
  const [userId] = useState(location.state.userId);
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.main} direction="row" justify="center">
      <Grid item xs={3}>
        <SidebarInfo host={hostData} userId={userId} />
      </Grid>
      <Grid item xs={9}>
        <ProfileInfo host={hostData} />
      </Grid>
    </Grid>
  );
};

export default Profile;
