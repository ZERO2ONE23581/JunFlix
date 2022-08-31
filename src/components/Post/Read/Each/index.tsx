import useSWR from 'swr';
import { Info } from './Info';
import styled from '@emotion/styled';
import { EditPost } from '../../Edit';
import { Avatar } from '../../../Avatar';
import { IGetPost } from '../../../../types/post';
import { IQuery, IData } from '../../../../types/global';
import { ConfirmModal } from '../../../Tools/Modal';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Modal, DimBackground } from '../../../../../styles/global';
import { useRouter } from 'next/router';
import useUser from '../../../../libs/client/useUser';
import useMutation from '../../../../libs/client/useMutation';
import { useNeedLogin } from '../../../../libs/client/useTools';

interface IPostModal extends IQuery {
  setModal: Dispatch<SetStateAction<boolean>>;
}
export const PostModal = ({ query, setModal }: IPostModal) => {
  useNeedLogin();
  const { data } = useSWR<IGetPost>(
    `/api/user/${query.userId}/board/${query.boardId}/post/${query.postId}`
  );
  const router = useRouter();
  const { loggedInUser } = useUser();
  const [edit, setEdit] = useState(false);
  const [del, setDelete] = useState(false);
  const isMyPost = Boolean(loggedInUser?.id === query.userId);
  const [deletePost, { data: DelPostData, loading: DelLoading }] =
    useMutation<IData>(
      `/api/user/${query.userId}/board/${query.boardId}/post/${query.postId}/delete`
    );
  const clickDelPost = () => {
    if (!isMyPost) alert('삭제권한이 없습니다.');
    deletePost({});
  };
  useEffect(() => {
    if (DelPostData?.error) alert(DelPostData.error);
    if (DelPostData?.ok) alert('포스트가 삭제되었습니다.');
  }, [DelPostData, router]);
  return (
    <>
      <Cont isAvatar={Boolean(data?.post?.avatar)}>
        <Avatar id="postAvatar" avatar={data?.post?.avatar!} disabled />
        <Info
          query={query}
          post={data?.post!}
          setModal={setModal}
          setEdit={setEdit}
          setDelete={setDelete}
        />
        {edit && (
          <>
            <EditPost
              query={query}
              setEdit={setEdit}
              title={data?.post?.title!}
              content={data?.post?.content!}
              postAvatar={data?.post?.avatar!}
            />
            <DimBackground
              zIndex={102}
              className="dim"
              onClick={() => setEdit(false)}
            />
          </>
        )}
      </Cont>
      {del && (
        <ConfirmModal
          type="delete-post"
          loading={DelLoading}
          closeModal={setDelete}
          clickDelPost={clickDelPost}
        />
      )}
      <DimBackground zIndex={99} onClick={() => setModal(false)} />
    </>
  );
};
const Cont = styled(Modal)<{ isAvatar: boolean }>`
  gap: 0;
  padding: 0;
  z-index: 102;
  width: 80vw;
  height: 90vh;
  display: flex;
  overflow: hidden;
  min-width: 1200px;
  border-radius: 8px;
  flex-direction: row;
  border: ${(p) => !p.isAvatar && p.theme.border.thick};
  border: none;
  .postAvatar {
    pointer-events: none;
    .noImageDiv,
    .isImageTag {
      width: 45vw;
      height: 90vh;
      min-width: 680px;
      min-height: 600px;
      border-right: ${(p) => p.theme.border.thick};
    }
  }
  .read-post-info {
    width: 35vw;
    height: 90vh;
    min-width: 520px;
    min-height: 300px;
  }
`;
