import React, { useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { Link } from 'react-router-dom';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme: Theme) => {
  createStyles({
    root: {
      width: '100%',
      maxWidth: '50ch',
    },
    inline: {
      display: 'inline',
    },
    defaultView: {
      alignItems: 'center',
    },
  });
});

const ResultsListEntry = (props: any) => {
  const classes = useStyles();
  const {
    user, title, location, avail, defaultView, availForDefault, updated,
  } = props;
  const { listingCity, listingState } = location;
  // this is for the listings that match the query
  const { startAvail, endAvail } = avail;
  // this is for the listings that are randomly shown in the default view

  let availMessage;
  if (!updated) {
    // TODO: fix this bug - avail not passing properly for listings randomly loaded on default
    availMessage = (
      <p>
        {/* available as soon as */}
        {/* {startDate} */}
      </p>
    );
  } else if (updated) {
    availMessage = (
      <p>
        available from
        {startAvail}
        {' '}
        to
        {endAvail}
      </p>
    );
  }

  return (
    <>
      <GridListTile
        cols={2}
        component={Link}
        to={`/listing/${user}`}
      >
        <ListItemText
          primary={title}
          secondary={`${listingCity}, ${listingState}`}
        />
      </GridListTile>
      {availMessage}
    </>
  );
};

export default ResultsListEntry;
