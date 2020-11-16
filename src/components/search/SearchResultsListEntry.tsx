import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
// import { TypeFormatFlags } from 'typescript';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    color: 'black',
  },
  image: {
    width: '100px',
    height: '100px',
    margin: 'auto',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  img: {
    margin: 'auto',
    display: 'block',
    width: '100%',
    height: '100%',
    position: 'absolute',
    'object-fit': 'cover',
  },
  info: {
    display: 'flex',
    flexWrap: 'wrap',
    justify: 'center',
    color: 'black',
  },
}));

interface SearchListProps {
  user: number,
  avbId: number,
  listingId: number,
  title: string,
  location: { listingCity: string, listingState: string },
  listingAvail: { startAvail: string, endAvail: string },
  queriedDates: { start: string, end: string },
  photo: string,
  matchPercentage: number,
}

const ResultsListEntry: React.FC<SearchListProps> = ({
  user, title, location, listingAvail, queriedDates, photo, avbId, listingId, matchPercentage,
}) => {
  const classes = useStyles();
  const { listingCity, listingState } = location;
  const { startAvail, endAvail } = listingAvail;
  const { start, end } = queriedDates;
  const [availMessage, setAvailMessage] = useState<string>('');
  const locationStr = `${listingCity}, ${listingState}`;
  const matchStr = `${matchPercentage}% match`;

  const getAvailMessage = () => {
    if (start !== startAvail || end !== endAvail) {
      setAvailMessage(`flexible? this is available from ${moment(startAvail, 'YYYY-MM-DD').format('MMM Do')} to ${moment(endAvail, 'YYYY-MM-DD').format('MMM Do')}`);
    } else {
      setAvailMessage('available for these dates!');
    }
  };

  useEffect(() => {
    getAvailMessage();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container item xs={12}>
        <Grid item xs={4}>
          <ButtonBase
            className={classes.image}
            component={Link}
            to={
                {
                  pathname: `/view-listing/${user}/${avbId}`,
                  state: { startAvail, endAvail },
                }
              }
          >
            <img className={classes.img} alt="listing" src={photo} />
          </ButtonBase>
        </Grid>
        <Grid
          item
          container
          className={classes.info}
          xs={7}
          direction="column"
          component={Link}
          to={
            {
              pathname: `/view-listing/${user}/${avbId}`,
              state: { startAvail, endAvail },
            }
          }
        >
          <Grid item xs={12}>
            <Typography variant="h6">
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" style={{ paddingBottom: '10px' }}>
              {locationStr}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="overline">
              {availMessage}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="overline">
              {matchStr}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ResultsListEntry;
