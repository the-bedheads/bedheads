import React, { FC } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { Socket } from 'socket.io-client/build/socket';
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
  setName: React.Dispatch<React.SetStateAction<string>>,
  threadSocket: Socket | null,
  activeThread: number,
}

const ThreadList: FC<ThreadProps> = ({
  threads,
  userId,
  setActiveThread,
  setName,
  threadSocket,
  activeThread,
}): JSX.Element => {
  const classes = useStyles();

  const renderThreads = () => threads.map((thread) => (
    <Grid className={classes.main}>
      <ThreadListEntry
        thread={thread}
        setActiveThread={setActiveThread}
        setThreadName={setName}
        userId={userId}
        threadSocket={threadSocket}
        activeThread={activeThread}
      />
    </Grid>
  ));

  return (
    <>
      {renderThreads()}
    </>
  );
};

export default ThreadList;
