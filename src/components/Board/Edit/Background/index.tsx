import styled from '@emotion/styled';
import { BtnWrap } from './Edit/Btns';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Svg } from '../../../Style/Svg/Svg';
import { DelModal } from './DelModal';
import { LoadingModal } from '../../../LoadingModal';
import { IBoardForm } from '../../../../types/board';
import { MutationRes } from '../../../../types/mutation';
import { EditModal } from './Edit/EditModal';
import useMutation from '../../../../libs/client/useMutation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IEditBackground {
  setPreview: Dispatch<SetStateAction<string>>;
  setEditBg: Dispatch<SetStateAction<boolean>>;
}
interface IEditBgRes extends MutationRes {
  avatar?: string;
}
export const EditBackground = ({ setPreview, setEditBg }: IEditBackground) => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const { watch, register, handleSubmit } = useForm<IBoardForm>();

  const BoardAvatar = watch('boardAvatar');
  const [avatarLoading, setAvatarLoading] = useState(false);
  const isWatch = Boolean(BoardAvatar && BoardAvatar.length > 0);
  useEffect(() => {
    if (BoardAvatar && BoardAvatar.length > 0) {
      const file = BoardAvatar[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [BoardAvatar, setPreview]);

  const [deleteBg, setDeleteBG] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDelModal, setOpenDelModal] = useState(false);
  const [edit, { data, loading }] = useMutation<IEditBgRes>(
    `/api/user/${user_id}/board/${board_id}/edit/avatar`
  );
  const onValid = async ({ boardAvatar }: IBoardForm) => {
    setOpenModal(false);
    setOpenDelModal(false);
    if (deleteBg) return edit({ avatar: '' });
    if (loading) return;
    setAvatarLoading((p) => !p);
    if (boardAvatar && boardAvatar.length > 0) {
      const { uploadURL } = await (await fetch(`/api/file`)).json();
      const form = new FormData();
      form.append('file', boardAvatar[0]);
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form,
        })
      ).json();
      setAvatarLoading((p) => !p);
      return edit({ avatar: id });
    }
  };
  useEffect(() => {
    if (data?.ok) {
      setEditBg(false);
      if (data.avatar === '') {
        setPreview('');
        alert('배경을 삭제했습니다.');
      } else {
        alert('배경을 수정했습니다.');
      }
    }
  }, [data, setEditBg, openModal, openDelModal]);
  const Loading = avatarLoading ? avatarLoading : loading ? loading : null;
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <Cont>
          <label htmlFor="boardAvatar">
            <Svg type="file-upload" size="2rem" />
          </label>
          <input
            {...register('boardAvatar')}
            id="boardAvatar"
            type="file"
            name="boardAvatar"
            accept="image/*"
          />
          {openModal && <EditModal setOpenModal={setOpenModal} />}
          {openDelModal && (
            <DelModal
              setDeleteBG={setDeleteBG}
              setOpenDelModal={setOpenDelModal}
            />
          )}
          <BtnWrap
            isWatch={isWatch}
            setOpenModal={setOpenModal}
            setOpenDelModal={setOpenDelModal}
          />
        </Cont>
      </form>
      {Loading && (
        <LoadingModal
          zIndex={100}
          text={{ kor: '보드배경 저장중...', eng: 'Saving Background...' }}
        />
      )}
    </>
  );
};
const Cont = styled.article`
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    display: none;
  }
`;
