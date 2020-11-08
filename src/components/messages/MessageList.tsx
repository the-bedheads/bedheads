import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, makeStyles } from '@material-ui/core';
import MessageListEntry from './MessageListEntry';

const useStyles = makeStyles({
  sent: {
    justifyContent: 'right',
  },
  received: {
    justifyContent: 'left',
  },
});

interface ThreadTypeInt {
  thread: number,
  userId: number,
}

const MessageList: FC<ThreadTypeInt> = ({ thread, userId }): JSX.Element => {
  const [messages, setMessages] = useState([{ body: '', sender: true }]);
  const classes = useStyles();

  useEffect(() => {
    const params = { thread, userId };
    axios.get('message/getMessages', { params })
      .then(({ data }) => setMessages(data));
  }, [thread]);

  const renderMessage = () => messages.map((message) => (
    <MessageListEntry message={message} />
  ));

  return (
    <>
      {renderMessage()}
    </>
  );
};

export default MessageList;
