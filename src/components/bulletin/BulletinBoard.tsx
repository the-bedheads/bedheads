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
  const [loggedInUser] = useState(localStorage.userId);
  const [posts, setPosts] = useState([{
    body: '',
    title: '',
    author: { id: 1, first_name: '', listing: { listingCity: '' } },
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
          <CreatePost user={loggedInUser} />
        </Grid>
        <Grid container item className={classes.bulletins} xs={9}>
          {posts.map((post, idx) => {
            if (post.author.listing) {
              const author = post.author.first_name;
              const authorCity = post.author.listing.listingCity;
              const { title, body } = post;
              const authorId = post.author.id;
              return (
                <Grid item container className={classes.paper} xs={3}>
                  <Post
                    title={title}
                    body={body}
                    author={author}
                    authorId={authorId}
                    location={authorCity}
                    idx={idx}
                  />
                </Grid>
              );
            } return null;
          })}
        </Grid>
      </Grid>
    </div>
  );
};

export default BulletinBoard;
