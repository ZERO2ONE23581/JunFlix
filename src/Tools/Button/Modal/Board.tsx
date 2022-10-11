import styled from '@emotion/styled';
import { Btn } from '..';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DimBackground, Modal } from '../../../../styles/global';
import { ConfirmModal } from '../../Modal/confirm';
import { useRouter } from 'next/router';
import useUser from '../../../libs/client/useUser';
import useMutation from '../../../libs/client/useMutation';
import { useForm } from 'react-hook-form';
import { IUserForm } from '../../../types/user';
import { IData } from '../../../types/global';
import { ModalBtnCont } from './Post';

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
  const [deleteBoard, { data, loading }] = useMutation<IData>(
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
      router.push('/boards');
    }
  }, [data, router]);

  return (
    <>
      {modal && (
        <>
          <ModalBtnCont>
            <Btn
              type="button"
              name="보드 수정 (Edit Board)"
              onClick={() => handleClick('edit-board')}
              svg={{ type: 'edit', size: '1.4rem', location: { left: true } }}
            />
            <Btn
              type="button"
              name="배경 수정 (Edit Background)"
              onClick={() => handleClick('edit-background')}
              svg={{
                type: 'landscape',
                size: '1.4rem',
                location: { left: true },
              }}
            />
            <Btn
              type="button"
              name="보드 삭제 (Delete Board)"
              onClick={() => handleClick('delete-board')}
              svg={{ type: 'trash', size: '1.4rem', location: { left: true } }}
            />
          </ModalBtnCont>
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
