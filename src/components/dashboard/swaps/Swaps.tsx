/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, FC, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Container,
  Grid,
  makeStyles,
  AppBar,
  Tabs,
  Tab,
  Box,
  Typography,
} from '@material-ui/core';
import { AppInterface, Availability } from 'goldilocksTypes';
import SwapList from './SwapList';
// import { checkPropTypes } from 'prop-types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const {
    children,
    value,
    index,
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

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  main: {
    paddingTop: '10px',
    paddingBottom: '10px',
    marginTop: '25px',
    marginBottom: '25px',
    backgroundColor: 'white',
  },
});

const Swaps: FC<AppInterface> = ({ user }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [newUser] = useState(user);
  const [accSwaps, setAccSwaps] = useState<Array<Availability>>([]);
  const [pendingSwaps, setPendingSwaps] = useState<Array<Availability>>([]);
  const [completedSwaps, setCompletedSwaps] = useState<Array<Availability>>([]);

  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
    setValue(newValue);
  };

  const getCalendar = async () => {
    const avbId = await axios.get(`listing/user/${user.id}`)
      .then(({ data }) => data.id)
      .catch((err) => console.warn(err.message));
    const allAvb = await axios.get(`availability/allAvailabilities/${avbId}`)
      .then(({ data }) => data)
      .catch((err) => console.warn(err.message));
    const tempAcc: Array<Availability> = [];
    const tempPending: Array<Availability> = [];
    const tempCompleted: Array<Availability> = [];
    allAvb.forEach((entry: Availability) => {
      const { type } = entry;
      if (type === 'swap') {
        tempAcc.push(entry);
      } else if (type === 'req') {
        tempPending.push(entry);
      } else if (type === 'complete') {
        tempCompleted.push(entry);
      }
    });
    setAccSwaps(tempAcc);
    setPendingSwaps(tempPending);
    setCompletedSwaps(tempCompleted);
  };

  const checkConfirmed = () => {
    if (accSwaps.length) {
      return (
        <Grid>
          <Grid>
            These swaps have been confirmed. Have fun!
          </Grid>
          <Grid>
            <SwapList swaps={accSwaps} />
          </Grid>
        </Grid>
      );
    }
    return (
      <Grid>
        You don&apos;t have any upcoming swaps.
      </Grid>
    );
  };

  const checkPending = () => {
    if (pendingSwaps.length) {
      return (
        <Grid>
          <Grid>
            These swaps need your approval. What do you think?
          </Grid>
          <Grid>
            <SwapList swaps={pendingSwaps} />
          </Grid>
        </Grid>
      );
    }
    return (
      <Grid>
        You don&apos;t have any requests.
      </Grid>
    );
  };

  const checkReviews = () => {
    if (completedSwaps.length) {
      return (
        <Grid>
          <Grid>
            These swaps have already happened. Please submit a review for your experience!
          </Grid>
          <Grid>
            <SwapList swaps={completedSwaps} />
          </Grid>
        </Grid>
      );
    }
    return (
      <Grid>
        You don&apos;t have any pending reviews.
      </Grid>
    );
  };

  useEffect(() => {
    getCalendar();
  }, [newUser]);

  return (
    <Container className={classes.main}>
      <Typography variant="h3">
        {`Hello, ${user.firstName}!`}
      </Typography>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="primary"
          centered
        >
          <Tab label="Upcoming Trips" {...a11yProps} />
          <Tab label="Pending Requests" {...a11yProps} />
          <Tab label="Swaps to Review" {...a11yProps} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {checkConfirmed()}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {checkPending()}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {checkReviews()}
      </TabPanel>
    </Container>
  );
};

export default Swaps;
