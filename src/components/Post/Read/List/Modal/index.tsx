import useSWR from 'swr';
import { Info } from './Info';
import styled from '@emotion/styled';
import { Avatar } from '../../../../Avatar';
import { EditPost } from '../../../Edit/EditPost';
import { DeleteModal } from '../../../Delete/Modal';
import { Dispatch, SetStateAction, useState } from 'react';
import { IGetPost, IPostCmtQuery } from '../../../../../types/post';
import { Modal, DimBackground } from '../../../../../../styles/global';

interface IPostModal extends IPostCmtQuery {
  setReadPost: Dispatch<SetStateAction<boolean>>;
}
export const PostModal = ({
  userId,
  postId,
  boardId,
  setReadPost,
}: IPostModal) => {
  const { data } = useSWR<IGetPost>(
    `/api/user/${userId}/board/${boardId}/post/${postId}`
  );
  const [editPost, setEditPost] = useState(false);
  const [deletePost, setDeletePost] = useState(false);
  return (
    <>
      <Cont>
        <Avatar disabled id="postAvatar" avatar={data?.post?.avatar!} />
        <Info
          userId={userId}
          postId={postId}
          boardId={boardId}
          setReadPost={setReadPost}
          setEditPost={setEditPost}
          setDeletePost={setDeletePost}
          title={data?.post?.title!}
          content={data?.post?.content!}
          createdAt={data?.post?.createdAt!}
          postAvatar={data?.post?.avatar!}
          userAvatar={data?.post?.user?.avatar!}
          username={data?.post?.user?.username!}
        />
      </Cont>

      {editPost && (
        <EditPost
          userId={userId}
          postId={postId}
          boardId={boardId}
          setEditPost={setEditPost}
          title={data?.post?.title!}
          content={data?.post?.content!}
          postAvatar={data?.post?.avatar!}
        />
      )}
      {deletePost && (
        <DeleteModal
          postId={postId}
          userId={userId}
          boardId={boardId}
          setDeletePost={setDeletePost}
        />
      )}
      <DimBackground zIndex={99} onClick={() => setReadPost(false)} />
    </>
  );
};
const Cont = styled(Modal)`
  gap: 0;
  padding: 0;
  z-index: 102;
  width: 80vw;
  height: 90vh;
  display: flex;
  overflow: hidden;
  min-width: 1200px;
  flex-direction: row;
  border-radius: 8px;
  .postAvatar {
    pointer-events: none;
    .noImageCont,
    .isImageCont {
      width: 45vw;
      height: 90vh;
      min-width: 680px;
      min-height: 670px;
    }
  }
  .read-post-info {
    width: 35vw;
    height: 90vh;
    min-width: 520px;
    min-height: 300px;
  }
`;
