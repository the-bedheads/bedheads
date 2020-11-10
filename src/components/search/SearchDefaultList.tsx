import React, { useState, useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import DefaultListEntry from './SearchDefaultListEntry';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {

    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
  },
  inline: {
    display: 'inline',
  },
}));

const SearchDefaultList: React.FC = () => {
  const classes = useStyles();
  const [defaultListings, setDefaultListings] = useState([] as any);

  const getDefaultListings = () => {
    axios.get('/listing')
      .then((results) => {
        setDefaultListings(results.data);
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getDefaultListings();
  }, []);

  if (defaultListings.length) {
    return (
      <div className={classes.root}>
        need some inspiration?
        {defaultListings.map((random: {
          id: number;
          user_id: number;
          listingTitle: string;
          listingCity: string;
          listingState: string;
          availabilities: [];
        }) => {
          const {
            id, user_id: userId, listingTitle, listingCity, listingState, availabilities,
          } = random;
          return (
            <DefaultListEntry
              listingId={id}
              user={userId}
              title={listingTitle}
              location={[listingCity, listingState]}
              avail={availabilities}
            />
          );
        })}
      </div>
    );
  }

  return (
    <>
    </>
  );
};

export default SearchDefaultList;
