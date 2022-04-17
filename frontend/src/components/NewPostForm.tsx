import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// component imports
import { Text, Spacer, Card, Divider } from '@geist-ui/react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";


function NewPostForm() {
  const [id, setId] = React.useState(-1);
  const [userID, setUserID] = React.useState(-1);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  const handleSubmit = () => {

    const data = {
      'id': id,
      'user': userID,
      'status': 'New',
      'date_posted': new Date(),
      'title': title,
      'content': content,
      messages: []
    };

    // try {
    //   const sendData = axios.post('', data);
    // } catch (e) {
    //   console.error(e);
    // }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Post New Shop Item (Post Button only shows up if valid info is filled)
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="itemId"
            label="Item ID (Integer)"
            fullWidth
            variant="standard"
            type="number"
            onChange={(event) => {
              setId(parseInt(event.target.value));
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="userId"
            label="User ID (Integer)"
            fullWidth
            variant="standard"
            type="number"
            onChange={(event) => {
              setUserID(parseInt(event.target.value));
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="postTitle"
            label="Post Title"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="postContent"
            label="Post Content"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setContent(event.target.value);
            }}
          />
        </Grid>
        {
          id > 0 && userID > 0 && title !== '' && content !== '' && (
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleSubmit}>New Post</Button>
            </Grid>
          )
        }
        
      </Grid>
    </React.Fragment>
  );
}

export default NewPostForm;
