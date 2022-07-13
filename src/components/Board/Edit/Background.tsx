import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../Style/Button';
import { Svg } from '../../Style/Svg/Svg';
import { useForm } from 'react-hook-form';
import { IBoardForm } from '../../../types/board';
import { LoadingModal } from '../../LoadingModal';
import { MutationRes } from '../../../types/mutation';
import useMutation from '../../../libs/client/useMutation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IEditAvatarProps {
  setBoardPreview: Dispatch<SetStateAction<string>>;
}
export const EditBackground = ({ setBoardPreview }: IEditAvatarProps) => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const { watch, register, handleSubmit } = useForm<IBoardForm>();
  const [EditAvatar, { data, loading }] = useMutation<MutationRes>(
    `/api/user/${user_id}/board/${board_id}/edit/avatar`
  );
  const onValid = async ({ boardAvatar }: IBoardForm) => {
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
      return EditAvatar({ avatar: id });
    }
  };
  const BoardAvatar = watch('boardAvatar');
  const [avatarLoading, setAvatarLoading] = useState(false);
  const Loading = avatarLoading ? avatarLoading : loading ? loading : null;
  useEffect(() => {
    if (BoardAvatar && BoardAvatar.length > 0) {
      const file = BoardAvatar[0];
      setBoardPreview(URL.createObjectURL(file));
    }
    if (data?.ok) {
      router.reload();
    }
  }, [data, BoardAvatar, router]);
  const isWatch = Boolean(BoardAvatar && BoardAvatar.length > 0);
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <Cont isWatch={isWatch}>
          <label htmlFor="boardAvatar">
            <Svg type="landscape" size="2.5rem" />
          </label>
          <input
            {...register('boardAvatar')}
            id="boardAvatar"
            type="file"
            name="boardAvatar"
            accept="image/*"
          />
          {isWatch && (
            <>
              <Btn type="submit" name="저장" />
              <Btn type="button" name="취소" onClick={() => router.reload()} />
            </>
          )}
        </Cont>
      </form>

      {Loading && (
        <LoadingModal
          text={{ kor: '보드배경 저장중...', eng: 'Saving Background...' }}
        />
      )}
    </>
  );
};
const Cont = styled.article<{ isWatch: boolean }>`
  gap: 12px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  button {
    font-size: 0.9rem;
    width: 55px;
    height: 30px;
  }
  input {
    display: none;
  }
`;
