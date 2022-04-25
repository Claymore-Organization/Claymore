import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// component imports
import { Text, Spacer, Card, Divider } from '@geist-ui/react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import { path } from '../config';
import ForumPost from './ForumPost';

interface ForumThread {
  id: string,
  authorId: string,
  datePosted: Date,
  content: string,
  title: string,
  status: string,
  posts: ForumPost[]
}


function NewPostForm() {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  const navigate = useNavigate();

  function navigateNewPost(newThreadId: string) {
      navigate(`/forum/post/${newThreadId}`);
  }

  async function handleSubmit(){
    try {
      const authorId = "signedinuser";
      const datePosted = new Date();

      const newForumThread = {
        "authorId": authorId,
        "datePosted": datePosted,
        "content": content,
        "title": title,
        "status": "New",
        "posts": []
      }
                  
      console.log(newForumThread);
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newForumThread)
      };

      const np : Map<string, ForumThread> = await fetch(`${path}/forum`, requestOptions).then((res) => (res.json()));
      console.log(Object.keys(np).at(0));
      setContent("");
      setTitle("");
      navigateNewPost(Object.keys(np).at(0)!);
    } catch (e) {
      console.error(e);
      setContent("");
      setTitle("");
    }
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        New Post (Post Button only shows up if valid info is filled)
      </Typography>
      <Grid container spacing={3}>
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
          title !== '' && content !== '' && (
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
