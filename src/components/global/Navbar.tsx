import React from 'react';
import {
  makeStyles, Typography,
  AppBar, Toolbar, Button,
} from '@material-ui/core';

import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
});

const Navbar: React.FC = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h3" color="inherit">
            🛏
          </Typography>
          <Button component={Link} to="/" color="inherit">HOME</Button>
          <Button component={Link} to="/search" color="inherit">SEARCH</Button>
          <Button component={Link} to="/dashboard" color="inherit">DASHBOARD</Button>
          <Button component={Link} to="/messages" color="inherit">MESSAGES</Button>
          <Button component={Link} to="/profile" color="inherit">PROFILE</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
