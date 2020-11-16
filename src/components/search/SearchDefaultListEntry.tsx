import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import moment from 'moment';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  image: {
    width: '240px',
    height: '128px',
    margin: 'auto',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  img: {
    margin: 'auto',
    display: 'block',
    position: 'absolute',
    'object-fit': 'cover',
    width: '100%',
    height: '100%',
  },
  listing: {
    color: 'black',
  },
  title: {
    lineHeight: '1.35',
    paddingTop: '10px',
    paddingBottom: '5px',
  },
}));

interface DefaultListProps {
  listingId: number;
  user: number;
  title: string;
  city: string;
  state: string;
  listingAvail: { startAvail: string, endAvail: string },
  avbId: number;
  photo: string;
  matchPercentage: number;
}

const DefaultListEntry: React.FC<DefaultListProps> = ({
  user, title, city, state, listingAvail, avbId, photo, matchPercentage,
}) => {
  const classes = useStyles();
  const { startAvail, endAvail } = listingAvail;
  const location = `${city}, ${state}`;
  const availMessage = `available ${moment(startAvail, 'YYYY-MM-DD').format('MMM Do YYYY')}`;
  const matchMsg = `${matchPercentage}% match`;

  return (
    <div className={classes.root}>
      <Grid container className={classes.listing} item xs={12}>
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
          <img className={classes.img} alt="complex" src={photo} />
        </ButtonBase>

      </Grid>
      <Grid
        container
        item
        direction="column"
        xs={12}
        component={Link}
        className={classes.listing}
        to={
              {
                pathname: `/view-listing/${user}/${avbId}`,
                state: { startAvail, endAvail },
              }
            }
      >
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h6">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography variant="subtitle1" style={{ paddingBottom: '10px' }}>
            {location}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <Typography variant="overline">
          {availMessage}
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography variant="overline">
          {matchMsg}
        </Typography>
      </Grid>
    </div>
  );
};

export default DefaultListEntry;
