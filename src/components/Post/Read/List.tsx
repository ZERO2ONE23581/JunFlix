import { useState } from 'react';
import styled from '@emotion/styled';
import { ReadPost } from './Post';
import { PostIcons } from '../Comment/Read/Icons';
import { AVATAR_BG } from '../../Avatar';
import { Svg } from '../../Style/Svg/Svg';
import { PostModel } from '../../../types/post';
import { Grid } from '../../../../styles/global';

interface IPostList {
  posts: PostModel[];
}
export const PostList = ({ posts }: IPostList) => {
  const [readPost, setReadPost] = useState(false);
  const [userId, setUserId] = useState(0);
  const [boardId, setBoardId] = useState(0);
  const [postId, setPostId] = useState(0);
  const clickPost = (id: number) => {
    setReadPost(true);
    if (id) {
      setUserId(id);
      setBoardId(id);
      setPostId(id);
    }
  };
  return (
    <>
      {posts?.length > 0 ? (
        <>
          <Grid className="post-grid" size={3}>
            {posts?.map((post) => (
              <Post
                key={post?.id}
                avatar={post?.avatar!}
                onClick={() => clickPost(post?.id)}
              >
                {!post?.avatar && <Svg type="no-image" />}
                <PostIcons
                  post_id={post?.id}
                  user_id={post?.UserID}
                  board_id={post?.BoardID}
                />
              </Post>
            ))}
          </Grid>
          {readPost && (
            <ReadPost
              USERID={userId}
              BOARDID={boardId}
              POSTID={postId}
              setReadPost={setReadPost}
            />
          )}
        </>
      ) : (
        <>
          <h1>포스트가 존재하지 않습니다.</h1>
        </>
      )}
    </>
  );
};
const Post = styled(AVATAR_BG)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  min-height: 300px;
  border-radius: 5px;
`;
