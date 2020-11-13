import React, { FC, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  Paper,
  Tabs,
  Tab,
  AppBar,
  Box,
} from '@material-ui/core';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Hotel, Home } from '@material-ui/icons';
import { UserProps, AppInterface } from 'goldilocksTypes';
import axios from 'axios';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const {
    children, value, index,
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.defaultProps = {
  children: PropTypes.string,
};

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const UserReviews: FC<AppInterface> = ({ user }): JSX.Element => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [guestReviews, setGuestReviews] = useState([]);
  const [hostReviews, setHostReviews] = useState([]);
  const [allReviews, setAllReviews] = useState<any>();
  const [userId] = useState(user.id);
  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
    setValue(newValue);
  };

  const userAsHostReviews = () => {
    axios.get(`reviews/allReviews/${userId}`)
      .then((data) => {
        console.info(data);
        setAllReviews(data);
      });
  };

  const userAsGuestReviews = () => { };

  // TODO: Working on this code
  // useEffect(() => {
  //   userAsHostReviews();
  // }, []);

  return (
    <Grid container spacing={2} className={classes.main} direction="row" justify="center">
      <Grid item xs={12}>
        <Typography align="center" variant="h5">Reviews</Typography>
        <Paper className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="primary"
              centered
            >
              <Tab label="Host" icon={<Home />} />
              <Tab label="Guest" icon={<Hotel />} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            Reviews left by users about User as a Host.
          </TabPanel>
          <TabPanel value={value} index={1}>
            {allReviews}
          </TabPanel>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserReviews;
