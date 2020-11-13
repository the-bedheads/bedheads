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
import axios from 'axios';
import HostReviews from './HostReviews';
import GuestReviews from './GuestReviews';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

interface ListingProps {
  listingId: number
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

const UserReviews: FC<ListingProps> = ({ listingId }): JSX.Element => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [allReviews, setAllReviews] = useState([]);
  const [listing, setListing] = useState<number>(listingId);
  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
    setValue(newValue);
  };

  const renderReviews = () => {
    axios.get(`/reviews/getReviews/${listingId}`)
      .then((reviewInfo) => {
        console.info(reviewInfo.data);
        setAllReviews(reviewInfo.data);
      })
      .catch((err) => err.message);
  };

  // TODO: Working on this code
  useEffect(() => {
    renderReviews();
  }, []);

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
            <HostReviews listingId={listingId} allReviews={allReviews} />
            <br />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <GuestReviews listingId={listingId} allReviews={allReviews} />
            <br />
          </TabPanel>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserReviews;
