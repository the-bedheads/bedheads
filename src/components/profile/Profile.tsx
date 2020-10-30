import React from 'react';
import { Grid } from '@material-ui/core';
import ProfileInfo from './ProfileInfo';
import SidebarInfo from './SidebarInfo';

const Profile: React.FC = (): JSX.Element => (
  <>
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <SidebarInfo />
      </Grid>
      <Grid item xs={9}>
        <ProfileInfo />
      </Grid>
    </Grid>
  </>
);

export default Profile;
