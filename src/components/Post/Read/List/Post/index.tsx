import { useState } from 'react';
import styled from '@emotion/styled';
import { PostModal } from '../../Modal';
import { PostModel } from '../../../../../types/post';
import { AVATAR_BG } from '../../../../../../styles/global';
import { PostIcons } from '../../Modal/Info/Comment/Read/List/Icons';
import { NoAvatar } from '../../../../NoAvatar';

interface IPost {
  post: PostModel;
}
export const Post = ({ post }: IPost) => {
  const [userId, setUserId] = useState(0);
  const [postId, setPostId] = useState(0);
  const [boardId, setBoardId] = useState(0);
  const [close, setClose] = useState(false);
  const [modal, setModal] = useState(false);
  const onMouse = (type: string, post: PostModel) => {
    setPostId(post.id);
    setUserId(post.UserID);
    setBoardId(post.BoardID);
    if (type === 'over') setClose(false);
    if (type === 'leave') setClose(true);
  };

  return (
    <>
      <Cont
        key={post?.id}
        className="post"
        avatar={post?.avatar!}
        onClick={() => setModal(true)}
        onMouseOver={() => onMouse('over', post)}
        onMouseLeave={() => onMouse('leave', post)}
      >
        <NoAvatar avatar={post.avatar!} />
        {postId === post.id && !close && <PostIcons post={post} />}
      </Cont>

      {modal && (
        <PostModal setModal={setModal} query={{ userId, boardId, postId }} />
      )}
    </>
  );
};
const Cont = styled(AVATAR_BG)`
  display: flex;
  cursor: pointer;
  position: relative;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;
