import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useMutation from '../../../../libs/client/useMutation';
import { ICreateCommentsRes } from '../../../../types/comments';

export const DeletePostComments = ({
  userId,
  boardId,
  postId,
  comment_id,
  setComment_id,
  openDelModal,
  setOpenDelModal,
}: any) => {
  const router = useRouter();
  const [deleteComment, { data, loading }] = useMutation<ICreateCommentsRes>(
    `/api/user/${userId}/board/${boardId}/post/${postId}/comments/delete`
  );
  const clickCancelBtn = () => {
    setComment_id(0);
    setOpenDelModal(false);
  };
  useEffect(() => {
    if (data?.ok) {
      router.reload();
    }
  }, [router, data]);
  //
  return (
    <>
      {openDelModal && (
        <DelModal>
          {loading ? (
            <span>Loading...</span>
          ) : (
            <>
              <div>정말로 삭제하시겠습니까?</div>
              <div>
                <button onClick={() => deleteComment(comment_id)}>yes</button>
                <button onClick={clickCancelBtn}>No</button>
              </div>
            </>
          )}
        </DelModal>
      )}
    </>
  );
};
const DelModal = styled.article`
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
