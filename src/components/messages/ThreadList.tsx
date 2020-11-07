import React, { FC, useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import ThreadListEntry from './ThreadListEntry';

const useStyles = makeStyles({
  main: {
    borderStyle: 'none none solid none',
    padding: '0px',
  },
});

type ThreadType = {
  thread: number,
  message: string,
};
interface ThreadProps {
  threads: Array<ThreadType>,
  setActiveThread: React.Dispatch<React.SetStateAction<{
    thread: number,
    message: string,
  }>>,
}

const ThreadList: FC<ThreadProps> = ({ threads, setActiveThread }): JSX.Element => {
  const classes = useStyles();

  const renderThreads = () => threads.map((thread) => (
    <Grid className={classes.main}>
      <ThreadListEntry thread={thread} setActiveThread={setActiveThread} />
    </Grid>
  ));

  return (
    <>
      {renderThreads()}
    </>
  );
};

export default ThreadList;
