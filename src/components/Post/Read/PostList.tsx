import { useState } from 'react';
import styled from '@emotion/styled';
import { ReadPost } from './ReadPost';
import { PostIcons } from './PostIcons';
import { Svg } from '../../Style/Svg/Svg';
import { PostModel } from '../../../types/post';
import { Grid } from '../../../../styles/global';
import { WithAvatar } from '../../Avatar/AvatarInput';

interface IPostListProps {
  posts: PostModel[];
}
export const PostList = ({ posts }: IPostListProps) => {
  const [post, setPost] = useState(false);
  const [userId, setUserId] = useState(0);
  const [boardId, setBoardId] = useState(0);
  const [postId, setPostId] = useState(0);
  const clickPost = (id: number) => {
    setPost(true);
    if (id) {
      setUserId(id);
      setBoardId(id);
      setPostId(id);
    }
  };
  return (
    <>
      <Grid className="post-grid" size={3}>
        {posts?.map((post) => (
          <Post
            key={post.id}
            avatar={post.avatar}
            onClick={() => clickPost(post.id)}
          >
            {!post.avatar && <Svg type="no-image" />}
            <PostIcons
              post_id={post.id}
              user_id={post.UserID}
              board_id={post.BoardID}
            />
          </Post>
        ))}
      </Grid>
      {post && (
        <ReadPost
          USERID={userId}
          BOARDID={boardId}
          POSTID={postId}
          setReadPost={setPost}
        />
      )}
    </>
  );
};
const Post = styled(WithAvatar)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  min-height: 300px;
  border-radius: 5px;
`;
