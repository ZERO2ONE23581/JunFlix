import { Fold } from './Fold';
import { useState } from 'react';
import { PostModal } from '../Modal';
import styled from '@emotion/styled';
import { FixedBtn } from '../FixedBtn';
import { IPostList, PostModel } from '../../../../types/post';
import { PostIcons } from '../Modal/Info/Comment/Read/List/Icons';
import { Genre } from '../../../Board/Read/Board/Info/Genre';
import { AVATAR_BG, Grid, NoAvatar } from '../../../../../styles/global';

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
      <Fold
        Max={Max}
        length={length}
        setLength={setLength}
        postLength={posts?.length}
      />

      {readPost && (
        <PostModal
          setReadPost={setReadPost}
          query={{ userId: userId, boardId: boardId, postId: postId }}
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
