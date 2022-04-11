import { Text, Card, Spacer, Image } from '@geist-ui/react';
import { Link } from "react-router-dom";

interface Post {
    id: number,
    user: number,
    status: string,
    date_posted: Date,
    title: string,
    content: string,
    messages: number[]
}

interface PostItemProps {
    post: Post
}



const ForumPost = (props: PostItemProps) => {
  const { post } = props;

  function getUserName(){
    if(post.user === 1){
        return "Max Dunaevschi"
    }
    else if(post.user === 2){
        return "Gabriel Magendzo"
    }
    else if(post.user === 3){
        return "Oscar Kav"
    }
    else if(post.user === 4){
        return "Achilles Ecos"
    }
    else {
        return "Gialon Kasha"
    }
  }

  return (
    <div>
        <Card width="70%" style={{marginLeft: '13em'}}>
            <Image src="https://user-images.githubusercontent.com/11304944/76085431-fd036480-5fec-11ea-8412-9e581425344a.png"
            height="200px" width="400px" draggable={false} />
            <Text h4 mb={0}><Link to={`post/${post.id}`}>{post.title}</Link></Text>
            
            <Text type="secondary" small>{getUserName()}</Text>
            <Card.Footer>
                <Text h4 mb={0}>{post.content}</Text>
            </Card.Footer>
        </Card>
        <Spacer h={3} />
    </div>
  );
}

export default ForumPost;
