import { Btn } from '../../Btn';
import { useEffect, useState } from 'react';
import { Input } from '../../Input';
import { useForm } from 'react-hook-form';
import useUser from '../../../libs/client/loggedInUser';
import useMutation from '../../../libs/client/useMutation';
import { ErrMsg, Form, OkMsg } from '../../../../styles/components/default';
import styled from '@emotion/styled';

interface IEditAvatarForm {
  avatar?: FileList;
}
interface IEditAvatarRes {
  ok: boolean;
  error?: string;
}

export const Edit_Avatar = () => {
  const { loggedInUser, loggedInUserId } = useUser();
  const [uploadAvatar, { loading, data }] = useMutation<IEditAvatarRes>(
    `/api/user/${loggedInUserId}/edit/profile/avatar`
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    watch,
  } = useForm<IEditAvatarForm>({ mode: 'onSubmit' });
  const avatar = watch('avatar');

  const onValid = async ({ avatar }: IEditAvatarForm) => {
    if (avatar && avatar.length > 0) {
      //1. Get empty url from cf
      const emptyUrl = await (await fetch(`/api/files`)).json();
      console.log(emptyUrl);
      //2. upload file to cf
      return;
      //uploadAvatar(avatarUrl);
    }
  };
  const [avatarPreview, setAvatarPreview] = useState('');

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar, watch]);
  //
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <>
        {avatarPreview ? (
          <Avatar src={avatarPreview} alt="프로필 사진 프리뷰" />
        ) : (
          <Avatar src={`/img/profile.svg`} alt="프로필 사진 프리뷰" />
        )}
      </>

      <Input
        type="file"
        name="avatar"
        label="Profile Image"
        register={register('avatar')}
        errMsg={errors.avatar?.message}
      />
      <Btn type="submit" loading={loading} btnName="SAVE" />
    </Form>
  );
};
const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  border: ${(p) => p.theme.border};
`;
const NoAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  border: ${(p) => p.theme.border};
  background: url('/img/profile.svg') center / contain no-repeat;
`;
