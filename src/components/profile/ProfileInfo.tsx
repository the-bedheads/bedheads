import React from 'react';
import { Grid, Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  main: {
    border: 1,
    borderRadius: 2,
    borderStyle: 'solid',
    align: 'center',
    justify: 'center',
  },
});

const ProfileInfo: React.FC = (): JSX.Element => {
  const classes = useStyles();
  return (
    <>
      <Container className={classes.main}>
        <Grid item xs={12}>
          Image Carousel
        </Grid>
        <Grid item xs={12}>
          View availability
        </Grid>
        <Grid item xs={12}>
          user bio
        </Grid>
      </Container>
    </>
  );
};

export default ProfileInfo;
