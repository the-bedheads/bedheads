import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Post from './Post';
import CreatePost from './CreatePost';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    padding: '10px',
  },
  container: {
    backgroundColor: 'white',
    margin: 'auto',
    display: 'flex',
    justify: 'space-around',
  },
  sidebar: {
    backgroundColor: 'white',
  },
  bulletins: {
    backgroundColor: 'white',
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
    author: { id: 1, firstName: '', listing: { listingCity: '' } },
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
      <Grid container item xs={11}>
        <Typography variant="h6">
          community bulletins
        </Typography>
      </Grid>
      <Grid container className={classes.container} xs={11} spacing={3}>
        <Grid container item className={classes.sidebar} xs={3}>
          <CreatePost user={loggedInUser} />
        </Grid>
        <Grid container item className={classes.bulletins} xs={9}>
          {posts.map((post, idx) => {
            if (post.author.listing) {
              const author = post.author.firstName;
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
