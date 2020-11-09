import React, { useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

interface BulletinProps {
  body: string,
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    maxWidth: '36ch',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
}));

const Post: React.FC<BulletinProps> = ({ body }): JSX.Element => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      {body}
    </Paper>
  );
};

export default Post;
