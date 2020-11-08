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
}

const ThreadListEntry: FC<ThreadTypeInt> = ({ thread, userId, setActiveThread }): JSX.Element => {
  const classes = useStyles();
  const [name, setName] = useState('');

  useEffect(() => {
    const params = { thread, userId };
    axios.get('message/getName/', { params })
      .then(({ data }) => setName(data));
  }, []);

  return (
    <Button
      onClick={() => setActiveThread(thread)}
    >
      <Grid>
        {name}
      </Grid>
    </Button>

  );
};

export default ThreadListEntry;
