import React, { FC, useState } from 'react';
import {
  Grid, makeStyles, Typography, Paper, Tabs, Tab,
} from '@material-ui/core';
import { Hotel, Home } from '@material-ui/icons';
import { UserProps } from 'goldilocksTypes';
import UserProfileInfo from './UserProfileInfo';
import UserSidebarInfo from './UserSidebarInfo';

const useStyles = makeStyles({
  main: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  root: {
    flexGrow: 1,
  },
});

const UserProfile: FC<UserProps> = ({ user }): JSX.Element => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={2} className={classes.main} direction="row" justify="center">
      <Grid item xs={3}>
        <UserSidebarInfo user={user} />
      </Grid>
      <Grid item xs={9}>
        <UserProfileInfo user={user} />< br />
        <Grid item xs={12}>
          <Typography align="center" variant="h5">{`${user.firstName}'s Reviews`}</Typography>
          <Paper className={classes.root}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="primary"
              // variant="fullWidth"
              centered
            >
              <Tab label="Host" icon={<Home />} />
              <Tab label="Guest" icon={<Hotel />} />
            </Tabs>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
