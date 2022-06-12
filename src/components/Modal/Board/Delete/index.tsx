import { ModalClose, SmallModalCont } from '../../../../../styles/modal';
import { useEffect } from 'react';
import { Btn } from '../../../Button';
import { useRouter } from 'next/router';
import useMutation from '../../../../libs/client/useMutation';
import { MutationRes } from '../../../../types/mutation';
import { ErrMsg } from '../../../../../styles/default';

interface IDeleteModalProps {
  deleteClick?: any;
  delModal?: boolean;
}

export const DeleteModal = ({ deleteClick, delModal }: IDeleteModalProps) => {
  const router = useRouter();
  const { user_id, board_id, post_id, review_id } = router.query;
  //
  const [deleteBoard, { data: boardData, loading: boardLoading }] =
    useMutation<MutationRes>(`/api/user/${user_id}/board/${board_id}/delete`);
  const [deletePost, { data: postData, loading: postLoading }] =
    useMutation<MutationRes>(
      `/api/user/${user_id}/board/${board_id}/post/${post_id}/delete`
    );
  const [deleteReview, { data: reviewData, loading: reviewLoading }] =
    useMutation<MutationRes>(`/api/user/${user_id}/review/${review_id}/delete`);
  //
  const onClick = () => {
    if (review_id) {
      if (reviewLoading) return;
      return deleteReview({});
    }
    if (post_id) {
      if (postLoading) return;
      return deletePost(true);
    }
    if (boardLoading) return;
    return deleteBoard(true);
  };
  //
  useEffect(() => {
    if (boardData?.ok) {
      alert('보드가 삭제되었습니다.');
      router.replace(`/`);
    }
    if (postData?.ok) {
      alert('해당 게시물이 삭제되었습니다.');
      router.replace(`/user/${user_id}/board/${board_id}`);
    }
    if (reviewData?.ok) {
      alert('해당 리뷰가 삭제되었습니다.');
      router.replace(`/all/reviews`);
    }
  }, [boardData, postData, reviewData, router]);

  return (
    <>
      {delModal && (
        <>
          <SmallModalCont>
            {boardData?.error && <ErrMsg>{boardData?.error}</ErrMsg>}
            {postData?.error && <ErrMsg>{postData?.error}</ErrMsg>}
            <h1>정말로 삭제하시겠습니까?</h1>
            <p>삭제시 복구가 불가능 합니다.</p>
            <Btn
              type="delete"
              btnName="삭제 확인"
              onClick={onClick}
              loading={
                post_id ? postLoading : board_id ? boardLoading : reviewLoading
              }
            />
          </SmallModalCont>
          <ModalClose onClick={deleteClick} />
        </>
      )}
    </>
  );
};
