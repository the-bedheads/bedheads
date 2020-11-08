import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import moment from 'moment';
import axios from 'axios';

import Map from '../global/Map';
import SearchBar from './SearchBar';
import ResultsList from './SearchResultsList';

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
  const [listings, setListings] = useState([] as any);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: moment().format('YYYY-MM-DD'),
    end: moment().add(7, 'days').format('YYYY-MM-DD'),
  });
  const [defaultView, setDefaultView] = useState(true);
  const [updated, setUpdated] = useState(false);

  // view all listings in default search view
  // pass the setter to resultsList; will be updated via search there
  const getListings = () => {
    axios.get('/listing')
      .then((results) => {
        setListings(results.data);
      })
      .catch((err) => err);
  };

  useEffect(() => {
    if (defaultView) getListings();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SearchBar
            xs={6}
            onSubmit={(value: any) => setLocationQuery(value)}
            setDefaultView={setDefaultView}
            setUpdated={setUpdated}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setDateRange={setDateRange}
          />
        </Grid>
        <Grid item xs={12}>
          <ResultsList
            // className={classes.results}
            dateRange={dateRange}
            locationQuery={locationQuery}
            setLocationQuery={setLocationQuery}
            listings={listings}
            setListings={setListings}
            defaultView={defaultView}
            updated={updated}
            setUpdated={setUpdated}
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
