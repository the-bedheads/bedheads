import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import moment from 'moment';

import Map from '../global/Map';
import SearchBar from './SearchBar';
import ResultsList from './SearchResultsList';
import SearchDefaultList from './SearchDefaultList';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    // margin: 'auto',
    padding: '25px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
  },
  search: {
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: 'white',
  },
}));

const Search: React.FC = () => {
  const classes = useStyles();
  const [locationQuery, setLocationQuery] = useState('');
  const [availListings, setAvailListings] = useState([] as any);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: moment().format('YYYY-MM-DD'),
    end: moment().add(7, 'days').format('YYYY-MM-DD'),
  });
  const [defaultView, setDefaultView] = useState(true);

  return (
    <>
      <div className={classes.root}>
        <Grid container className={classes.container} spacing={3}>
          <Grid item className={classes.search} xs={8}>
            <SearchBar
              xs={6}
              onSubmit={(value: string) => setLocationQuery(value)}
              setDefaultView={setDefaultView}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              setDateRange={setDateRange}
            />
          </Grid>
          {defaultView ? <Grid container spacing={4}><SearchDefaultList /></Grid>
            : (
              <>
                <Grid container justify="center" xs={12} spacing={3}>
                  <ResultsList
                    dateRange={dateRange} // necessary for error message
                    locationQuery={locationQuery} // necessary for error message
                    handleAvailListings={[availListings, setAvailListings]}
                  />
                  <Map locationQuery={locationQuery} listings={availListings} />
                </Grid>
              </>
            )}
        </Grid>
      </div>
    </>
  );
};

export default Search;
