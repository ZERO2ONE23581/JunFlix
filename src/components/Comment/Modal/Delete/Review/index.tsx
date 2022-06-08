import { ModalCont } from '../../../../../../styles/modal';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useMutation from '../../../../../libs/client/useMutation';
import styled from '@emotion/styled';
import { Btn } from '../../../../../../styles/btn';
import { ICommentRes } from '../../../../../types/comments';

export const PostCommentDeleteModal = ({
  id,
  setSaveId,
  setOpenDelete,
}: any) => {
  const router = useRouter();
  const { user_id, board_id, post_id } = router.query;
  const [deleteComment, { loading, data }] = useMutation<ICommentRes>(
    `/api/user/${user_id}/board/${board_id}/post/${post_id}/comment/${id}/delete`
  );
  const clickCancel = () => {
    setSaveId(0);
    setOpenDelete(false);
  };
  //
  useEffect(() => {
    if (data?.ok) {
      router.reload();
    }
  }, [router, data]);
  //
  return (
    <>
      <Cont>
        <h1>정말로 삭제하시겠습니까?</h1>
        <p>삭제시 복구가 불가능 합니다.</p>
        <BtnWrap>
          <Button onClick={() => deleteComment({})}>
            {loading ? 'Loading...' : 'Delete'}
          </Button>
          <Button onClick={clickCancel}>Back</Button>
        </BtnWrap>
      </Cont>
    </>
  );
};
const Cont = styled(ModalCont)`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 150px;
`;
const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Button = styled(Btn)`
  width: 65px;
  height: 30px;
`;
