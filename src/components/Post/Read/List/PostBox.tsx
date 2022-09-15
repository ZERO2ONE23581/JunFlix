import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import { PostModal } from '../Each';
import { AVATAR_BG } from '../../../Avatar';
import { PostModel } from '../../../../types/post';
import { NoAvatar } from '../../../Avatar/NoAvatar';
import { IGetBoard } from '../../../../types/board';
import { PostIcons } from '../../../Comment/Post/Read/List/Icons';
import { Svg } from '../../../Tools/Svg';
import { ConfirmModal } from '../../../Tools/Modal';
import useUser from '../../../../libs/client/useUser';
import { boxVars, MotionBox } from '../../../../../styles/global';

interface IPostBox {
  post: PostModel;
}
export const PostBox = ({ post }: IPostBox) => {
  const { data } = useSWR<IGetBoard>(
    `/api/user/${post.UserID}/board/${post.BoardID}`
  );
  const { loggedInUser } = useUser();
  const [userId, setUserId] = useState(0);
  const [postId, setPostId] = useState(0);
  const [boardId, setBoardId] = useState(0);
  const [close, setClose] = useState(false);
  const [modal, setModal] = useState(false);
  const isMyPost = Boolean(loggedInUser?.id === post.UserID);
  const isBlur = !data?.isFollowing && !isMyPost;

  const onMouse = (type: string, post: PostModel) => {
    setPostId(post.id);
    setUserId(post.UserID);
    setBoardId(post.BoardID);
    if (type === 'over') setClose(false);
    if (type === 'leave') setClose(true);
  };
  const [lock, setLock] = useState(false);
  const boardUrl = `/user/${post.UserID}/board/${post.BoardID}/${post.board.title}`;
  const clickLocker = () => {
    setLock(true);
  };
  return (
    <>
      <Cont
        variants={boxVars}
        initial="initial"
        whileHover="hover"
        className="post-box"
      >
        {isBlur && <Svg type="lock" size="2rem" onClick={clickLocker} />}
        <Blur isBlur={isBlur}>
          <PostBG
            className="post-bg"
            key={post?.id}
            avatar={post?.avatar!}
            onClick={() => setModal(true)}
            onMouseOver={() => onMouse('over', post)}
            onMouseLeave={() => onMouse('leave', post)}
          >
            <NoAvatar avatar={post.avatar!} />
            {postId === post.id && !close && <PostIcons post={post} />}
          </PostBG>
        </Blur>
      </Cont>

      {lock && (
        <ConfirmModal type="lock" closeModal={setLock} boardUrl={boardUrl} />
      )}

      {modal && (
        <PostModal setModal={setModal} query={{ userId, boardId, postId }} />
      )}
    </>
  );
};
const Cont = styled(MotionBox)`
  position: relative;
  .lock {
    top: 50%;
    left: 50%;
    z-index: 1;
    cursor: pointer;
    position: absolute;
    transform: translate(-50%, -50%);
  }
`;
const Blur = styled.div<{ isBlur: boolean }>`
  position: relative;
  filter: ${(p) => p.isBlur && 'blur(5px)'};
  .text {
    top: 0;
    right: 0;
    width: 200px;
    text-align: center;
    position: absolute;
  }
`;
const PostBG = styled(AVATAR_BG)`
  display: flex;
  cursor: pointer;
  position: relative;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;
