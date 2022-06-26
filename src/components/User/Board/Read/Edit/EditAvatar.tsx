import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useMutation from '../../../../../libs/client/useMutation';
import { IBoardForm } from '../../../../../types/board';
import { MutationRes } from '../../../../../types/mutation';
import { Btn } from '../../../../Style/Button';
import { Svg } from '../../../../Style/Svg/Svg';
import { UpdateBG } from './UpdateBG';

interface IEditAvatarProps {
  setPreview: Dispatch<SetStateAction<string>>;
}
export const EditAvatar = ({ setPreview }: IEditAvatarProps) => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const { watch, register, handleSubmit } = useForm<IBoardForm>();
  const [EditAvatar, { data, loading }] = useMutation<MutationRes>(
    `/api/user/${user_id}/board/${board_id}/edit/avatar`
  );
  const onValid = async ({ avatar }: IBoardForm) => {
    if (loading) return;
    setAvatarLoading((p) => !p);
    if (avatar && avatar.length > 0) {
      const { uploadURL } = await (await fetch(`/api/file`)).json();
      const form = new FormData();
      form.append('file', avatar[0]);
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
  const avatar = watch('avatar');
  const [avatarLoading, setAvatarLoading] = useState(false);
  const Loading = avatarLoading ? avatarLoading : loading ? loading : null;
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
    if (data?.ok) {
      router.reload();
    }
  }, [data, avatar, router]);
  const isWatch = Boolean(avatar && avatar.length > 0);
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <Avatar isWatch={isWatch}>
          <label htmlFor="avatar">
            <Svg type="edit" />
          </label>
          <input
            {...register('avatar')}
            id="avatar"
            type="file"
            name="avatar"
            accept="image/*"
          />
          {isWatch && <Btn type="submit" name="SAVE" />}
        </Avatar>
      </form>
      {Loading && <UpdateBG loading={Loading} />}
    </>
  );
};
const Avatar = styled.article<{ isWatch: boolean }>`
  bottom: 20%;
  right: 6%;
  position: absolute;
  gap: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  button {
    font-size: 0.9rem;
    width: 50px;
    height: 40px;
  }
  label {
    svg {
      width: 35px;
      height: 35px;
      fill: ${(p) => (p.isWatch ? p.theme.color.logo : 'white')};
    }
  }
  input {
    display: none;
  }
`;
