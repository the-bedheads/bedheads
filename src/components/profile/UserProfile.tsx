import React, { FunctionComponent } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import UserProfileInfo from './UserProfileInfo';
import UserSidebarInfo from './UserSidebarInfo';

const useStyles = makeStyles({
  main: {
    marginTop: '10px',
    marginBottom: '10px',
  },
});
type UserType = {
  dob: string,
  email: string,
  first_name: string,
  guestRating: number,
  hostRating: number,
  id: number,
  inviteCount: number,
  last_name: string,
  password: string,
  profilePhoto: string,
  pronouns: string,
  swapCount: number,
  userBio: string,
};

interface UserProfileProps {
  user: UserType,
}

const UserProfile: FunctionComponent<UserProfileProps> = ({ user }): JSX.Element => {
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
