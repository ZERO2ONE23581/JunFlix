import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { PosInfo } from './Info/PosInfo';
import { Svg } from '../../../Tools/Svg';
import { AVATAR_URL } from '../../../Avatar';
import { PostModel } from '../../../../types/post';
import { ERROR, Overlay } from '../../../../../styles/global';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { modalVar } from '../../../Tools/Slider/Movie/modal';
import { PostSettingBtn } from '../../../Tools/Button/Modal/Post';
import { EditPost } from '../../Edit';
import { ConfirmModal } from '../../../Tools/Modal';
import useMutation from '../../../../libs/client/useMutation';
import useUser from '../../../../libs/client/useUser';
import { useRouter } from 'next/router';
import { Btn } from '../../../Tools/Button';
import { IData } from '../../../../types/global';

interface IPostModal {
  data: PostModel;
  setModal: Dispatch<SetStateAction<boolean>>;
}
export const PostModal = ({ data, setModal }: IPostModal) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const [setting, setSetting] = useState(false);
  const [edit, setEdit] = useState({
    update: false,
    delete: false,
  });

  const editableData = {
    userId: data.UserID,
    boardId: data.BoardID,
    postId: data.id,
    title: data.title,
    content: data.content!,
    postAvatar: data.avatar!,
  };

  const [deletePost, { data: delData, loading: delLoading }] =
    useMutation<IData>(
      `/api/user/${data.UserID}/board/${data.BoardID}/post/${data.id}/delete`
    );

  const [error, setError] = useState(false);
  const deletePostClick = () => {
    const isMyPost = Boolean(loggedInUser?.id === data.UserID);
    if (!isMyPost) return setError(true);
    deletePost({});
  };

  useEffect(() => {
    if (delData?.ok) router.reload();
    if (delData?.error) alert(delData?.error);
  }, [delData]);

  return (
    <>
      <Cont
        className="post-modal"
        //
        exit="exit"
        initial="initial"
        animate="animate"
        variants={modalVar}
        layoutId={data.id + ''}
        transition={{ type: 'tween', duration: 0.4 }}
      >
        <Svg size="2rem" type="ellipsis" onClick={() => setSetting(true)} />
        <PostAvatar background={AVATAR_URL(data?.avatar!)} />
        <PosInfo data={data} />
        <Svg size="2rem" type="X" onClick={() => setModal(false)} />
      </Cont>

      {setting && (
        <PostSettingBtn
          data={{
            userId: data.UserID,
            boardId: data.BoardID,
            boardName: data?.board.title,
          }}
          setEdit={setEdit}
          closeModal={setSetting}
        />
      )}

      <Overlay
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setModal(false)}
      />

      {edit.update && <EditPost setEdit={setEdit} ogData={editableData} />}

      {edit.delete && (
        <>
          <ConfirmModal type="delete-post" clickDelPost={deletePostClick} />
          {error && (
            <ERROR>
              <span>
                삭제권한이 없습니다. (You don't have right to delete this post.
              </span>
              <Btn type="button" onClick={() => router.push('/login')} />
            </ERROR>
          )}
        </>
      )}
    </>
  );
};
const Cont = styled(motion.article)`
  left: 0;
  right: 0;
  top: 5%;
  z-index: 102;
  margin: 0 auto;
  position: fixed;
  //
  width: 70vw;
  height: 90vh;
  min-width: 600px;
  min-height: 600px;
  overflow: hidden;
  overflow-y: auto;
  //
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: ${(p) => p.theme.color.bg};
  ::-webkit-scrollbar {
    display: none;
  }
  .post-info {
    background: ${(p) =>
      `linear-gradient(to right, ${p.theme.color.bg}, ${p.theme.color.grey.dark})`};
    width: 30vw;
    height: 90vh;
    min-width: 300px;
    min-height: 300px;
    .post-content {
      //border: 2px solid yellow;
    }
  }
  .ellipsis {
    top: 1em;
    left: 1.5em;
    position: absolute;
    fill: ${(p) => p.theme.color.font};
  }
  .X {
    top: 1em;
    right: 1em;
    position: absolute;
    fill: ${(p) => p.theme.color.font};
  }
`;
const PostAvatar = styled.div<{ background: string }>`
  width: 40vw;
  height: 90vh;
  min-width: 400px;
  min-height: 400px;
  background: ${(p) =>
    p.background &&
    `linear-gradient(to left, ${p.theme.color.bg} ,transparent), url(${p.background}) center / cover no-repeat `};
`;
