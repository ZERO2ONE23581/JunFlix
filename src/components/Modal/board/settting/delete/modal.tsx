import {
  ModalClose,
  SmallModalCont,
} from '../../../../../../styles/components/modal';
import { useEffect } from 'react';
import { Btn } from '../../../../Btn';
import { useRouter } from 'next/router';
import useMutation from '../../../../../libs/client/useMutation';
import { PostResponse } from '../../../../../types/postResponse';

export const DeleteBoardModal = ({ boardId, deleteClick }: any) => {
  const router = useRouter();
  //Post
  const [deleteBoard, { data, loading }] = useMutation<PostResponse>(
    `/api/board/${Number(boardId)}/delete`
  );
  const onClick = () => {
    if (loading) return;
    deleteBoard(true);
  };
  //
  useEffect(() => {
    if (data?.ok) {
      alert('보드가 삭제되었습니다.');
      router.replace('/');
    }
  }, [data, router]);

  return (
    <>
      <SmallModalCont>
        <h1>정말로 삭제하시겠습니까?</h1>
        <p>삭제시 복구가 불가능 합니다.</p>
        <Btn
          onClick={onClick}
          type="delete"
          btnName="삭제 확인"
          loading={loading}
        />
      </SmallModalCont>
      <ModalClose onClick={deleteClick} />
    </>
  );
};
