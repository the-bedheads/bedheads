import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Post from './Post';
import FormDialog from './CreatePost';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    padding: '10px',
  },
}));

const BulletinBoard: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const [posts, setPosts] = useState([{
    body: '',
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
      <FormDialog />
      <Grid container spacing={3}>
        {posts.map((listing) => (
          <Grid item xs={2}>
            <Post body={listing.body} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BulletinBoard;
