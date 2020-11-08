import React, { FC, useState } from 'react';
import { Grid, makeStyles, Container } from '@material-ui/core';
import ThreadList from './ThreadList';
import MessageList from './MessageList';

const useStyles = makeStyles({
  main: {
    borderStyle: 'solid',
    align: 'center',
    justify: 'center',
    height: '100%',
  },
  outer: {
    marginTop: '10px',
    marginBottom: '10px',
    align: 'center',
    justify: 'center',
    height: '85vh',
  },
  rightBorder: {
    borderStyle: 'none solid none none',
  },
});

const Messages: FC = (): JSX.Element => {
  const classes = useStyles();
  const [threads] = useState([
    { thread: 1, message: 'thread one' },
    { thread: 2, message: 'thread two' },
    { thread: 3, message: 'thread three' },
    { thread: 4, message: 'thread four' },
  ]);
  const [activeThread, setActiveThread] = useState(threads[0]);

  return (
    <Container className={classes.outer}>
      <Grid container className={classes.main} justify="center">
        <Grid
          item
          xs={3}
          className={classes.rightBorder}
        >
          <ThreadList threads={threads} setActiveThread={setActiveThread} />
        </Grid>
        <Grid item xs={9}>
          <MessageList thread={activeThread} />
        </Grid>
      </Grid>
    </Container>

  );
};

export default Messages;
