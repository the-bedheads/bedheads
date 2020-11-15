import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client/build/socket';
import MessageListEntry from './MessageListEntry';

interface ThreadTypeInt {
  thread: number,
  userId: number,
  stb: () => void,
  socket: Socket | null,
}

const MessageList: FC<ThreadTypeInt> = ({
  thread,
  userId,
  stb,
  socket,
}): JSX.Element => {
  const [messages, setMessages] = useState([{ body: '', sender: true }]);

  const getMessages = async () => {
    const params = { thread, userId };
    const newMessages = await axios.get('message/getMessages', { params })
      .then(({ data }) => data);
    setMessages(newMessages);
    stb();
  };

  useEffect(() => {
    getMessages();
  }, [thread]);

  useEffect(() => {
    if (socket) {
      socket.emit('room', thread);
      socket.on('message', (data: string) => {
        console.info(data);
        getMessages();
      });
    }
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
