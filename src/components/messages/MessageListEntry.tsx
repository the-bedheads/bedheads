import React, { FC, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

let socket;

type ThreadType = {
  thread: number,
  message: string,
};

interface ThreadTypeInt {
  thread: ThreadType,
}

const MessageListEntry: FC<ThreadTypeInt> = ({ thread }): JSX.Element => {
  useEffect(() => {
    const data = 'words';
    socket = io('localhost:3000');
    socket.emit('message', { name: 'mike', room: 'mikes room' });
  }, []);

  return (
    <>
      {thread.thread}
    </>
  );
};

export default MessageListEntry;
