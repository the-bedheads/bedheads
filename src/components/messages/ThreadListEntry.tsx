import React, { FC } from 'react';
import { Grid, makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles({
  main: {
    borderStyle: 'none none solid none',
  },
});

type ThreadType = {
  thread: number,
  message: string,
};

interface ThreadTypeInt {
  thread: ThreadType,
  setActiveThread: React.Dispatch<React.SetStateAction<{
    thread: number,
    message: string,
  }>>,
}

const ThreadListEntry: FC<ThreadTypeInt> = ({ thread, setActiveThread }): JSX.Element => {
  const classes = useStyles();

  return (
    <Button
      onClick={() => setActiveThread(thread)}
    >
      <Grid>
        {thread.message}
      </Grid>
    </Button>

  );
};

export default ThreadListEntry;
