import React from 'react';
import { Grid, Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  main: {
    border: 1,
    borderRadius: 2,
    borderStyle: 'solid',
    justifyContent: 'center',
  },
});

const Sidebar: React.FC = (): JSX.Element => {
  const classes = useStyles();
  return (
    <>
      <Container className={classes.main}>
        <Grid item xs={12}>
          user image
        </Grid>
        <Grid item xs={12}>
          user info
        </Grid>
        <Grid item xs={12}>
          message user
        </Grid>
        <Grid item xs={12}>
          spotify
        </Grid>
        <Grid item xs={12}>
          instagram
        </Grid>
      </Container>
    </>
  );
};

export default Sidebar;
