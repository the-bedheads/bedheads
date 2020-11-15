import React, {
  FC,
  useState,
  useEffect,
  useRef,
} from 'react';
import axios from 'axios';
import {
  Grid,
  makeStyles,
  FormControl,
  InputAdornment,
  Input,
  IconButton,
  Container,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client/build/socket';
import { MessageProps } from 'goldilocksTypes';
import ThreadList from './ThreadList';
import MessageList from './MessageList';

const useStyles = makeStyles({
  main: {
    borderStyle: 'solid',
    align: 'center',
    justify: 'center',
    height: '100%',
  },
  outer: {
    marginTop: '10px',
    marginBottom: '10px',
    align: 'center',
    justify: 'center',
    height: '85vh',
  },
  rightBorder: {
    borderStyle: 'none solid none none',
  },
  scrollStyle: {
    overflow: 'auto',
    maxHeight: '85%',
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  messageListStyle: {
    maxHeight: '100%',
    position: 'relative',
  },
  newMessageStyle: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    maxHeight: '10%',
    minHeight: '10%',
    borderStyle: 'solid none none none',
  },
  currentThreadStyle: {
    width: '100%',
    maxHeight: '5%',
    minHeight: '5%',
    borderStyle: 'none none solid none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Messages: FC<MessageProps> = (props): JSX.Element => {
  const { user } = props;
  const classes = useStyles();
  const [threads, setThreads] = useState([]);
  const [activeThread, setActiveThread] = useState(0);
  const [newMessage, setNewMessage] = useState('');
  const [name, setName] = useState('');
  const [threadSocket, setThreadSocket] = useState<Socket | null>(null);
  const messageListRef = useRef<HTMLInputElement>(null);

  const threadSetter = (thread: number) => {
    setThreadSocket(io('localhost:3000'));
    setActiveThread(thread);
  };

  const onLoad = async () => {
    const params = { thread: activeThread, userId: user.id };
    await axios.get(`/message/getThreads/${user.id}`)
      .then(({ data }) => {
        setThreads(data);
        threadSetter(data[0]);
        const num = data[0];
        params.thread = num;
      })
      .catch((err) => console.warn(err.message));
    await axios.get('message/getName/', { params })
      .then(({ data }) => setName(data))
      .catch((err) => console.warn(err.message));
  };

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollIntoView();
    }
  };

  useEffect(() => {
    onLoad();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = async () => {
    const params = {
      activeThread,
      newMessage,
      userId: user.id,
    };
    await axios.post('/message/newMessage', { params });
    const socket = io('localhost:3000');
    socket.on('connect', () => {
      socket.emit('room', activeThread);
    });
    socket.emit('message', { room: activeThread, msg: newMessage });
    socket.on('message', () => {
      socket.disconnect();
    });
    setNewMessage('');
  };

  return (
    <Container className={classes.outer}>
      <Grid container className={classes.main} justify="center">
        <Grid
          item
          xs={3}
          className={classes.rightBorder}
        >
          <ThreadList
            threads={threads}
            setActiveThread={setActiveThread}
            setName={setName}
            userId={user.id}
            threadSocket={threadSocket}
            activeThread={activeThread}
          />
        </Grid>
        <Grid item xs={9} className={classes.messageListStyle}>
          <Grid className={classes.currentThreadStyle}>
            {`Your message history with ${name}`}
          </Grid>
          <Grid className={classes.scrollStyle}>
            <Grid>
              <MessageList
                thread={activeThread}
                userId={user.id}
                stb={scrollToBottom}
                socket={threadSocket}
              />
              <div ref={messageListRef} />
            </Grid>
          </Grid>
          <Grid className={classes.newMessageStyle}>
            <FormControl fullWidth>
              <Input
                id="message-box"
                placeholder="Send a message"
                type="text"
                value={newMessage}
                onChange={(e) => handleChange(e)}
                disableUnderline
                multiline
                margin="dense"
                endAdornment={(
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="send-message"
                      onClick={sendMessage}
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Messages;
