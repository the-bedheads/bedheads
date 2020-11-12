import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

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
}));

interface DefaultListProps {
  listingId: number;
  user: number;
  title: string;
  city: string;
  state: string;
  avail: Date;
  photo: string;
}

const DefaultListEntry: React.FC<DefaultListProps> = ({
  listingId, user, title, city, state, avail, photo,
}) => {
  const classes = useStyles();
  const location = `${city}, ${state}`;
  const availMessage = `available ${avail}`;

  return (
    <div className={classes.root}>
      <ButtonBase className={classes.image} component={Link} to={`/listing/${user}`}>
        <img className={classes.img} alt="complex" src={photo} />
      </ButtonBase>
      <Grid item xs component={Link} to={`/listing/${user}`}>
        <Typography variant="h6">
          {title}
        </Typography>
        <Typography variant="subtitle1">
          {location}
        </Typography>
      </Grid>
      <Typography variant="overline" display="block">
        {availMessage}
      </Typography>
    </div>
  );
};

export default DefaultListEntry;
