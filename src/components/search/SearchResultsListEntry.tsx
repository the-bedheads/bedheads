import React, { useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import { Link } from 'react-router-dom';

// const useStyles = makeStyles((theme: Theme) => {
//   createStyles({
//     root: {
//       width: '100%',
//       maxWidth: '50ch',
//     },
//     inline: {
//       display: 'inline',
//     },
//   });
// });

const ResultsListEntry = (props: any) => {
  const {
    user, title, location, avail, defaultView, availForDefault, updated,
  } = props;
  const { listingCity, listingState } = location;
  // this is for the listings that match the query
  const { startAvail, endAvail } = avail;
  // this is for the listings that are randomly shown in the default view
  // const { startDate, endDate } = availForDefault;

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
    <ListItem
      component={Link}
      to={`/listing/${user}`}
    >
      <ListItemText
        primary={title}
        secondary={`${listingCity}, ${listingState}`}
      />
      {availMessage}
    </ListItem>
  );
};

export default ResultsListEntry;
