import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { SaveModal } from '../../../Tools/Modal/Save';
import { DelModal } from '../../../Tools/Modal/delete';
import { Svg } from '../../../Tools/Svg';
import { IBoardForm } from '../../../../types/board';
import { MutationRes } from '../../../../types/mutation';
import useMutation from '../../../../libs/client/useMutation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IAvatarForm {
  delModal: boolean;
  saveModal: boolean;
  setPreview: Dispatch<SetStateAction<string>>;
  setDelModal: Dispatch<SetStateAction<boolean>>;
  setAvatar: Dispatch<SetStateAction<boolean>>;
  setIsClicked: Dispatch<SetStateAction<boolean>>;
  setSaveModal: Dispatch<SetStateAction<boolean>>;
}
export const AvatarForm = ({
  delModal,
  saveModal,
  setAvatar,
  setDelModal,
  setSaveModal,
  setPreview,
  setIsClicked,
}: IAvatarForm) => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const [edit, { data, loading }] = useMutation<MutationRes>(
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
      setIsClicked(isWatch);
    }
  }, [BoardAvatar, setPreview, setIsClicked, isWatch]);

  const onValid = async ({ boardAvatar }: IBoardForm) => {
    if (delAvatar) return edit({ avatar: '' });

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
  const [delAvatar, setDelAvatar] = useState(false);
  useEffect(() => {
    if (data?.ok) {
      setAvatar(false);
      if (data.avatar === '') {
        setPreview('');
        alert('????????? ??????????????????.');
      } else {
        alert('????????? ??????????????????.');
      }
    }
  }, [data, setAvatar]);

  return (
    <>
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
          <SaveModal Loading={Loading} setSaveModal={setSaveModal} />
        )}
        {delModal && (
          <DelModal
            Loading={Loading}
            setDelModal={setDelModal}
            setDelAvatar={setDelAvatar}
          />
        )}
      </Cont>
    </>
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
