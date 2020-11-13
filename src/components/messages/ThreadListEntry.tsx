import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles({
  main: {
    borderStyle: 'none none solid none',
  },
});

interface ThreadTypeInt {
  thread: number,
  userId: number,
  setActiveThread: React.Dispatch<React.SetStateAction<number>>,
  setThreadName: React.Dispatch<React.SetStateAction<string>>,
}

const ThreadListEntry: FC<ThreadTypeInt> = ({
  thread,
  userId,
  setActiveThread,
  setThreadName,
}): JSX.Element => {
  const classes = useStyles();
  const [name, setName] = useState('');

  useEffect(() => {
    const params = { thread, userId };
    axios.get('message/getName/', { params })
      .then(({ data }) => setName(data))
      .catch((err) => console.warn(err.message));
  }, []);

  const threadSetter = (selectedThread: number) => {
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
