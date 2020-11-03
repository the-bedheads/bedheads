import React, { FC } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { UserProps } from 'goldilocksTypes';
import UserProfileInfo from './UserProfileInfo';
import UserSidebarInfo from './UserSidebarInfo';

const useStyles = makeStyles({
  main: {
    marginTop: '10px',
    marginBottom: '10px',
  },
});

const UserProfile: FC<UserProps> = ({ user }): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.main} direction="row" justify="center">
      <Grid item xs={3}>
        <UserSidebarInfo user={user} />
      </Grid>
      <Grid item xs={9}>
        <UserProfileInfo user={user} />
      </Grid>
    </Grid>
  );
};

export default UserProfile;
