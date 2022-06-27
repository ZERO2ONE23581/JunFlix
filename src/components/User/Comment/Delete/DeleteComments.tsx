import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../../Style/Button';
import { Modal, ModalClose } from '../../../../../styles/global';
import { ICommentRes } from '../../../../types/comments';
import useMutation from '../../../../libs/client/useMutation';

interface IDeleteCommentModalProps {
  type: string | null;
  id?: number | null;
  setSaveId?: any;
  setOpenDelModal: any;
}

export const DeleteComments = ({
  type,
  id,
  setSaveId,
  setOpenDelModal,
}: IDeleteCommentModalProps) => {
  const router = useRouter();
  const { user_id, board_id, post_id, review_id } = router.query;
  const [DeletePostCmt, { loading: PostLoading, data: PostData }] =
    useMutation<ICommentRes>(
      `/api/user/${user_id}/board/${board_id}/post/${post_id}/comment/${id}/delete`
    );
  const [DeleteReviewCmt, { loading: ReviewLoading, data: ReviewData }] =
    useMutation<ICommentRes>(
      `/api/user/${user_id}/review/${review_id}/comment/${id}/delete`
    );
  const clickCancel = () => {
    setSaveId(0);
    setOpenDelModal(false);
  };
  const IsDataOk = Boolean(PostData?.ok || ReviewData?.ok);
  useEffect(() => {
    if (IsDataOk) return router.reload();
  }, [router, IsDataOk]);
  //
  return (
    <>
      <Modal>
        <h1>정말로 삭제하시겠습니까?</h1>
        <p>삭제시 복구가 불가능 합니다.</p>
        <BtnWrap>
          {type === 'post' && (
            <Btn
              type="button"
              name="Delete"
              loading={PostLoading}
              onClick={() => DeletePostCmt({})}
            />
          )}
          {type === 'review' && (
            <Btn
              type="button"
              name="Delete"
              loading={ReviewLoading}
              onClick={() => DeleteReviewCmt({})}
            />
          )}
          <Btn type="button" name="Cancel" onClick={clickCancel} />
        </BtnWrap>
      </Modal>
      <ModalClose />
    </>
  );
};
const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
