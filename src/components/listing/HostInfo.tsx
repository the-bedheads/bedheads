import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import {
  makeStyles,
  withStyles,
} from '@material-ui/core/styles';
import {
  Button,
  Box,
  Typography,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  CardActionArea,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom';
import { HostInfoInterface } from 'goldilocksTypes';
import MessageModal from '../messages/MessageModal';

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
  media: {
    height: 140,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: '20px',
  },
  button: {
    padding: 1,
  },
});

const HostInfo: FC<HostInfoInterface> = (props): JSX.Element => {
  const classes = useStyles();
  const {
    hostId,
    userId,
    avbId,
    dates,
  } = props;
  const [hostData, setHostData] = useState({
    firstName: '',
    lastName: '',
    pronouns: '',
    hostRating: 0,
    id: 0,
    profilePhoto: '',
    userBio: '',
  });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const getHost = () => {
    axios.get(`/user/${hostId}`)
      .then(({ data }) => {
        const {
          firstName,
          lastName,
          pronouns,
          hostRating,
          id,
          profilePhoto,
          userBio,
        } = data;
        setHostData({
          firstName,
          lastName,
          pronouns,
          hostRating,
          id,
          profilePhoto,
          userBio,
        });
      })
      .catch((err) => err);
  };

  const requestSwap = () => {
    const params = { userId, avbId, dates };
    axios.post('/request/newRequest', { params })
      .catch((err) => console.warn(err));
  };

  useEffect(() => {
    getHost();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = async (
    i: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    check: boolean,
  ) => {
    if (check) {
      const params = {
        userId,
        hostId: hostData.id,
        newMessage: message,
        activeThread: 0,
      };
      const threadId = await axios.get('/message/thread', { params })
        .then(({ data }) => data.id);
      params.activeThread = threadId;
      await axios.post('/message/newMessage', { params });
      setMessage('');
    }
    setOpen(false);
  };

  const handleClickOff = () => {
    setOpen(false);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="host-info">
      <Card
        className={classes.root}
        elevation={0}
      >
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={hostData.profilePhoto}
            title="Profile Photo"
            component={Link}
            to={
              {
                pathname: '/view-hostProfile',
                state: { hostData, userId },
              }
            }
          />
          <CardContent>
            <Typography>
              {hostData.firstName}
            </Typography>
            <Box
              component="fieldset"
              borderColor="transparent"
              m={1}
            >
              <StyledRating
                icon={(
                  <FavoriteIcon
                    fontSize="small"
                  />
                )}
                name="read-only"
                value={hostData.hostRating}
                readOnly
              />
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            className={classes.button}
            fullWidth
            size="small"
            variant="outlined"
            color="secondary"
            onClick={handleOpen}
          >
            contact
          </Button>
          <MessageModal
            handleClose={handleClose}
            handleClickOff={handleClickOff}
            handleTextChange={handleTextChange}
            message={message}
            open={open}
            name={hostData.firstName}
          />
          <Button
            className={classes.button}
            fullWidth
            size="small"
            variant="outlined"
            color="secondary"
            onClick={requestSwap}
          >
            request
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default HostInfo;
