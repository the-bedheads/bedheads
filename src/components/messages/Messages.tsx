import React, { FC, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
import { MessageProps, LocationProps } from 'goldilocksTypes';
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
    maxHeight: '90%',
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
});

const Messages: FC<MessageProps> = (props): JSX.Element => {
  const { user } = props;
  const location: LocationProps = useLocation();
  const classes = useStyles();
  const [threads, setThreads] = useState([]);
  const [activeThread, setActiveThread] = useState(0);
  const [newMessage, setNewMessage] = useState('');

  const onLoad = async () => {
    if (location.state) {
      const params = {
        userId: user.id,
        hostId: location.state.hostData.id,
      };
      await axios.post('/message/thread', { params });
    }
    axios.get(`/message/getThreads/${user.id}`)
      .then(({ data }) => {
        setThreads(data);
        setActiveThread(data[0]);
      });
  };

  useEffect(() => {
    onLoad();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = () => {
    const params = {
      activeThread,
      newMessage,
      userId: user.id,
    };
    axios.post('/message/newMessage', { params });
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
          <ThreadList threads={threads} setActiveThread={setActiveThread} userId={user.id} />
        </Grid>
        <Grid item xs={9} className={classes.messageListStyle}>
          <Grid className={classes.scrollStyle}>
            <Grid>
              <MessageList thread={activeThread} userId={user.id} />
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
