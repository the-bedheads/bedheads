import React, { SyntheticEvent } from 'react';
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

interface AuthProps {
  handleLogin: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const Navbar: React.FC<AuthProps> = ({ handleLogin: [isAuthenticated, setAuth] }): JSX.Element => {
  const classes = useStyles();

  const logoutUser = (event: SyntheticEvent) => {
    event.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
  };

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
          <Button onClick={logoutUser} color="inherit">LOGOUT</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
