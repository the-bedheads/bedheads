import React, { FC, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Box, makeStyles } from '@material-ui/core';

// let socket;

const useStyles = makeStyles({
  sent: {
    textAlign: 'right',
    paddingLeft: '35%',
    paddingRight: '2%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  received: {
    textAlign: 'left',
    paddingRight: '35%',
    paddingLeft: '2%',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  bubble: {
    border: '0.5px solid black',
    borderRadius: '10px',
    margin: '5px',
    padding: '10px',
    display: 'inline-block',
  },
});

type MessageType = {
  body: string,
  sender: boolean,
};

interface ThreadTypeInt {
  message: MessageType,
}

const MessageListEntry: FC<ThreadTypeInt> = ({ message }): JSX.Element => {
  const classes = useStyles();
  const [messageBody] = useState(message);

  useEffect(() => {
    const data = 'words';
    // socket = io('localhost:3000');
    // socket.emit('message', { name: 'mike', room: 'mikes room' });
  }, [messageBody]);

  return (
    <Box className={message.sender ? classes.sent : classes.received}>
      <Box className={classes.bubble}>
        {message.body}
      </Box>
    </Box>
  );
};

export default MessageListEntry;
