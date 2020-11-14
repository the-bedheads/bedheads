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

  const getMatchPercentage = (scale: any) => {
    const userScale = {
      o: localStorage.openness,
      c: localStorage.conscientiousness,
      e: localStorage.extraversion,
      a: localStorage.agreeableness,
      n: localStorage.neuroticism,
    };
    const diff1 = Math.abs(scale.openness - userScale.o);
    const diff2 = Math.abs(scale.conscientiousness - userScale.c);
    const diff3 = Math.abs(scale.extraversion - userScale.e);
    const diff4 = Math.abs(scale.agreeableness - userScale.a);
    const diff5 = Math.abs(scale.neuroticism - userScale.n);
    const totalDiff = diff1 + diff2 + diff3 + diff4 + diff5;
    const percentage = Math.round(((5 - totalDiff) / 5) * 100);
    return percentage;
  };

  const getAvailListingInfo = (listingIds: any) => {
    const availListingsHolder = [] as any;
    const listingIdsToLookup = Object.keys(listingIds);
    listingIdsToLookup.map((id: any) => axios.get(`/listing/fullSearch/${id}/${locationQuery}`)
      .then((listingInfo) => {
        const listingWithAvail = listingInfo.data;
        const match = getMatchPercentage(listingWithAvail.user.personalityScale);
        if (!listingWithAvail) {
          setMessage('sorry :/ nothing is avail here.');
          setAvailListings([]);
        } else {
          listingWithAvail.startAvail = listingIds[id].startDate;
          listingWithAvail.endAvail = listingIds[id].endDate;
          listingWithAvail.avbId = listingIds[id].avlbId;
          listingWithAvail.matchPercentage = match;
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
        {availListings
          .sort((a: { matchPercentage: number }, b: { matchPercentage: number }) => {
            const diff = b.matchPercentage - a.matchPercentage;
            return diff;
          })
          .map((listing: {
            user_id: number; listingId: number; avbId: number; listingTitle: string;
            listingCity: string; listingState: string; startAvail: string;
            endAvail: string; matchPercentage: number; listingPhoto: { url: string } }) => {
            const {
              user_id: userId, listingId, listingTitle, listingCity, listingState,
              startAvail, endAvail, listingPhoto, avbId, matchPercentage,
            } = listing;
            // console.log(matchPercentage);
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
                matchPercentage={matchPercentage}
              />
            );
          })}
      </Grid>
    </div>
  );
};

export default ResultsList;
