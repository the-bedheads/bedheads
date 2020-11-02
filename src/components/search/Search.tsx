import React, { FC, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Map from '../global/Map';
import SearchBar from './SearchBar';
import ResultsList from './ResultsList';
import DatePicker from './DatePicker';

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

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <SearchBar onSubmit={(value: any) => setLocationQuery(value)} />
        </Grid>
        <Grid item xs={3}>
          <DatePicker
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </Grid>
        <Grid item xs={6}>
          <ResultsList
            startDate={startDate}
            endDate={endDate}
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
