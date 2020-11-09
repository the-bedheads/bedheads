import React, { useState } from 'react';
import {
  Grid, Paper, TextField, Typography, Button,
} from '@material-ui/core';
import { Theme, makeStyles, withStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Rating } from '@material-ui/lab';
import { UserProps } from 'goldilocksTypes';

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);

const labels: { [index: string]: string } = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
}));

const WriteAReview: React.FC<UserProps> = ({ user }): JSX.Element => {
  const classes = useStyles();
  const [ratingValue, setValue] = useState<number | null>(2);
  const [hover, setHover] = React.useState(-1);

  return (
    <Grid container className={classes.main} spacing={2} direction="row" justify="center">
      <Paper>
        <Paper>
          {/* {`${user.firstName}`} */}
          Listing Address
          Date of Stay
        </Paper>
        <Paper>
          Photos of the place?
        </Paper>
        <Typography component="legend">How would you rate your host?</Typography>
        <StyledRating
          name="customized-color"
          defaultValue={2}
          getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
          precision={0.5}
          icon={<FavoriteIcon fontSize="large" />}
        />
        <br />
        <Typography component="legend">How was your stay?</Typography>
        <TextField
          name="host-review"
          autoFocus
          multiline
          rows={4}
          variant="outlined"
          fullWidth
        />
        <br />
        <Button
          variant="outlined"
          color="secondary"
        >
          Submit Review
        </Button>
      </Paper>
    </Grid>
  );
};

export default WriteAReview;
