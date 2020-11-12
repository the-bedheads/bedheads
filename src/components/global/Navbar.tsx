import React, { SyntheticEvent, useState } from 'react';
import {
  makeStyles,
  Typography,
  AppBar,
  Toolbar,
  Button,
  MenuItem,
  Menu,
  IconButton,
  Avatar,
  Switch,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    background: '#4E3977',
  },
  avatar: {
    marginLeft: '7px',
  },
});

interface AuthProps {
  handleLogin: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
  toggleMode: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const Navbar: React.FC<AuthProps> = ({
  handleLogin: [isAuth, setAuth],
  toggleMode: [darkMode, setDarkMode],
}): JSX.Element => {
  const classes = useStyles();
  const [isUserAuthenticated, setIsAuthenticated] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      localStorage.clear();
      handleClose();
      setAuth(false);
      toast.success('Successfully logged out!');
    } catch (err) {
      console.warn(err.message);
    }
  };

  // TODO: give the dark mode toggle a label; reformat nav bar -- formgroup?}

  return (
    <div className="toggle-container">
      <AppBar className={classes.root} position="static">
        <Toolbar variant="dense">
          <Typography component={Link} to="/dashboard" variant="h3" color="inherit">
            🛏
          </Typography>
          <Button component={Link} to="/" color="inherit">HOME</Button>
          <IconButton component={Link} to="/search" color="inherit">
            <SearchIcon />
          </IconButton>
          <Switch
            checked={darkMode}
            onChange={() => setDarkMode((prevMode: boolean) => !prevMode)}
            name="toggleMode"
            inputProps={{ 'aria-label': 'toggle between light and dark mode' }}
          />
          <IconButton
            aria-controls="customized-menu"
            aria-haspopup="true"
            onClick={(e) => handleClick(e)}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <MenuItem
              component={Link}
              to="/profile"
              color="inherit"
              onClick={handleClose}
            >
              Profile
            </MenuItem>
            <MenuItem
              component={Link}
              to="/messages"
              color="inherit"
              onClick={handleClose}
            >
              Messages
            </MenuItem>
            <MenuItem>
              Manage Listing
            </MenuItem>
            <MenuItem
              component={Link}
              to="/swaps"
              color="inherit"
              onClick={handleClose}
            >
              View swaps
            </MenuItem>
            <MenuItem
              component={Link}
              to="/calendar"
              color="inherit"
              onClick={handleClose}
            >
              Set availability
            </MenuItem>
            <MenuItem
              component={Link}
              to="/bulletins"
              color="inherit"
              onClick={handleClose}
            >
              Bulletin board
            </MenuItem>
            <MenuItem
              component={Link}
              to="/invite"
              color="inherit"
              onClick={handleClose}
            >
              Invite friends
            </MenuItem>
            <MenuItem
              component={Link}
              to="/invite"
              color="inherit"
              onClick={(e: React.SyntheticEvent<Element, Event>) => logout(e)}
            >
              Logout
            </MenuItem>
          </Menu>
          <Avatar className={classes.avatar}>
            BH
          </Avatar>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
