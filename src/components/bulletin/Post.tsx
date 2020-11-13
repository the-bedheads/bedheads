import React, { useState, useEffect } from 'react';
import {
  createStyles, Theme, makeStyles, MuiThemeProvider, createMuiTheme,
} from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface BulletinProps {
  title: string,
  body: string,
  author: string,
  authorId: number,
  location: string,
  idx: number,
}

const bulletinTheme = createMuiTheme({
  typography: {
    h6: {
      fontWeight: 'bold',
      lineHeight: 1.65,
    },
    subtitle1: {
      lineHeight: 1.25,
    },
    overline: {
      color: 'black',
      lineHeight: 0.25,
    },
  },
});

const useStyles = makeStyles((theme: Theme) => createStyles({
  even: {
    backgroundColor: 'pink',
    height: '270px',
    border: 'black 1px',
    paddingLeft: '15px',
    paddingRight: '15px',
    paddingTop: '9px',
  },
  odd: {
    backgroundColor: 'white',
    height: '225px',
    border: 'black 1px',
    paddingLeft: '15px',
    paddingRight: '15px',
    paddingTop: '7px',
  },
  title: {
    fontWeight: 'bold',
    lineHeight: '1.25px',
  },
  body: {
    lineHeight: '1.25px',
  },
  user: {

  },
}));

const Post: React.FC<BulletinProps> = ({
  idx, title, body, author, authorId, location,
}): JSX.Element => {
  const classes = useStyles();
  const [userId] = useState(localStorage.userId);
  const [hostData, setHostData] = useState({
    firstName: '',
    lastName: '',
    pronouns: '',
    hostRating: '',
    id: 0,
    profilePhoto: '',
    userBio: '',
  });

  const getAuthorInfo = () => {
    axios.get(`/user/${authorId}`)
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

  useEffect(() => {
    getAuthorInfo();
  }, []);

  return (
    <MuiThemeProvider theme={bulletinTheme}>
      <Paper className={idx % 2 === 0 ? classes.even : classes.odd}>
        <Grid item xs={12}><Typography variant="h6">{title}</Typography></Grid>
        <Grid item xs={12}><Typography variant="subtitle1">{body}</Typography></Grid>
        <Grid
          item
          xs={12}
        >
          <Typography
            variant="overline"
            component={Link}
            to={
            {
              pathname: '/hostProfile',
              state: { hostData, userId },
            }
          }
          >
            {author}
          </Typography>
          <Typography variant="overline">{location}</Typography>
        </Grid>

      </Paper>
    </MuiThemeProvider>
  );
};

export default Post;
