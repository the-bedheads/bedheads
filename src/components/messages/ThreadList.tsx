import React, { FC } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import ThreadListEntry from './ThreadListEntry';

const useStyles = makeStyles({
  main: {
    borderStyle: 'none none solid none',
    padding: '0px',
  },
});

interface ThreadProps {
  threads: Array<number>,
  userId: number,
  setActiveThread: React.Dispatch<React.SetStateAction<number>>,
}

const ThreadList: FC<ThreadProps> = ({ threads, userId, setActiveThread }): JSX.Element => {
  const classes = useStyles();

  const renderThreads = () => threads.map((thread) => (
    <Grid className={classes.main}>
      <ThreadListEntry thread={thread} setActiveThread={setActiveThread} userId={userId} />
    </Grid>
  ));

  return (
    <>
      {renderThreads()}
    </>
  );
};

export default ThreadList;
