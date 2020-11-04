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
  const {
    locationQuery, listings, setListings, dateRange,
  } = props;
  const [errorMessage, setErrorMessage] = useState('');

  // use listing ids to render list of listings
  const getAvailListingInfo = (listingIds: any) => {
    const availListings: AxiosResponse<any>[] = [];
    // using ids, render listings that are available during a given time in a given place
    const listingIdsToLookup = Object.keys(listingIds);
    listingIdsToLookup.map((id: any) => axios.get(`/listing/fullSearch/${id}/${locationQuery}`)
      .then((listingInfo) => {
        // maybe create a listing obj that has start date & end date w props
        const listingWithAvail = listingInfo.data;
        listingWithAvail.startAvail = listingIds[id].startDate;
        listingWithAvail.endAvail = listingIds[id].endDate;
        availListings.push(listingWithAvail);
      })
      .then(() => {
        if (availListings.length === listingIdsToLookup.length) {
          setListings(availListings);
        }
      })
      .catch((err) => err));
    // }
  };

  // listing ids of places available during a certain time range
  const getAvailListings = () => {
    // this is input dateRange
    const { start, end } = dateRange;
    const listingsToRender: any = {};
    // first grab listings that are available during that time
    axios.get(`/availability/listings/:${start}/:${end}`)
      .then((results) => {
        const availListings = results.data;
        // if there are no available listings, inform the user
        if (!availListings.length) {
          console.log(`sorry :/ there doesn't seem to be any available listings in ${locationQuery} from ${start} to ${end}`);
        } else {
        // if there are availabilities, collect the listing IDs of those availabilities
        // push that collection of IDs into an array called listingsToRender
        // {listing id: {start: _, end: _}}
          availListings.map((listing: any) => {
            // map through & look up listing by listing_id
            const listingId = listing.listing_id;
            const { startDate, endDate } = listing;
            // note to self: would be a good place to compare soonest available date
            // object keys are unique!
            if (!listingsToRender[listingId]) {
              listingsToRender[listingId] = { startDate, endDate };
              console.log('LISTINGS TO RENDER AFTER UPDATING', listingsToRender);
            }
            return null;
          });
          getAvailListingInfo(listingsToRender);
        }
      })
      .catch((err) => err);
  };

  useEffect(() => {
    if (locationQuery) {
      console.log('location query', locationQuery);
      getAvailListings();
    }
  }, [locationQuery]);

  return (
    <List className={classes.root}>
      {listings.map((listing: {
        id: any; user_id: any; listingTitle: any;
        listingCity: any; listingState: any; startAvail: any; endAvail: any; }) => {
        const {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          id, user_id, listingTitle, listingCity, listingState, startAvail, endAvail,
        } = listing;
        return (
          <ResultsListEntry
            key={id}
            user={user_id}
            title={listingTitle}
            location={{ listingCity, listingState }}
            avail={{ startAvail, endAvail }}
          />
        );
      })}
    </List>
  );
};

export default ResultsList;
