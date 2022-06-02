import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ICreateCommentsRes } from '..';
import useMutation from '../../../../libs/client/useMutation';

interface IDeletePostCommentsProps {
  userId?: string | string[];
  boardId?: string | string[];
  postId?: string | string[];
  commentId: any;
  openDelModal: any;
}

export const DeletePostComments = ({
  userId,
  boardId,
  postId,
  commentId,
  setCommentId,
  openDelete,
  setOpenDelete,
}: any) => {
  const router = useRouter();
  const [deleteComment, { data, loading }] = useMutation<ICreateCommentsRes>(
    `/api/user/${userId}/board/${boardId}/post/${postId}/comments/delete`
  );
  const clickCancelBtn = () => {
    setOpenDelete(false);
    setCommentId(0);
  };
  useEffect(() => {
    if (data?.ok) {
      router.reload();
    }
  }, [router, data]);
  return (
    <>
      {openDelete && (
        <>
          <DelModal>
            {loading ? (
              <span>Loading...</span>
            ) : (
              <>
                <div>정말로 삭제하시겠습니까?</div>
                <div>
                  <button onClick={() => deleteComment(commentId)}>yes</button>
                  <button onClick={clickCancelBtn}>No</button>
                </div>
              </>
            )}
          </DelModal>
          <BgDisabled />
        </>
      )}
    </>
  );
};
const DelModal = styled.article`
  border: 3px solid red;
  width: 300px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
`;
const BgDisabled = styled.article`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;
