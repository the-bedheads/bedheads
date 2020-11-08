import React, { FC } from 'react';
import MessageListEntry from './MessageListEntry';

type ThreadType = {
  thread: number,
  message: string,
};

interface ThreadTypeInt {
  thread: ThreadType,
}

const MessageList: FC<ThreadTypeInt> = ({ thread }): JSX.Element => (
  <>
    <MessageListEntry thread={thread} />
  </>
);

export default MessageList;
