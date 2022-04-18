import React, { useEffect, useState } from 'react';
import { Spacer, Button } from '@geist-ui/react';
import ForumPost from '../components/ForumPost';
import TempPosts from "../assets/postsData";
import TempMessages from "../assets/messagesData";
import Header from '../components/Header';
import { Collapse } from '@geist-ui/core';
import { useNavigate } from 'react-router-dom';

// interface Message {
//     id: number,
//     user: number,
//     content: string,
// }

// interface Post {
//     id: number,
//     user: number,
//     status: string,
//     date_posted: Date,
//     title: string,
//     content: string,
//     messages: number[]
// }

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
  const [messagesList, setMessagesList] = useState<Array<ForumPost>>([]);
  const headers = new Headers();

  headers.append("Access-Control-Allow-Origin", "*");
  headers.append("Access-Control-Allow-Credentials", "true");
  headers.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  headers.append("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

  const navigate = useNavigate();

  function navigateNewPostPage() {
      navigate('/newPost');
  }

  async function fetchPosts() {
    try {
      const response = await fetch('http://localhost:5001/claymore-d6749/us-central1/default/forum').then((res) => (res.json()));
      console.log(response);
      setPostList(response);


      // setPostList(TempPosts);
      // setMessagesList(TempMessages);
      
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    
    <div className='AllPosts'>
      <Header />
      <Spacer h={6} />

      <Button auto scale={1.5} type="success" style={{ textTransform: 'uppercase', fontWeight: 'bold', textAlign: 'center', paddingBottom: '60px', marginLeft: '36.5em'}} onClick={navigateNewPostPage}>New Post</Button>

      <Spacer h={2} />

      <Collapse.Group>
      <Collapse title="My Posts" initialVisible={true}>
        {postList
          ? postList.filter(post => post.authorId === "author1").sort(function(o1, o2) {
            if(o1.datePosted > o2.datePosted) return -1;
            if(o1.datePosted < o2.datePosted) return 1;
            return 0;
          }).map((post) => {
              return (
                <div>
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
                <div>
                    <ForumPost post={post} />
                </div>
              );
            })
          : null}
      </Collapse>

      <Collapse title="Updated">
        {postList
          ? postList.filter(post => post.status === "In Progress").map((post) => {
              return (
                <div>
                    <ForumPost post={post} />
                </div>
              );
            })
          : null}
      </Collapse>

      <Collapse title="In Progress">
        {postList
          ? postList.filter(post => post.status === "In Progress").map((post) => {
              return (
                <div>
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
                <div>
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
