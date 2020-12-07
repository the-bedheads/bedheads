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
  senderBubble: {
    border: '1px solid #7ad9ec',
    borderRadius: '10px',
    margin: '5px',
    padding: '10px',
    display: 'inline-block',
    // backgroundColor: '#7ad9ec',
  },
  receivedBubble: {
    border: '1px solid #fac94f',
    borderRadius: '10px',
    margin: '5px',
    padding: '10px',
    display: 'inline-block',
    // backgroundColor: '#fac94f',
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
  }, [messageBody]);

  return (
    <Box className={message.sender ? classes.sent : classes.received}>
      <Box className={message.sender ? classes.senderBubble : classes.receivedBubble}>
        {message.body}
      </Box>
    </Box>
  );
};

export default MessageListEntry;
