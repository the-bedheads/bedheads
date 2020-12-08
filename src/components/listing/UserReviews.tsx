import React, {
  FC,
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  Paper,
  Tabs,
  Tab,
  AppBar,
  Box,
  Button,
} from '@material-ui/core';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Hotel, Home, Create } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HostReviews from './HostReviews';
import GuestReviews from './GuestReviews';
import WriteAReview from './WriteAReview';

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
  const [reviewer, setRevId] = useState<number>();
  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
    setValue(newValue);
  };

  const renderReviews = () => {
    axios.get(`/reviews/getReviews/${listingId}`)
      .then((reviewInfo) => {
        setAllReviews(reviewInfo.data);
      })
      .catch((err) => err.message);
  };

  useEffect(() => {
    renderReviews();
  }, []);

  return (
    <Grid container spacing={2} className={classes.main} direction="row" justify="center">
      <Grid item xs={12}>
        <Paper className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="primary"
              centered
            >
              <Tab fullWidth label="Guest" icon={<Hotel />} />
              <Tab fullWidth label="Host" icon={<Home />} />
              <Tab
                fullWidth
                label="Write A Review"
                icon={<Create />}
                to="/writeReview"
                component={Link}
              />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={1}>
            <GuestReviews listingId={listingId} allReviews={allReviews} reviewer={reviewer} />
          </TabPanel>
          <TabPanel value={value} index={0}>
            <HostReviews listingId={listingId} allReviews={allReviews} reviewer={reviewer} />
          </TabPanel>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserReviews;
