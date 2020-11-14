import React, { useState, useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DefaultListEntry from './SearchDefaultListEntry';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    height: 275,
    width: 250,
    padding: theme.spacing(2),
    margin: 'auto',
  },
  gridList: {
    flexWrap: 'nowrap',
  },
  inline: {
    display: 'inline',
  },
  text: {
    margin: 'auto',
  },
}));

const SearchDefaultList: React.FC = () => {
  const classes = useStyles();
  const [defaultListings, setDefaultListings] = useState([] as any);

  const getDefaultListings = () => {
    axios.get(`/listing/randomFour/${localStorage.userId}`)
      .then((results) => {
        setDefaultListings(results.data);
      })
      .catch((err) => err);
  };

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

  useEffect(() => {
    getDefaultListings();
  }, []);

  if (defaultListings.length) {
    return (
      <>
        <Grid container justify="center" xs={12}>
          <Grid item xs={8} alignItems="center">
            <Typography className={classes.text} variant="h5">
              rooms available for swapping now:
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} />
        <Grid container justify="center" spacing={4}>
          {defaultListings.map((random: {
            id: number;
            user_id: number;
            listingTitle: string;
            listingCity: string;
            listingState: string;
            user: any;
            availabilities: [{
              startDate: Date,
            }];
            listingPhoto: {
              url: string;
            }
          }) => {
            const {
              id, user_id: userId, listingTitle, listingCity,
              listingState, availabilities, listingPhoto,
            } = random;
            const matchPercentage = getMatchPercentage(random.user.personalityScale);
            const earliestAvail = availabilities[0].startDate;
            const { url } = listingPhoto;
            return (
              <Grid key={id} item>
                <Paper className={classes.paper}>
                  <DefaultListEntry
                    listingId={id}
                    user={userId}
                    title={listingTitle}
                    city={listingCity}
                    state={listingState}
                    avail={earliestAvail}
                    photo={url}
                    matchPercentage={matchPercentage}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </>
    );
  }

  return (
    <>
    </>
  );
};

export default SearchDefaultList;
