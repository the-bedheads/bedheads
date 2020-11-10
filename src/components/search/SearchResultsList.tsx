import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import ResultsListEntry from './SearchResultsListEntry';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
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

interface SearchProps {
  dateRange: any
  locationQuery: string
  handleUpdate: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  handleAvailListings: [[], React.Dispatch<React.SetStateAction<[]>>]
}

const ResultsList: React.FC<SearchProps> = ({
  dateRange, locationQuery, handleUpdate: [updated, setUpdated],
  handleAvailListings: [availListings, setAvailListings],
}) => {
  const classes = useStyles();
  const [message, setMessage] = useState('');

  const getAvailListingInfo = (listingIds: any) => {
    const availListingsHolder = [] as any;
    const listingIdsToLookup = Object.keys(listingIds);
    listingIdsToLookup.map((id: any) => axios.get(`/listing/fullSearch/${id}/${locationQuery}`)
      .then((listingInfo) => {
        const listingWithAvail = listingInfo.data;
        if (!listingWithAvail) {
          setMessage('sorry :/ nothing is avail here.');
          setAvailListings([]);
        } else {
          listingWithAvail.startAvail = listingIds[id].startDate;
          listingWithAvail.endAvail = listingIds[id].endDate;
          availListingsHolder.push(listingWithAvail);
        }
      })
      .then(() => {
        if (availListingsHolder.length === listingIdsToLookup.length) {
          setMessage('');
          setAvailListings(availListingsHolder);
        }
      })
      .catch((err) => err));
  };

  const getAvailListings = () => {
    if (locationQuery) {
      const { start, end } = dateRange;
      const listingsToRender: any = {};
      axios.get(`/availability/listings/:${start}/:${end}`)
        .then((results) => {
          const availableListings = results.data;
          if (!availableListings.length) {
            setMessage('sorry :/ nothing is avail here.');
            setAvailListings([]);
          } else {
            availableListings.forEach((availBlock: any) => {
              const { startDate, endDate } = availBlock;
              const listingId = availBlock.listing.id;
              if (!listingsToRender[listingId]) {
                listingsToRender[listingId] = { startDate, endDate };
              }
            });
            getAvailListingInfo(listingsToRender);
          }
        })
        .catch((err) => err);
    }
  };

  useEffect(() => {
    getAvailListings();
  }, [locationQuery, dateRange]);

  return (
    <div className={classes.root}>
      {message}
      <GridList className={classes.gridList} cols={2.5}>
        {availListings.map((listing: {
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
