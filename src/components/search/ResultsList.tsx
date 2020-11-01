import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import ResultsListEntry from './ResultsListEntry';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const ResultsList = () => {
  const [listings, setListings] = useState([]);
  const classes = useStyles();

  const getListings = () => {
    axios.get('/listing')
      .then((results) => {
        const savedListings = results.data;
        setListings(savedListings);
      })
      .catch((err) => err);
  };

  useEffect(() => {
    // run a func
    getListings();
  }, []);

  return (
    <List className={classes.root}>
      {listings.map((listing) => {
        const { id, listingTitle, listingAddress } = listing;
        return (
          <ResultsListEntry key={id} title={listingTitle} address={listingAddress} />
        );
      })}
    </List>
  );
};

export default ResultsList;
