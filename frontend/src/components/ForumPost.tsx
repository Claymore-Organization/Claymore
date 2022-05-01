import { Text, Card, Spacer, Image } from '@geist-ui/react';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { path } from '../config';


export interface User {
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
  const [uname, setUname] = useState<string>("Anonymous");
  const [image, setImage] = useState<string>("https://user-images.githubusercontent.com/11304944/76085431-fd036480-5fec-11ea-8412-9e581425344a.png");

  async function fetchUser() {
    return await fetch(`${path}/user?userId=${post.authorId}`).then(
      (res) => {
        return res.json()
      },
      (e) => {
        console.error(e);
        return undefined;
      }
    ).then((userid_to_data_map) => {
      const id = Object.keys(userid_to_data_map)[0]
      const userdata = userid_to_data_map[id]
      console.log(userdata)
      const user: User = {
        id: userdata["id"],
        username: userdata["username"],
        image: userdata["image"],
        orders: userdata["orders"],
      };
      return user;
    }, (e) => {
        console.error(e);
        return undefined;
    });
  }

  useEffect(() => {
    const setup = async () => {
      const user = await fetchUser();
      if (user !== undefined) {
        setUname(user.username)
        setImage(user.image)
      }
      };
      setup();
  }, []);

  return (
    <div>
        <Card width="70%" style={{marginLeft: '13em'}}>
            <Image src={image} height="200px" width="400px" draggable={false} />
            <Text h4 mb={0}><Link to={`post/${post.id}`}>{post.title}</Link></Text>
            
            <Text type="secondary" small>{uname}</Text>
            <Card.Footer>
                <Text h4 mb={0}>{post.content.split('img:')[0]}</Text>
            </Card.Footer>
        </Card>
        <Spacer h={3} />
    </div>
  );
}

export default ForumPost;
