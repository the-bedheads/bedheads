import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ResultsListEntry from './SearchResultsListEntry';

const useStyles = makeStyles((theme: Theme) => createStyles({
  paper: {
    margin: 'auto',
  },
  listing: {
    padding: theme.spacing(2),
    margin: 'auto',
  },
}));

interface SearchProps {
  dateRange: { start: string, end: string }
  locationQuery: string
  handleAvailListings: [[], React.Dispatch<any>]
}

const ResultsList: React.FC<SearchProps> = ({
  dateRange, locationQuery, handleAvailListings: [availListings, setAvailListings],
}) => {
  const classes = useStyles();
  const [message, setMessage] = useState('');

  const getMatchPerc = (scale: any) => {
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

  const getAvailListingInfo = async (listingIds: any) => {
    const listingIdsToLookup = Object.keys(listingIds);
    const getAvlbListings = async () => Promise.all(
      listingIdsToLookup.map((id: any) => axios.get(`/listing/fullSearch/${id}/${locationQuery}`)
        .then((listingInfo) => {
          const newObj = { ...listingInfo };
          if (newObj.data) {
            newObj.data.startAvail = listingIds[id].startDate;
            newObj.data.endAvail = listingIds[id].endDate;
            newObj.data.avbId = listingIds[id].avlbId;
            newObj.data.matchPercentage = getMatchPerc(listingInfo.data.user.personalityScale);
          }
          return newObj.data;
        })),
    );
    const avlbListings: Array<any> = await getAvlbListings()
      .then((data) => data.filter((datum) => !!datum));
    if (!avlbListings) {
      setMessage('sorry :/ nothing is avail here.');
      setAvailListings([]);
    } else {
      setAvailListings(avlbListings);
    }
  };

  const getAvailListings = async () => {
    if (locationQuery) {
      const { start, end } = dateRange;
      const listingsToRender: any = {};
      const availableListings = await axios.get(`/availability/listings/:${start}/:${end}`)
        .then(({ data }) => data)
        .catch((err) => err);
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
    }
  };

  useEffect(() => {
    getAvailListings();
  }, [locationQuery, dateRange]);

  return (
    <Grid className={classes.paper} container item xs={6}>
      {setMessage}
      {availListings.map((listing: {
        userId: number; avbId: number; listingTitle: string;
        listingCity: string; listingState: string; startAvail: string;
        endAvail: string; matchPercentage: number; listingPhoto: { url: string } }) => {
        const {
          userId, listingTitle, listingCity, listingState,
          startAvail, endAvail, listingPhoto, avbId, matchPercentage,
        } = listing;
        const { url } = listingPhoto;
        return (
          <Grid container item className={classes.listing}>
            <ResultsListEntry
              user={userId}
              title={listingTitle}
              location={{ listingCity, listingState }}
              listingAvail={{ startAvail, endAvail }}
              queriedDates={dateRange}
              avbId={avbId}
              photo={url}
              matchPercentage={matchPercentage}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ResultsList;
