import React, { FC } from 'react';
import { Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AppInterface } from 'goldilocksTypes';
import UserSidebarInfo from './UserSidebarInfo';
import UserProfileInfo from './UserProfileInfo';

const useStyles = makeStyles({
  main: {
    marginTop: '10px',
    marginBottom: '10px',
  },
});

const UserProfile: FC<AppInterface> = ({ user }): JSX.Element => {
  const classes = useStyles();

  return (
    <Container>
      <Grid container spacing={2} className={classes.main} direction="row" justify="center">
        <Grid item xs={3}>
          <UserSidebarInfo user={user} />
        </Grid>
        <Grid item xs={9}>
          <UserProfileInfo user={user} />
        </Grid>
      </Grid>
    </Container>

  );
};

export default UserProfile;
