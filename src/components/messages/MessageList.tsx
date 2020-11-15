import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, makeStyles } from '@material-ui/core';
import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client/build/socket';
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
  stb: () => void;
}

const MessageList: FC<ThreadTypeInt> = ({ thread, userId, stb }): JSX.Element => {
  const [messages, setMessages] = useState([{ body: '', sender: true }]);
  const [connected, setConnected] = useState(false);
  const classes = useStyles();

  const getMessages = async () => {
    console.info('gettin dem messies');
    const params = { thread, userId };
    const newMessages = await axios.get('message/getMessages', { params })
      .then(({ data }) => data);
    setMessages(newMessages);
    console.info(messages);
    stb();
  };

  useEffect(() => {
    getMessages();
  }, [thread]);

  useEffect(() => {
    const socket = io('localhost:3000');
    socket.on('connect', () => {
      socket.emit('room', thread);
    });

    socket.on('message', (data: string) => {
      console.info(data);
      getMessages();
    });
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
