import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

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

interface DefaultListProps {
  listingId: number;
  user: number;
  title: string;
  location: [string, string];
  avail: [];
}

const DefaultListEntry: React.FC<DefaultListProps> = ({
  listingId, user, title, location, avail,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {title}
      {location}
      {avail}
    </div>
  );
};

export default DefaultListEntry;
