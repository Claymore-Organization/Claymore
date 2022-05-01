import React, { useEffect, useState } from 'react';
import { Spacer, Button } from '@geist-ui/react';
import ForumPost from '../components/ForumPost';
import { Collapse } from '@geist-ui/core';
import { useNavigate } from 'react-router-dom';
import { path } from '../config';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

interface Post {
  authorId: string
  datePosted: Date
  content: string
}

interface ForumThread {
  id: string,
  authorId: string,
  datePosted: Date,
  content: string,
  title: string,
  status: string,
  posts: Post[]
}

function Forum() {
  const [postList, setPostList] = useState<Array<ForumThread>>([]);
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  function navigateNewPostPage() {
      navigate('/newPost');
  }

  async function fetchPosts() {
    try {
      const response = await fetch(`${path}/forum`).then((res) => (res.json()));
      const postObjList : Array<ForumThread> = [];
      Object.keys(response).forEach(function(key) {
        postObjList.push({
          id: key,
          authorId: response[key]["authorId"],
          datePosted: response[key]["datePosted"],
          content: response[key]["content"],
          title: response[key]["title"],
          status: response[key]["status"],
          posts: (response[key]["posts"])
        } as ForumThread);
      });
      setPostList(postObjList);
    } catch (e) {
      console.error(e);
    }
  }


  useEffect(() => {
    fetchPosts();
  }, []);

  function filterUpdated(post: ForumThread) {
    // A thread is updated if the author has replied but is not the last reply
    if (!user) {
      return false;
    }
    const posts = post.posts;
    const users = posts.map(post => post.authorId);
    return users.includes(user.uid) && posts[posts.length - 1].authorId !== user.uid;
  }

  const myList = postList?.filter(post => user && user.uid === post.authorId);
  const updatedList = postList?.filter(post => post.status === "In Progress" && filterUpdated(post));
  const inProgressList = postList?.filter(post => post.status === "In Progress" && !filterUpdated(post));

  return (
    
    <div className='AllPosts'>
      <Spacer h={6} />

      <Button auto scale={1.5} type="success" style={{ textTransform: 'uppercase', fontWeight: 'bold', textAlign: 'center', paddingBottom: '60px', marginLeft: '36.5em'}} onClick={navigateNewPostPage}>New Post</Button>

      <Spacer h={2} />

      <Collapse.Group>
      <Collapse title="My Posts" initialVisible={true}>
        {myList
          ? myList.map((post) => {
              return (
                <div key={post.id}>
                    <ForumPost post={post} />
                </div>
              );
            })
          : null}
      </Collapse>
  
      <Collapse title="New">
        {postList
          ? postList.filter(post => post.status === "New").map((post) => {
              return (
                <div key={post.id}>
                    <ForumPost post={post} />
                </div>
              );
            })
          : null}
      </Collapse>

      <Collapse title="Updated">
        {updatedList
          ? updatedList.map((post) => {
              return (
                <div key={post.id}>
                    <ForumPost post={post} />
                </div>
              );
            })
          : null}
      </Collapse>

      <Collapse title="In Progress">
        {inProgressList
          ? inProgressList.map((post) => {
              return (
                <div key={post.id}>
                    <ForumPost post={post} />
                </div>
              );
            })
          : null}
      </Collapse>

      <Collapse title="Completed">
        {postList
          ? postList.filter(post => post.status === "Completed").map((post) => {
              return (
                <div key={post.id}>
                    <ForumPost post={post} />
                </div>
              );
            })
          : null}
      </Collapse>

      </Collapse.Group>
    </div>
  );
}

export default Forum;
