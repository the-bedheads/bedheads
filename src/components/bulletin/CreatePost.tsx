import React, { useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { AppInterface } from 'goldilocksTypes';

const useStyles = makeStyles((theme: Theme) => createStyles({
  // post: {
  //   display: 'flex',
  // },
  title: {
    margin: 'auto',
    border: 'black 2px',
  },
  body: {
    margin: 'auto',
    marginBottom: '10px',
  },
  button: {
    margin: 'auto',
    justify: 'flex-end',
  },
}));

const CreatePost: React.FC<AppInterface> = ({ user }): JSX.Element => {
  const classes = useStyles();
  const userId = user.id;
  const [postTitle, setPostTitle] = useState('(untitled)');
  const [postBody, setPostBody] = useState('');

  const saveTitle = (input: { target: { value: string } }) => {
    setPostTitle(input.target.value);
  };

  const saveBody = (input: { target: { value: string } }) => {
    setPostBody(input.target.value);
  };

  const submitPost = () => {
    if (postBody) {
      setPostBody('');
      setPostTitle('(untitled)');
    }
    // TODO: why is userId in brackets?
  };

  // TODO: styling & post request
  return (
    <Container>
      <Grid className={classes.title} item xs={12}>
        <TextField id="bulletin-title" type="post" margin="dense" variant="outlined" onChange={saveTitle} fullWidth />
      </Grid>
      <Grid className={classes.body} item xs={12}>
        <TextField multiline rows={5} id="bulletin-body" type="post" variant="outlined" required onChange={saveBody} fullWidth />
      </Grid>
      <Grid className={classes.button} item xs={12}>
        <Button variant="contained" color="primary" onClick={submitPost} disableElevation disableFocusRipple>hey.</Button>
      </Grid>
    </Container>
  );
};

export default CreatePost;
