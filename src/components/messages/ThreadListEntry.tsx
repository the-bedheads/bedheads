import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
// import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client/build/socket';
import { Grid, makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles({
  main: {
    borderStyle: 'none none solid none',
    borderWidth: 'thin',
  },
});

interface ThreadTypeInt {
  thread: number,
  userId: number,
  setActiveThread: React.Dispatch<React.SetStateAction<number>>,
  setThreadName: React.Dispatch<React.SetStateAction<string>>,
  threadSocket: Socket | null,
  activeThread: number,
}

const ThreadListEntry: FC<ThreadTypeInt> = ({
  thread,
  userId,
  setActiveThread,
  setThreadName,
  threadSocket,
  activeThread,
}): JSX.Element => {
  const classes = useStyles();
  const [name, setName] = useState('');
  // let socket;

  useEffect(() => {
    const params = { thread, userId };
    axios.get('message/getName/', { params })
      .then(({ data }) => setName(data))
      .catch((err) => console.warn(err.message));
    // socket = io('localhost:3000');
    // socket.emit('create', `${thread}`);
  }, []);

  const threadSetter = (selectedThread: number) => {
    threadSocket?.emit('leave', activeThread);
    setThreadName(name);
    setActiveThread(selectedThread);
  };

  return (
    <Button
      onClick={() => threadSetter(thread)}
    >
      <Grid>
        {name}
      </Grid>
    </Button>

  );
};

export default ThreadListEntry;
