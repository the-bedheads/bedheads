import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import { TypeFormatFlags } from 'typescript';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
    alignItems: 'center',
  },
  inline: {
    display: 'inline',
  },
  defaultView: {
    alignItems: 'center',
  },
  image: {
    width: '100px',
    height: '100px',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    'object-fit': 'cover',
  },
  info: {
    display: 'flex',
    justify: 'center',
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
      setAvailMessage(`flexible? this is available from ${startAvail} to ${endAvail}`);
    } else {
      setAvailMessage('available for these dates!');
    }
  };

  useEffect(() => {
    getAvailMessage();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase
            className={classes.image}
            component={Link}
            to={
              {
                pathname: `/view-listing/${listingId}/${avbId}`,
                state: { startAvail, endAvail },
              }
            }
          >
            <img className={classes.img} alt="listing" src={photo} />
          </ButtonBase>
        </Grid>
      </Grid>
      <Grid
        item
        container
        className={classes.info}
        xs={12}
        direction="column"
        component={Link}
        to={
          {
            pathname: `/view-listing/${listingId}/${avbId}`,
            state: { startAvail, endAvail },
          }
        }
      >
        <Grid item xs>
          <Typography variant="body1">
            {title}
          </Typography>
          <Typography variant="body2">
            {locationStr}
          </Typography>
        </Grid>
        <Typography variant="overline" display="block">
          {availMessage}
        </Typography>
        <Typography variant="overline" display="block">
          {matchStr}
        </Typography>
      </Grid>
    </div>
  );
};

export default ResultsListEntry;
