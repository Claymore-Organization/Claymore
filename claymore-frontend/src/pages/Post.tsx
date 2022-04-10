import React, { useEffect, useState } from 'react';
// component imports
import { Grid, Text, Button, Spacer, Card, Divider, Image, Badge } from '@geist-ui/react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import TempPosts from "../assets/postsData";
import TempMessages from "../assets/messagesData";
import Header from '../components/Header';

interface Message {
    id: number,
    user: number,
    content: string,
}

interface Post {
    id: number,
    user: number,
    status: string,
    date_posted: Date,
    title: string,
    content: string,
    messages: number[]
}

function PostPage() {
  const params = useParams();
  const [messagesList, setMessagesList] = useState<Array<Message>>([]);
  const [post, setPost] = useState<Post>();
  const [newMessageContent, setNewMessageContent] = useState<string>('');

  const navigate = useNavigate();

  async function fetchPosts() {
    try {
      //const response = await fetch('/posts').then((res) => (res.json()));
      // console.log(response);
      //setPostList(response);

    //   setMessagesList(TempMessages);
      const response = TempPosts;
      return response;
      
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchMessages(postMessageIds : number[]) {
    try {
      //const response = await fetch('/posts').then((res) => (res.json()));
      // console.log(response);
      //setPostList(response);

    //   setMessagesList(TempMessages);
      const response = TempMessages.filter(msg => postMessageIds.includes(msg.id));
      return response;
      
    } catch (e) {
      console.error(e);
    }
  }

  async function getPost(id: number, postList: Array<Post>){
    // post passed in via link
    const post = postList.find(p => p.id === id);
    if(post !== undefined) {
      //console.log("post: ", post);
      return post;
    } 
    return {id: -1, user: -1, status: 'new', date_posted: new Date(), title: '', content: '', messages: []}
  }

  useEffect(() => {
    const setup = async () => {
      const postList = await fetchPosts();
      const post = await getPost(Number(params.id), (postList as Array<Post>));
      setPost(post);
      const postMessageIds = post.messages;
      const messagesList = await fetchMessages(postMessageIds);
      setMessagesList(messagesList!)
      
    };
    setup();
  }, [params.id]);

  function getUserName(userID : number){
    if(userID === 1){
        return "Max Dunaevschi";
    }
    else if(userID === 2){
        return "Gabriel Magendzo";
    }
    else if(userID === 3){
        return "Oscar Kav";
    }
    else if(userID === 4){
        return "Achilles Ecos";
    }
    else {
        return "Gialon Kasha";
    }
  }

  function getFormattedDate () {
    if(post === undefined){
        return 'May 30, 2022'
    }

    const date = post.date_posted.toString();
    const month = date.substring(4, 7);
    const day = date.substring(8, 10);
    const year = date.substring(11, 15);
    return month + " " + day + ", " + year;
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
            <Text b h1>{post?.title}</Text>
            </Grid>
            <Grid xs={6} style={{marginRight:'1em'}}>
                <Text small>{getUserName(post!.id)}</Text>
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
        {messagesList
            ? messagesList.map((msg) => {
                return (
                    <>
                    <Card width="90%" style={{marginLeft: '4em'}}>
                        <Card.Content>
                            <Text small>{getUserName(msg.user)}</Text>
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
                    <Button type="error" style={{padding:0, marginTop: '1em', marginLeft: '2em'}}>Submit</Button>
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
