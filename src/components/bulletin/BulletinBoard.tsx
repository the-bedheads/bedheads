import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Post from './Post';
import CreatePost from './CreatePost';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    padding: '10px',
  },
  container: {
    backgroundColor: 'red',
    margin: 'auto',
    display: 'flex',
    justify: 'space-around',
  },
  sidebar: {
    backgroundColor: 'green',
    display: 'flex',
  },
  bulletins: {
    backgroundColor: 'yellow',
    align: 'center',
    alignItems: 'center',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
}));

const BulletinBoard: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const [posts, setPosts] = useState([{
    body: '',
    title: '',
    user: { first_name: '', listing: { listingCity: '' } },
    userId: 0,
    userCity: '',
  }]);

  const getBulletins = () => {
    axios.get('/bulletin')
      .then((bulletins) => {
        setPosts(bulletins.data);
      });
  };

  useEffect(() => {
    getBulletins();
  }, []);

  return (
    <div className={classes.root}>
      <h4>community bulletins</h4>
      <Grid container className={classes.container} xs={11} spacing={3}>
        <Grid container item className={classes.sidebar} xs={3}>
          <CreatePost />
        </Grid>
        <Grid container item className={classes.bulletins} xs={8}>
          {posts.map((post, idx) => {
            const user = post.user.first_name;
            const userCity = post.user.listing.listingCity;
            const { title, body, userId } = post;
            return (
              <Grid item container className={classes.paper} xs={3}>
                <Post
                  title={title}
                  body={body}
                  author={user}
                  authorId={userId}
                  location={userCity}
                  idx={idx}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};

export default BulletinBoard;
