import React, { useState } from 'react';
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
import { AppInterface } from 'goldilocksTypes';

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

const WriteAReview: React.FC<AppInterface> = ({ user }): JSX.Element => {
  const classes = useStyles();
  const location = useLocation();
  const [hostRating, setHostRating] = useState<number | null>(3);
  const [guestRating, setGuestRating] = useState<number | null>(3);
  const [hHover, setHostHover] = useState<number>(-1);
  const [gHover, setGuestHover] = useState<number>(-1);
  const [hostReview, setHReview] = useState<string>('No comments');
  const [guestReview, setGReview] = useState<string>('No comments');
  const [isComplete, setIsComplete] = useState<boolean>(true);
  const [hostId, setHostId] = useState<number>();
  const [avyId, setAvyId] = useState<number>();
  const [reviewSubmitted, setSubmittedRev] = useState<boolean>(false);
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
    event.preventDefault();
    const params = {
      guestRating,
      hostRating,
      hostReview,
      guestReview,
      isComplete,
      userId: user.id,
      hostId,
      // avyId,
    };

    axios.post('reviews/newReview', { params })
      .then((result) => {
        console.info(result);
        if (result) {
          setToast('swap completed');
          setOpenToast(true);
        }
        event.target.reset();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="write-review-container">
      <Grid
        container
        spacing={10}
        direction="row"
        alignContent="center"
        alignItems="center"
        justify="center"
        item
        xl={9}
      >
        <Grid
          item
          justify="center"
          alignItems="center"
        >
          <Typography
            className={classes.root}
            variant="h3"
            align="center"
            color="primary"
          >
            Tell us about your swap.
          </Typography>
        </Grid>
        <br />
        <br />
        <Grid
          item
          className={classes.root}
          justify="center"
          alignItems="center"
          alignContent="center"
        >
          <div className="comments">
            <Grid
              item
              alignContent="center"
              justify="center"
              alignItems="center"
            >
              <Typography>
                <Box m={3}>
                  How would you rate your swapmate as a guest?
                  <Box m={2}>
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
                    {guestRating !== null && (
                      <Box ml={2}>
                        {gLabels[gHover !== -1
                          ? gHover : guestRating]}
                      </Box>
                    )}
                  </Box>
                </Box>
              </Typography>
            </Grid>
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
            <Grid container>
              <Typography>
                <Box m={3}>
                  How would you rate your swapmate as a host?
                  <Box m={2}>
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
                    {hostRating !== null && (
                      <Box ml={2}>
                        {hLabels[hHover !== -1
                          ? hHover : hostRating]}
                      </Box>
                    )}
                  </Box>
                </Box>
              </Typography>
            </Grid>
            <FormControl className={clsx(classes.margin, classes.form)} variant="outlined">
              <InputLabel htmlFor="guest-comments">
                Comments?
              </InputLabel>
              <OutlinedInput
                name="guestReview"
                type="text"
                fullWidth
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
            <Button
              type="button"
              component={Link}
              to={
                {
                  pathname: '/view-swaps',
                }
              }
              fullWidth
            >
              Return to Swaps
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
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default WriteAReview;
