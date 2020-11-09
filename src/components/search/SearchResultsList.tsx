import React, { useState, useEffect, useCallback } from 'react';
import axios, { AxiosResponse } from 'axios';
import List from '@material-ui/core/List';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import ResultsListEntry from './SearchResultsListEntry';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    // width: '100%',
    // maxWidth: '36ch',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
  },
  inline: {
    display: 'inline',
  },
}));

const ResultsList = (props: any) => {
  const classes = useStyles();
  const {
    locationQuery, listings, setListings, dateRange,
    defaultView, setLocationQuery, updated, setUpdated,
  } = props;
  const [message, setMessage] = useState('');

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
          // TODO: render this message
          setListings([]);
          setMessage(`sorry :/ there doesn't seem to be any available listings in ${locationQuery} from ${start} to ${end}`);
        } else {
        // if there are availabilities, collect the listing IDs of those availabilities
        // push that collection of IDs into an array called listingsToRender
        // {listing id: {start: _, end: _}}
          availListings.forEach((listing: any) => {
            // map through & look up listing by listing_id
            const { listing_id: listingId, startDate, endDate } = listing;
            // note to self: would be a good place to compare soonest available date
            // object keys are unique!
            if (!listingsToRender[listingId]) {
              listingsToRender[listingId] = { startDate, endDate };
            }
          });
          getAvailListingInfo(listingsToRender);
        }
      })
      .catch((err) => err);
  };

  useEffect(() => {
    if (locationQuery && !updated) {
      getAvailListings();
      setUpdated(true);
    }
  }, [listings, locationQuery]);

  return (
    <div className={classes.root}>
      {message}
      <GridList className={classes.gridList} cols={2.5}>
        {listings.map((listing: {
          id: any; user_id: any; listingTitle: any;
          listingCity: any; listingState: any; startAvail: any;
          endAvail: any; availabilities: any; }) => {
          const {
            id, user_id: userId, listingTitle, listingCity, listingState,
            startAvail, endAvail,
          } = listing;
          let defaultAvail = {
            startDate: '',
            endDate: '',
          };
          if (listing.availabilities) {
            const { availabilities } = listing;
            [defaultAvail] = availabilities;
          }
          return (
            <GridListTile key={id}>
              <ResultsListEntry
                user={userId}
                title={listingTitle}
                location={{ listingCity, listingState }}
                avail={{ startAvail, endAvail }}
                defaultView={defaultView}
                updated={updated}
                availForDefault={defaultAvail}
              />
            </GridListTile>
          );
        })}
      </GridList>
    </div>
  );
};

export default ResultsList;
