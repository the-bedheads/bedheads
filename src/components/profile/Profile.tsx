import React, { useState, FunctionComponent, useEffect } from 'react';
import { Grid, Container, makeStyles } from '@material-ui/core';
import { ProfileProps } from 'goldilocksTypes';
import { string } from 'prop-types';
import ProfileInfo from './ProfileInfo';
import SidebarInfo from './SidebarInfo';

const useStyles = makeStyles({
  main: {
    marginTop: '10px',
    marginBottom: '10px',
    paddingBottom: '10px',
  },
});

const Profile: FunctionComponent<ProfileProps> = (props): JSX.Element => {
  const { location } = props;
  const [hostData] = useState(location.state.hostData);
  const [userId] = useState(location.state.userId);
  const classes = useStyles();

  return (
    <Container>
      <Grid container spacing={2} className={classes.main} direction="row" justify="center">
        <Grid item xs={4}>
          <SidebarInfo host={hostData} userId={userId} />
        </Grid>
        <Grid item xs={8}>
          <ProfileInfo host={hostData} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
