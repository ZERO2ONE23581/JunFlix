import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../../Style/Button';
import useUser from '../../../../libs/client/useUser';
import { Modal } from '../../../../../styles/global';
import useMutation from '../../../../libs/client/useMutation';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface IDeleteBoardModalProps {
  closeModal: Dispatch<SetStateAction<boolean>>;
}
export const DeleteBoardModal = ({ closeModal }: IDeleteBoardModalProps) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const { user_id, board_id } = router.query;
  const isMyBoard = Boolean(String(loggedInUser?.id) === user_id);
  const [DeleteBoard, { data, loading }] = useMutation(
    `/api/user/${user_id}/board/${board_id}/delete`
  );
  const clickConfirm = () => {
    if (!isMyBoard) alert('권한이 없습니다.');
    if (loading) return;
    DeleteBoard({});
  };
  useEffect(() => {
    if (data?.ok) {
      alert('보드가 삭제되었습니다.');
      router.push('/user/all/boards');
    }
  }, [data, router]);
  return (
    <Cont>
      <h1>보드를 삭제할 경우에는 복구가 불가능합니다.</h1>
      <h2>삭제하시겠습니까?</h2>
      <div className="btn-wrap">
        <Btn
          name="YES"
          type="button"
          loading={loading}
          onClick={clickConfirm}
        />
        <Btn name="NO" type="button" onClick={() => closeModal(false)} />
      </div>
    </Cont>
  );
};
const Cont = styled(Modal)`
  width: 200px;
  gap: 0px;
  h2 {
    color: ${(p) => p.theme.color.logo};
  }
`;
