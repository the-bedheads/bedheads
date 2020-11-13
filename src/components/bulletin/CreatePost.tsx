import React, { useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const CreatePost: React.FC = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [postBody, setPostBody] = useState('');

  const submit = () => {
    console.log('submitted');
    // TODO: why is userId in brackets?
  };

  // TODO: styling & post request
  return (
    <div className="holder">
      <Grid item xs={12}>
        <TextField id="outlined-search" type="search" variant="outlined" fullWidth />
      </Grid>
    </div>
  );
};

export default CreatePost;
