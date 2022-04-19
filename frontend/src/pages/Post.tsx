import React, { useEffect, useState } from 'react';
// component imports
import { Grid, Text, Button, Spacer, Card, Divider, Image } from '@geist-ui/react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import TempPosts from "../assets/postsData";
import TempMessages from "../assets/messagesData";
import Header from '../components/Header';
import { throws } from 'assert';
import posts from '../assets/postsData';

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

interface MenuItem {
  id: number;
  name: string;
  price: number;
  classic: boolean;
}

function PostPage() {
  const params = useParams();
  // const [messagesList, setMessagesList] = useState<Array<ForumPost>>([]);
  // const [post, setPost] = useState<ForumThread>();
  const [post, setPost] = useState<ForumThread>(EmptyForumThread);
  const [newMessageContent, setNewMessageContent] = useState<string>('');
  const [postId, setPostId] = useState<string>('');
  // const [userList, setUserList] = useState<Array<User>>([]);
  const [userMap, setUserMap] = useState<Map<string, User>>(new Map<string, User>());

  async function fetchPost(id : string){
    console.log("getting post with id: " + id);
    try {
      const response = await fetch(`http://localhost:5001/claymore-d6749/us-central1/default/forum?forumId=${id}`).then((res) => (res.json()));
      console.log(response);
      const p = response[id] as ForumThread;
      // const p : Map<string, ForumThread> = response as Map<string, ForumThread>;
      // console.log(p);
      return p;
      // setPost(response); // FIX THIS: MAKE post a MAP string -> ForumThread
    //   setMessagesList(TempMessages);
      // const response = TempMessages.filter(msg => postMessageIds.includes(msg.id));
      // return response;
      
    } catch (e) {
      // setPost({id: "-1", authorId: "-1", status: 'new', datePosted: new Date(), title: '', content: '', posts: []})
      console.error(e);
      // const m = new Map();
      // m.set("forumtest", EmptyForumThread);
      return EmptyForumThread;
    }
    
  }

  async function fetchUsers() {// FIX THIS: MAKE post a MAP string -> User
    try {
      const response = await fetch('http://localhost:5001/claymore-d6749/us-central1/default/user').then((res) => (res.json()));
      console.log(response);
      // setUserMap(response);

      // console.log(response);
      const userObjMap : Map<string, User> = new Map<string, User>();
      Object.keys(response).forEach(function(key) {
        userObjMap.set(key, {
          username: response[key]["username"],
          image: response[key]["image"],
          orders: response[key]["orders"]
        } as User);
      });
      // console.log(userObjList);
      // setUserList(userObjList);
      setUserMap(userObjMap);
    } catch (e) {
      console.error(e);
    }
  }

  // async function fetchPosts() {
  //   try {
  //     //const response = await fetch('/posts').then((res) => (res.json()));
  //     // console.log(response);
  //     //setPostList(response);
      

  //   //   setMessagesList(TempMessages);
  //     const response = TempPosts;
  //     return response;
      
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  // async function fetchMessages(postMessageIds : number[]) {
  //   try {
  //     //const response = await fetch('/posts').then((res) => (res.json()));
  //     // console.log(response);
  //     //setPostList(response);

  //   //   setMessagesList(TempMessages);
  //     const response = TempMessages.filter(msg => postMessageIds.includes(msg.id));
  //     return response;
      
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  // async function getPost(id: number, postList: Array<ForumThread>){
  //   // post passed in via link
  //   const post = postList.find(p => p.id === id);
  //   if(post !== undefined) {
  //     //console.log("post: ", post);
  //     return post;
  //   } 
  //   return {id: -1, user: -1, status: 'new', date_posted: new Date(), title: '', content: '', messages: []}
  // }

  useEffect(() => {
    const setup = async () => {
      const postId = "" + (params.id);
      setPostId(postId);
      const p = await fetchPost(postId);
      setPost(p);
      await fetchUsers();

      // const postList = await fetchPosts();
      // const post = await getPost(Number(params.id), (postList as Array<Post>));
      // setPost(post);
      // const postMessageIds = post.messages;
      // const messagesList = await fetchMessages(postMessageIds);
      // setMessagesList(messagesList!)
    };
    setup();
  }, [params.id]);

  function getUserName(userID : string){
    // const userObj = userList.find(u => u.id === userID);
    if(userMap === undefined){
      return "Undefined User bc map";
    }
    console.log(userID);
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

  return (
    <div className='Post'>
        <Header />
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
            <Text p>{post?.content}</Text>
            <Image src="https://user-images.githubusercontent.com/11304944/76085431-fd036480-5fec-11ea-8412-9e581425344a.png"
   height="200px" width="400px" draggable={false} />
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

        <Card width="90%" style={{marginLeft: '4em'}}>
            <Card.Content>
                <Grid.Container gap={2} justify="center">
                <Grid xs={18}>
                    <input type="text" id="newMsg" name="newMessageInput" placeholder="Enter New Message" value={newMessageContent} onChange={handleNewMsgChange} style={{width:'100%', height:'5em'}}></input>
                </Grid>
                <Grid xs={6}>
                    <Button type="error" style={{paddingBottom:50, marginTop: '1em', marginLeft: '2em'}}>Submit</Button>
                </Grid>
                </Grid.Container>
            </Card.Content>
        </Card>
      </div>
      <Spacer h={3} />
    </div>
  );
}

export default PostPage;
