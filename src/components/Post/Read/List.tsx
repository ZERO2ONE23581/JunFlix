import { useState } from 'react';
import { ReadPost } from './Post';
import styled from '@emotion/styled';
import { Btn } from '../../Style/Button';
import { PostModel } from '../../../types/post';
import { PostIcons } from '../Comment/Read/Icons';
import { AVATAR_BG, Grid } from '../../../../styles/global';

interface IPostList {
  posts: PostModel[];
}
export const PostList = ({ posts }: IPostList) => {
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
  const Max = 6;
  const isPost = Boolean(posts?.length > 0);
  const [length, setLength] = useState(Max);
  const noFold = Boolean(posts?.length < length);
  const unFold = Boolean(length !== posts?.length);
  const Fold = Boolean(length === posts?.length);
  return (
    <>
      {isPost && (
        <Grid className="post-grid" size={3}>
          {posts?.slice(0, length).map((post) => (
            <Post
              key={post?.id}
              avatar={post?.avatar!}
              onClick={() => setReadPost(true)}
              onMouseOver={() => onMouse('over', post)}
              onMouseLeave={() => onMouse('leave', post)}
            >
              {postId === post.id && !close && <PostIcons post={post} />}
            </Post>
          ))}
        </Grid>
      )}
      {!noFold && (
        <PostFold>
          {unFold && (
            <Btn
              type="button"
              name="펼치기"
              onClick={() => setLength(posts?.length)}
            />
          )}
          {Fold && (
            <Btn type="button" name="접기" onClick={() => setLength(Max)} />
          )}
        </PostFold>
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
  min-height: 370px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
`;
const PostFold = styled.div`
  margin-top: 20px;
  display: flex;
  align-content: center;
  justify-content: end;
  button {
    width: 80px;
    border: 2px solid white;
  }
`;
