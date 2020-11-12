import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
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
  },
  img: {

    width: '100%',
    height: '100%',
    position: 'absolute',
    'object-fit': 'cover',
  },
}));

interface SearchListProps {
  user: number,
  title: string,
  location: { listingCity: string, listingState: string },
  listingAvail: { startAvail: string, endAvail: string },
  queriedDates: { start: string, end: string },
}

const ResultsListEntry: React.FC<SearchListProps> = ({
  user, title, location, listingAvail, queriedDates,
}) => {
  const classes = useStyles();
  const { listingCity, listingState } = location;
  const { startAvail, endAvail } = listingAvail;
  const { start, end } = queriedDates;
  const [availMessage, setAvailMessage] = useState<string>('');
  const locationStr = `${listingCity}, ${listingState}`;

  const getAvailMessage = () => {
    // listing avail is the avail for each listing
    // queriedDates is what the user entered
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
          <ButtonBase className={classes.image} component={Link} to={`/listing/${user}`}>
            <img className={classes.img} alt="listing" src="https://files.botsin.space/media_attachments/files/105/118/139/304/664/858/small/bb8fc2614d1d6a45.png" />
          </ButtonBase>
        </Grid>
      </Grid>
      <Grid item xs={12} sm container component={Link} to={`/listing/${user}`}>
        <Grid item xs container direction="column" spacing={2}>
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
        </Grid>
      </Grid>
    </div>
  );
};

export default ResultsListEntry;
