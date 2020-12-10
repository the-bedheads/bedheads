import React, { FC, useState, useEffect } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import {
  makeStyles,
  withStyles,
  Theme,
} from '@material-ui/core/styles';
import {
  Button,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  createStyles,
  Snackbar,
  Typography,
} from '@material-ui/core';
import {
  ContactMail,
} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
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

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    maxWidth: 500,
  },
  buttonRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: '40ch',
    },
    alignItems: 'center',
  },
  margin: {
    margin: theme.spacing(2),
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
  snackBarProps: {
    backgroundColor: 'amber',
  },
  buttonIcons: {
    margin: theme.spacing(1),
  },
}));

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
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [toast, setToast] = useState<string>('');

  const handleCloseToast = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenToast(false);
  };

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
    setToast('request');
    setOpenToast(true);
    axios.post('/request/newRequest', { params })
      .catch((err) => {
        console.warn(err);
      });
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
      setToast('message');
      setOpenToast(true);
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
          <MessageModal
            handleClose={handleClose}
            handleClickOff={handleClickOff}
            handleTextChange={handleTextChange}
            message={message}
            open={open}
            name={hostData.firstName}
          />
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={handleOpen}
            className={classes.buttonIcons}
            startIcon={<ContactMail />}
          >
            Contact
          </Button>
        </CardActions>
        <CardActions>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            className={classes.buttonIcons}
            startIcon={<SyncAltIcon />}
            onClick={requestSwap}
          >
            Request
          </Button>
          {toast === 'request'
            ? (
              <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                open={openToast}
                autoHideDuration={6000}
                onClose={handleCloseToast}
                action={(
                  <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseToast}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              >
                <MuiAlert severity="success">Request sent</MuiAlert>
              </Snackbar>
            )
            : (
              <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                open={openToast}
                autoHideDuration={6000}
                onClose={handleCloseToast}
                action={(
                  <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseToast}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              >
                <MuiAlert severity="success">Message sent</MuiAlert>
              </Snackbar>
            )}
        </CardActions>
      </Card>
    </div>
  );
};

export default HostInfo;
