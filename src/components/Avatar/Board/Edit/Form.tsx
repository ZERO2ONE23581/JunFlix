import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useMutation from '../../../../libs/client/useMutation';
import { IData } from '../../../../types/global';
import { IBoardForm } from '../../../../types/board';
import { Svg } from '../../../../Tools/Svg';
import { ConfirmModal } from '../../../../Tools/Modal';

interface IAvatarForm {
  delModal: boolean;
  saveModal: boolean;
  setPreview: Dispatch<SetStateAction<string>>;
  setDelModal: Dispatch<SetStateAction<boolean>>;
  setAvatar: Dispatch<SetStateAction<boolean>>;
  setisclicked: Dispatch<SetStateAction<boolean>>;
  setSaveModal: Dispatch<SetStateAction<boolean>>;
}
export const EditBoardAvatarForm = ({
  delModal,
  saveModal,
  setAvatar,
  setDelModal,
  setSaveModal,
  setPreview,
  setisclicked,
}: IAvatarForm) => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const [edit, { data, loading }] = useMutation<IData>(
    `/api/user/${user_id}/board/${board_id}/edit/avatar`
  );
  const { watch, register, handleSubmit } = useForm<IBoardForm>();
  const BoardAvatar = watch('boardAvatar');
  const [avatarLoading, setAvatarLoading] = useState(false);
  const isWatch = Boolean(BoardAvatar && BoardAvatar.length > 0);

  useEffect(() => {
    if (BoardAvatar && BoardAvatar.length > 0) {
      const file = BoardAvatar[0];
      setPreview(URL.createObjectURL(file));
      setisclicked(isWatch);
    }
  }, [BoardAvatar, setPreview, setisclicked, isWatch]);

  const onValid = async ({ boardAvatar }: IBoardForm) => {
    if (delModal) return edit({ avatar: '' });
    if (loading) return;
    if (boardAvatar && boardAvatar.length > 0) {
      setAvatarLoading((p) => !p);
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
      edit({ avatar: id });
      setAvatarLoading((p) => !p);
    }
  };
  const Loading = avatarLoading ? avatarLoading : loading ? loading : false;
  useEffect(() => {
    if (data?.ok) {
      setAvatar(false);
      if (data.avatar === '') {
        setPreview('');
        alert('배경을 삭제했습니다.');
      } else {
        alert('배경을 수정했습니다.');
      }
    }
  }, [data, setAvatar]);

  return (
    <Cont isWatch={isWatch} onSubmit={handleSubmit(onValid)}>
      <label htmlFor="boardAvatar">
        <Svg type="landscape" size="2.2rem" />
      </label>
      <input
        {...register!('boardAvatar')}
        type="file"
        accept="image/*"
        id="boardAvatar"
        name="boardAvatar"
      />
      {saveModal && (
        <ConfirmModal
          loading={Loading}
          closeModal={setSaveModal}
          type="update-board-avatar"
        />
      )}
      {delModal && (
        <ConfirmModal
          loading={Loading}
          type="delete-board-avatar"
          closeModal={setDelModal}
        />
      )}
    </Cont>
  );
};
const Cont = styled.form<{ isWatch: boolean }>`
  label {
    svg {
      fill: ${(p) => p.isWatch && p.theme.color.logo};
    }
  }
  input {
    display: none;
  }
`;
