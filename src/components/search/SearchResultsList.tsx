import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import ResultsListEntry from './SearchResultsListEntry';

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
  const classes = useStyles();
  const { listings, setListings, dateRange } = props;

  const getAvailListingInfo = async (listingIds: []) => {
    const availListings: AxiosResponse<any>[] = [];
    listingIds.map((id: number) => axios.get(`/listing/byId/${id}`)
      .then((listingInfo) => {
        availListings.push(listingInfo.data);
      })
      .then(() => {
        if (availListings.length === listingIds.length) {
          setListings(availListings);
        }
      })
      .catch((err) => err));
  };

  const getAvailListings = () => {
    const { start, end } = dateRange;
    const listingsToRender: any = [];
    axios.get(`/availability/listings/:${start}/:${end}`)
      .then((results) => {
        const availListings = results.data;
        availListings.map((listing: any) => {
          // map through & look up listing by listing_id
          const listingId = listing.listing_id;
          if (!listingsToRender.includes(listingId)) {
            listingsToRender.push(listingId);
          }
          return null;
        });
      })
      .then(() => {
        if (listingsToRender.length) {
          getAvailListingInfo(listingsToRender);
        }
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getAvailListings();
  }, [dateRange.end]);

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
