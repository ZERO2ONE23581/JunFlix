import styled from '@emotion/styled';
import { Btn } from '../../Button';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DimBackground, Modal } from '../../../../../styles/global';
import { ConfirmModal } from '..';
import { useRouter } from 'next/router';
import useUser from '../../../../libs/client/useUser';
import useMutation from '../../../../libs/client/useMutation';
import { MutationRes } from '../../../../types/mutation';
import { useForm } from 'react-hook-form';
import { IUserForm } from '../../../../types/user';

interface IEditBtns {
  modal: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setModal: Dispatch<SetStateAction<boolean>>;
  setAvatar: Dispatch<SetStateAction<boolean>>;
}
export const ModalBtn = ({
  modal,
  setModal,
  setEdit,
  setAvatar,
}: IEditBtns) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const { user_id, board_id } = router.query;
  const [confirm, setConfirm] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const isMyBoard = Boolean(loggedInUser?.id === Number(user_id));

  const handleClick = (type: string) => {
    if (!isMyBoard) return alert('수정권한이 없습니다.');
    setModal(false);
    if (type === 'edit-board') return setEdit(true);
    if (type === 'delete-board') return setDelModal(true);
    if (type === 'edit-background') return setAvatar(true);
  };
  const [deleteBoard, { data, loading }] = useMutation<MutationRes>(
    `/api/user/${user_id}/board/${board_id}/delete`
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: 'onSubmit' });
  const onValid = async ({ userId }: IUserForm) => {
    if (loading) return;
    return deleteBoard({ userId });
  };

  useEffect(() => {
    if (data?.error) alert(data.error);
    if (data?.ok) {
      alert('보드를 삭제했습니다.');
      router.push('/all/boards');
    }
  }, [data, router]);

  return (
    <>
      {modal && (
        <>
          <Cont>
            <Btn
              type="button"
              name="보드 수정하기"
              onClick={() => handleClick('edit-board')}
            />
            <Btn
              type="button"
              name="보드 배경수정하기"
              onClick={() => handleClick('edit-background')}
            />
            <Btn
              type="button"
              name="보드 삭제하기"
              onClick={() => handleClick('delete-board')}
            />
          </Cont>
          <DimBackground zIndex={100} onClick={() => setModal(false)} />
        </>
      )}

      {delModal && (
        <ConfirmModal
          type="delete-board"
          register={register}
          setConfirm={setConfirm}
          closeModal={setDelModal}
        />
      )}
      <form onSubmit={handleSubmit(onValid)}>
        {confirm && (
          <ConfirmModal
            errors={errors}
            loading={loading}
            register={register}
            closeModal={setConfirm}
            type="confirm-delete-board"
          />
        )}
      </form>
    </>
  );
};
const Cont = styled(Modal)`
  z-index: 201;
  width: 40vw;
  gap: 0;
  padding: 0;
  border: none;
  overflow: hidden;
  border-radius: 5px;
  background-color: transparent;
  button {
    width: 100%;
    border-radius: 0%;
    border-bottom: 1px solid #2d3436;
    :nth-of-type(3) {
      border: none;
    }
  }
`;
