import React, { FC, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import moment, { isMoment } from 'moment';
import axios from 'axios';

import Map from '../global/Map';
import SearchBar from './SearchBar';
import ResultsList from './SearchResultsList';

type SearchProps = {
  query: string
};

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Search: React.FC = () => {
  const classes = useStyles();
  const [locationQuery, setLocationQuery] = useState('');
  const [listings, setListings] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: moment().format('YYYY-MM-DD'),
    end: moment().add(7, 'days').format('YYYY-MM-DD'),
  });

  // view all listings in default search view
  // pass the setter to resultsList; will be updated via search there
  const getListings = () => {
    axios.get('/listing')
      .then((results) => {
        const savedListings = results.data;
        setListings(savedListings);
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getListings();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <SearchBar
            onSubmit={(value: any) => setLocationQuery(value)}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setDateRange={setDateRange}
          />
        </Grid>
        <Grid item xs={6}>
          <ResultsList
            // startDate={startDate}
            // endDate={endDate}
            dateRange={dateRange}
            locationQuery={locationQuery}
            listings={listings}
            setListings={setListings}
          />
        </Grid>
        <Grid item xs={6}>
          <Map locationQuery={locationQuery} listings={listings} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Search;
