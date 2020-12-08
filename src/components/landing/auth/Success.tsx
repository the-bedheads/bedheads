import React, { FC } from 'react';
import clsx from 'clsx';
import {
  Grid,
  Paper,
  // Link,
  Button,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import success from '../../../assets/checked.png';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: '40ch',
    },
  },
  margin: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    borderRadius: 20,
    borderColor: '#f8c009',
    border: '3px solid',
  },
  buttonMargin: {
    margin: theme.spacing(2),
  },
  logo: {
    maxHeight: 80,
    alignItems: 'center',
  },
}));

const Success: FC = (): JSX.Element => {
  const classes = useStyles();
  const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

  return (
    <div className="success-container">
      <Grid container justify="center" alignItems="center">
        <Grid item className={classes.margin}>
          <Paper className={classes.paper}>
            <Typography className="logo-login">
              <img src={success} alt="logo" className={classes.logo} />
            </Typography>
            <Typography
              variant="h3"
              color="secondary"
            >
              Success!
            </Typography>
            <Link to="/">
              <Button
                className={classes.buttonMargin}
                variant="contained"
                color="primary"
              >
                Login to your profile
              </Button>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
export default Success;
