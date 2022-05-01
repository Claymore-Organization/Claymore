import { Text, Card, Spacer, Image } from '@geist-ui/react';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { path } from '../config';


interface User {
    id: string,
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
    id: string,
    authorId: string,
    datePosted: Date,
    content: string,
    title: string,
    status: string,
    posts: ForumPost[]
}

interface PostItemProps {
    post: ForumThread
}


const ForumPost = (props: PostItemProps) => {
  const { post } = props;
  const [uname, setUname] = useState<string>("");

  async function fetchUser(){
    try {
        const response = await fetch(`${path}/user?userId=${post.authorId}`).then((res) => (res.json()));
        let user : User = {id: "", username: "", image:"", orders:[]}; 
        Object.keys(response).forEach(function(key) {
            user = {
              id: key,
              username: response[key]["username"],
              image: response[key]["image"],
              orders: response[key]["orders"],
            };
          });
        return user;

      } catch (e) {
        console.error(e);
        return undefined;
      }
  }

  async function getUserName(){
    const user = await fetchUser();
    if(user === undefined){
        console.log("user undefined");
        return "Undefined User";
    }
    return user.username;
  }

  useEffect(() => {
    const setup = async () => {
        const uname = await getUserName();
        setUname(uname);
      };
      setup();
  }, []);

  return (
    <div>
        <Card width="70%" id={`fp${post.id}`} style={{marginLeft: '13em'}}>
            <Image src="https://user-images.githubusercontent.com/11304944/76085431-fd036480-5fec-11ea-8412-9e581425344a.png"
            height="200px" width="400px" draggable={false} />
            <Text h4 mb={0}><Link to={`post/${post.id}`}>{post.title}</Link></Text>
            
            <Text type="secondary" small>{uname}</Text>
            <Card.Footer>
                <Text h4 mb={0}>{post.content}</Text>
            </Card.Footer>
        </Card>
        <Spacer h={3} />
    </div>
  );
}

export default ForumPost;
