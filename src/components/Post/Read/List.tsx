import { useState } from 'react';
import { ReadPost } from './Post';
import styled from '@emotion/styled';
import { AVATAR_BG } from '../../Avatar';
import { PostModel } from '../../../types/post';
import { Grid } from '../../../../styles/global';
import { PostIcons } from '../Comment/Read/Icons';

interface IPostList {
  posts: PostModel[];
}
export const PostList = ({ posts }: IPostList) => {
  const isPost = Boolean(posts?.length > 0);
  const [userId, setUserId] = useState(0);
  const [postId, setPostId] = useState(0);
  const [boardId, setBoardId] = useState(0);
  const [close, setClose] = useState(false);
  const [readPost, setReadPost] = useState(false);

  const onMouse = (type: string, post: PostModel) => {
    setPostId(post.id);
    setUserId(post.UserID);
    setBoardId(post.BoardID);
    if (type === 'over') setClose(false);
    if (type === 'leave') setClose(true);
  };
  return (
    <>
      {isPost && (
        <Grid className="post-grid" size={3}>
          {posts?.map((post) => (
            <Post
              key={post?.id}
              avatar={post?.avatar!}
              onMouseOver={() => onMouse('over', post)}
              onMouseLeave={() => onMouse('leave', post)}
              onClick={() => setReadPost(true)}
            >
              {postId === post.id && !close && <PostIcons post={post} />}
            </Post>
          ))}
        </Grid>
      )}
      {readPost && (
        <ReadPost
          USERID={userId}
          POSTID={postId}
          BOARDID={boardId}
          setReadPost={setReadPost}
        />
      )}

      {!isPost && (
        <>
          <h1>포스트가 존재하지 않습니다.</h1>
        </>
      )}
    </>
  );
};
const Post = styled(AVATAR_BG)`
  min-width: 200px;
  min-height: 400px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
`;
