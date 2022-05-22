import {
  ModalClose,
  SmallModalCont,
} from '../../../../../../styles/components/modal';
import { useEffect } from 'react';
import { Btn } from '../../../../Btn';
import { useRouter } from 'next/router';
import useMutation from '../../../../../libs/client/useMutation';
import { MutationRes } from '../../../../../types/mutation';
import { ErrMsg } from '../../../../../../styles/components/default';

interface IDeleteModalProps {
  userId?: string[] | string;
  postId?: string[] | string;
  boardId?: string[] | string;
  deleteClick?: any;
}

export const DeleteModal = ({
  userId,
  postId,
  boardId,
  deleteClick,
}: IDeleteModalProps) => {
  const router = useRouter();

  //Post
  const [deleteBoard, { data: boardData, loading: boardLoading }] =
    useMutation<MutationRes>(`/api/user/${userId}/board/${boardId}/delete`);
  const [deletePost, { data: postData, loading: postLoading }] =
    useMutation<MutationRes>(
      `/api/user/${userId}/board/${boardId}/post/${postId}/delete`
    );
  const onClick = () => {
    if (postId) {
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
      router.replace(`/user/${userId}/board/${boardId}`);
    }
  }, [boardData, postData, router]);

  return (
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
          loading={postId ? postLoading : boardLoading}
        />
      </SmallModalCont>
      <ModalClose onClick={deleteClick} />
    </>
  );
};
