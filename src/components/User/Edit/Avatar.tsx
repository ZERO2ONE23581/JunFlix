import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, OkMsg } from '../../../../styles/default';
import useAvatar from '../../../libs/client/useAvatar';
import useMutation from '../../../libs/client/useMutation';
import useUser from '../../../libs/client/useUser';
import { Btn } from '../../Button';
import { Input } from '../../Input';

interface IEditAvatarForm {
  avatar?: FileList;
}
interface IEditAvatarRes {
  ok: boolean;
  error?: string;
}

export const Edit_Avatar = () => {
  const { loggedInUser } = useUser();
  const [uploadAvatar, { loading, data }] = useMutation<IEditAvatarRes>(
    `/api/user/${loggedInUser?.id}/edit/avatar`
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IEditAvatarForm>({ mode: 'onSubmit' });
  const avatar = watch('avatar');
  const onValid = async ({ avatar }: IEditAvatarForm) => {
    if (avatar && avatar.length > 0 && loggedInUser?.id) {
      //1. Get empty url from cf
      const { uploadURL } = await (await fetch(`/api/file`)).json();

      //2. upload file to cf
      const form = new FormData();
      form.append('file', avatar[0], loggedInUser?.id.toString());
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form,
        })
      ).json();
      uploadAvatar({ avatar: id });
    }
  };
  //Preview
  const [avatarPreview, setAvatarPreview] = useState('');
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
    if (data?.ok) {
      if (data?.ok) {
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    }
  }, [avatar, watch, data]);
  //
  return (
    <>
      <Form onSubmit={handleSubmit(onValid)}>
        {data?.ok && <OkMsg>프로필 사진을 업데이트 합니다.</OkMsg>}
        <>
          {avatarPreview ? (
            <Avatar url={avatarPreview} />
          ) : loggedInUser?.avatar ? (
            <Avatar url={useAvatar(loggedInUser.avatar)} />
          ) : (
            <Avatar url={`/img/profile.svg`} />
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
    </>
  );
};

const Avatar = styled.div<{ url: string }>`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  overflow: hidden;
  border: ${(p) => p.theme.border};
  background: ${(p) => `url(${p.url}) center / cover no-repeat`};
`;
