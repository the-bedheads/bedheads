import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
  useLocation,
  Link,
} from 'react-router-dom';
import {
  Grid,
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  Snackbar,
  TextField,
} from '@material-ui/core';
import axios from 'axios';
import {
  Theme,
  makeStyles,
  withStyles,
} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Rating } from '@material-ui/lab';
import { CalendarInterface } from 'goldilocksTypes';

interface ReviewInt {
  allReviews: any,
  listingId: number,
  reviewer: any,
  user: any,
}
const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);

const hLabels: { [index: string]: string } = {
  0.5: 'Really Terrible',
  1: 'Terrible',
  1.5: 'Really Bad',
  2: 'Bad',
  2.5: 'Below average',
  3: 'Average',
  3.5: 'Good',
  4: 'Really Good',
  4.5: 'Excellent',
  5: 'Above and beyond',
};
const gLabels: { [index: string]: string } = {
  0.5: 'Really Terrible',
  1: 'Terrible',
  1.5: 'Really Bad',
  2: 'Bad',
  2.5: 'Below average',
  3: 'Average',
  3.5: 'Good',
  4: 'Really Good',
  4.5: 'Excellent',
  5: 'Above and beyond',
};

const useStyles = makeStyles((theme: Theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  main: {
    marginTop: '350px',
    marginBottom: '350px',
  },
  root: {
    width: 400,
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: '30px',
    marginBottom: '30px',
    justify: 'center',
  },
  button: {
    justify: 'center',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: '40ch',
    },
  },
}));

const WW2: React.FC<ReviewInt> = ({ listingId, user }): JSX.Element => {
  const classes = useStyles();
  const [hostRating, setHostRating] = useState<number | null>(3);
  const [guestRating, setGuestRating] = useState<number | null>(3);
  const [hHover, setHostHover] = useState<number>(-1);
  const [gHover, setGuestHover] = useState<number>(-1);
  const [hostReview, setHReview] = useState<string>('No comments');
  const [guestReview, setGReview] = useState<string>('No comments');
  const [isComplete, setIsComplete] = useState<boolean>(true);
  const [hostId, setHostId] = useState<number>();
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [toast, setToast] = useState<string>('');

  const handleCloseToast = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenToast(false);
  };

  const handleHostReview = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: string,
  ) => {
    setHReview(e.target.value);
  };

  const handleGuestReview = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: string,
  ) => {
    setGReview(e.target.value);
  };

  const submitReview = (
    event: any,
  ) => {
    console.info('user', user, 'listingProfileId', listingId);
    const params = {
      guestRating,
      hostRating,
      hostReview,
      guestReview,
      isComplete,
      userId: user,
      hostId,
      listingProfileId: listingId,
    };

    axios.post('/reviews/newReview', { params })
      .then((result) => {
        console.info(result);
        if (result) {
          setToast('swap completed');
          setOpenToast(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="ww2">
      <div className="comments">

        <Grid
          container
          alignContent="center"
          justify="center"
          alignItems="center"
        >

          <Grid
            item
            alignItems="center"
            justify="center"
          >
            <Typography>
              <Box
                m={1}
                display="flex"
                justifyContent="center"
              >
                <Box m={2}>
                  How would you rate your swapmate as a
                  {' '}
                  {' '}
                  <Box
                    display="inline"
                    fontWeight="fontWeightBold"
                  >
                    host
                  </Box>
                  ?
                  <Box
                    display="flex"
                    justifyContent="center"
                  >
                    <StyledRating
                      name="guest-rating"
                      defaultValue={3}
                      value={guestRating}
                      precision={0.5}
                      icon={<FavoriteIcon fontSize="large" />}
                      onChange={(event, newValue) => {
                        setGuestRating(newValue);
                      }}
                      onChangeActive={(event, newHover) => {
                        setGuestHover(newHover);
                      }}
                    />
                  </Box>
                  {guestRating !== null && (
                    <Box
                      ml={2}
                      display="flex"
                      justifyContent="center"
                    >
                      {gLabels[gHover !== -1
                        ? gHover : guestRating]}
                    </Box>
                  )}
                </Box>

              </Box>
            </Typography>
            <FormControl className={clsx(classes.margin, classes.form)} variant="outlined">
              <InputLabel htmlFor="host-comments">
                Comments?
              </InputLabel>
              <OutlinedInput
                name="hostReview"
                type="text"
                fullWidth
                multiline
                rows={3}
                onChange={(e) => handleGuestReview(e, hostReview)}
                labelWidth={92}
              />
            </FormControl>
          </Grid>
          <Grid item alignItems="center" justify="center">
            <Typography>
              <Box
                m={1}
                display="flex"
                justifyContent="center"
              >
                <Box m={2}>
                  How would you rate your swapmate as a
                  {' '}
                  {' '}
                  <Box
                    display="inline"
                    fontWeight="fontWeightBold"
                  >
                    guest
                  </Box>
                  ?
                  <Box
                    display="flex"
                    justifyContent="center"
                  >
                    <StyledRating
                      name="host-rating"
                      defaultValue={3}
                      value={hostRating}
                      precision={0.5}
                      icon={<FavoriteIcon fontSize="large" />}
                      onChange={(event, newValue) => {
                        setHostRating(newValue);
                      }}
                      onChangeActive={(event, hover) => {
                        setHostHover(hover);
                      }}
                    />
                  </Box>
                  {hostRating !== null && (
                    <Box
                      ml={2}
                      display="flex"
                      justifyContent="center"
                    >
                      {hLabels[hHover !== -1
                        ? hHover : hostRating]}
                    </Box>
                  )}
                </Box>
              </Box>
            </Typography>
            <FormControl className={clsx(classes.margin, classes.form)} variant="outlined">
              <InputLabel htmlFor="guest-comments">
                Comments?
              </InputLabel>
              <OutlinedInput
                name="guestReview"
                type="text"
                // fullWidth
                multiline
                rows={3}
                onChange={(e) => handleHostReview(e, guestReview)}
                labelWidth={92}
              />
            </FormControl>
            <Button
              className={classes.button}
              type="button"
              color="secondary"
              fullWidth
              onClick={submitReview}
            >
              Submit Review
            </Button>
            {toast === 'swap completed'
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
                  <MuiAlert severity="success">Review submitted</MuiAlert>
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
                  <MuiAlert severity="error">
                    You must complete a swap with this user before you can write a review
                  </MuiAlert>
                </Snackbar>
              )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default WW2;
