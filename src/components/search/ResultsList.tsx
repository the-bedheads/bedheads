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

const ResultsList = (props: any) => {
  // const [listings, setListings] = useState([]);
  const { listings, setListings } = props;
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
      {listings.map((listing: {
        id: any; user_id: any; listingTitle: any; listingAddress: any; }) => {
        const {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          id, user_id, listingTitle, listingAddress,
        } = listing;
        return (
          <ResultsListEntry key={id} user={user_id} title={listingTitle} address={listingAddress} />
        );
      })}
    </List>
  );
};

export default ResultsList;
