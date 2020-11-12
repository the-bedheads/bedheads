import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ResultsListEntry from './SearchResultsListEntry';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
  },
}));

interface SearchProps {
  dateRange: { start: string, end: string }
  locationQuery: string
  handleAvailListings: [[], React.Dispatch<React.SetStateAction<[]>>]
}

const ResultsList: React.FC<SearchProps> = ({
  dateRange, locationQuery, handleAvailListings: [availListings, setAvailListings],
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
          listingWithAvail.avbId = listingIds[id].avlbId;
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
              const avlbId = availBlock.id;
              if (!listingsToRender[listingId]) {
                listingsToRender[listingId] = { startDate, endDate, avlbId };
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
      <Grid className={classes.paper} item xs={7}>
        {message}
        {availListings.map((listing: {
          user_id: number; listingId: number; avbId: number; listingTitle: string;
          listingCity: string; listingState: string; startAvail: string;
          endAvail: string; listingPhoto: { url: string } }) => {
          const {
            user_id: userId, listingId, listingTitle, listingCity, listingState,
            startAvail, endAvail, listingPhoto, avbId,
          } = listing;
          const { url } = listingPhoto;
          return (
            <ResultsListEntry
              user={userId}
              listingId={listingId}
              title={listingTitle}
              location={{ listingCity, listingState }}
              listingAvail={{ startAvail, endAvail }}
              queriedDates={dateRange}
              avbId={avbId}
              photo={url}
            />
          );
        })}
      </Grid>
    </div>
  );
};

export default ResultsList;
