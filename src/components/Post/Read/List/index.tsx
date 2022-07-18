import { useState } from 'react';
import { PostModal } from './Modal';
import styled from '@emotion/styled';
import { FixedBtn } from '../FixedBtn';
import { Btn } from '../../../Style/Button';
import { PostModel } from '../../../../types/post';
import { PostIcons } from './Modal/Info/Comment/Read/List/Icons';
import { Genre } from '../../../Board/Read/Page/Board/Info/Genre';
import { AVATAR_BG, Grid, NoAvatar } from '../../../../../styles/global';

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
        <Cont className="post-list" size={3}>
          <FixedBtn />
          {posts?.slice(0, length).map((post) => (
            <Post
              className="POST"
              key={post?.id}
              avatar={post?.avatar!}
              onClick={() => setReadPost(true)}
              onMouseOver={() => onMouse('over', post)}
              onMouseLeave={() => onMouse('leave', post)}
            >
              {!post.avatar && (
                <NoAvatar>
                  <Genre size="2rem" genre={post.board.genre} />
                </NoAvatar>
              )}
              {postId === post.id && !close && <PostIcons post={post} />}
            </Post>
          ))}
        </Cont>
      )}
      {!noFold && (
        <PostFold className="post-fold">
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
        <PostModal
          userId={userId}
          postId={postId}
          boardId={boardId}
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
const Cont = styled(Grid)``;
const Post = styled(AVATAR_BG)`
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
    color: ${(p) => p.theme.color.font};
    background-color: ${(p) => p.theme.color.bg};
  }
`;
