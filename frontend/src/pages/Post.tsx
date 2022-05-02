import React, { useEffect, useState } from 'react';
// component imports
import { Grid, Text, Button, Spacer, Card, Divider, Image } from '@geist-ui/react';
import { useParams } from 'react-router-dom';
import { path } from '../config';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

interface User {
  username: string,
  image: string,
  orders: string[]
}

interface ForumPost {
  authorId: string
  datePosted: Date
  content: string
}

interface ForumThread {
  authorId: string,
  datePosted: Date,
  content: string,
  title: string,
  status: string,
  posts: ForumPost[]
}

const EmptyForumThread: ForumThread = {
  authorId: 'Undefined User',
  datePosted: new Date(),
  content: 'Base post content',
  title: 'Default post',
  status: 'New',
  posts: []
};

function PostPage() {
  const params = useParams();
  const [post, setPost] = useState<ForumThread>(EmptyForumThread);
  const [newMessageContent, setNewMessageContent] = useState<string>('');
  const [postId, setPostId] = useState<string>('');
  const [userMap, setUserMap] = useState<Map<string, User>>(new Map<string, User>());
  const [user, loading, error] = useAuthState(auth);

  async function fetchPost(id : string){
    try {
      const response = await fetch(`${path}/forum?forumId=${id}`).then((res) => (res.json()));
      console.log(response);
      const p = response[id] as ForumThread;
      return p;
    } catch (e) {
      setPost({authorId: "-1", status: 'new', datePosted: new Date(), title: '', content: '', posts: []})
      console.error(e);
      return EmptyForumThread;
    }
    
  }

  async function fetchUsers() {
    try {
      const response = await fetch(`${path}/user`).then((res) => (res.json()));

      const userObjMap : Map<string, User> = new Map<string, User>();
      Object.keys(response).forEach(function(key) {
        userObjMap.set(key, {
          username: response[key]["username"],
          image: response[key]["image"],
          orders: response[key]["orders"]
        } as User);
      });

      setUserMap(userObjMap);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    const setup = async () => {
      const postId = "" + (params.id);
      setPostId(postId);
      const p = await fetchPost(postId);
      setPost(p);
      await fetchUsers();
    };
    setup();
  }, [params.id]);

  function getUserName(userID : string){
    if(userMap === undefined){
      return "Undefined User bc map";
    }

    const userObj = userMap.get(userID);
    if(userObj === undefined){
      return "Undefined User bc field";
    }
    return userObj.username;
  }

  function getFormattedDate () {
    if(post !== undefined){
      const date = post.datePosted.toString();
      const month = date.substring(5, 7);
      const day = date.substring(8, 10);
      const year = date.substring(0, 4);
      return month + " " + day + ", " + year;
    }
    return 'May 30, 2022';    
  }

  function handleNewMsgChange(event : React.ChangeEvent<any>) {
    setNewMessageContent(event.target.value);
  }

  async function handleSubmit(){
    if(newMessageContent !== ""){
        try {
          const authorId = user?.uid;
          const content = newMessageContent;
          const newPost = { "authorId": authorId, 
                            "content": content
                          };

          const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newPost)
          };

          await fetch(`${path}/forum?forumId=${postId}`, requestOptions).then((res) => (res.json()));
        } catch (e) {
          console.error(e);
        }
        setNewMessageContent("");
        window.location.reload();
      }
  }

  return (
    <div className='Post'>
        <Spacer h={6} />
        
        <div className='PostContent'>
        <Card width="90%" style={{marginLeft: '4em'}}>
        <Card.Content>
        <Grid.Container>
            <Grid xs={18}>
            <Text b h1>{}</Text>
            <Text b h1>{post?.title}</Text>
            </Grid>
            <Grid xs={6} style={{marginRight:'1em'}}>
                <Text small>{getUserName(post.authorId)}</Text>
                <Spacer h={.5} />
                <Text small>{getFormattedDate()}</Text>
            </Grid>
        </Grid.Container>
        </Card.Content>
        <Divider h="1px" my={0} />
        <Card.Content>
            <Text p>{post?.content.split("img:")[0]}</Text>
            {post?.content.split("img:").length > 1 && <Image src={post?.content.split("img:")[1]}
   height="200px" width="400px" draggable={false} />}
            {post?.content.split("img:").length === 1 && <Image src="https://user-images.githubusercontent.com/11304944/76085431-fd036480-5fec-11ea-8412-9e581425344a.png"
   height="200px" width="400px" draggable={false} />}
        </Card.Content>
        </Card>
        <Spacer h={0.5} />
        {post?.posts
            ? post?.posts.map((msg) => {
                return (
                    <>
                    <Card width="90%" style={{marginLeft: '4em'}}>
                      <Card.Content>
                            <Text small>{getUserName(msg.authorId)}</Text>
                            <Text h3>{msg.content}</Text>
                        </Card.Content>
                    </Card>
                    <Spacer h={0.5} />
                    </>
                );
            })
            : null}
        {loading || user == null ? <p>You must be signed in to post</p> :
          <Card width="90%" style={{ marginLeft: '4em' }}>
            <Card.Content>
              <form onSubmit={handleSubmit}>
                <Grid.Container gap={2} justify="center">
                  <Grid xs={18}>
                    <input type="text" id="newMsg" name="newMessageInput" placeholder="Enter New Message" value={newMessageContent} onChange={handleNewMsgChange} style={{ width: '100%', height: '5em' }}></input>
                  </Grid>
                  <Grid xs={6}>
                    <Button type="error" style={{ paddingBottom: 50, marginTop: '1em', marginLeft: '2em' }} onClick={handleSubmit}>Submit</Button>
                  </Grid>
                </Grid.Container>
              </form>
            </Card.Content>
          </Card>
          }
      </div>
      <Spacer h={3} />
    </div>
  );
}

export default PostPage;
