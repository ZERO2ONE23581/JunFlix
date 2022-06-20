import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../Style/Button';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { ErrorMsg } from '../../Style/ErrMsg';
import { ProfileAvatar } from '../Avatar/Profile';
import { MutationRes } from '../../../types/mutation';
import { IEditProfileProps } from '../../../types/user';
import useMutation from '../../../libs/client/useMutation';
import { IProfileAvatarForm } from '../../../types/avatar';
import { Form, FormCont } from '../../../../styles/global';

export const EditProfileAvatar = ({ user }: IEditProfileProps) => {
  const router = useRouter();
  const [editAvatar, { loading, data }] = useMutation<MutationRes>(
    `/api/user/${user?.id}/edit/avatar`
  );
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileAvatarForm>({
    mode: 'onSubmit',
  });
  const avatar = watch('avatar');
  const onValid = async ({ avatar }: IProfileAvatarForm) => {
    if (loading) return;
    setAvatarLoading((p) => !p);
    if (avatar && avatar.length > 0 && user?.id) {
      const { uploadURL } = await (await fetch(`/api/file`)).json();
      const form = new FormData();
      form.append('file', avatar[0], user?.id.toString());
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form,
        })
      ).json();

      editAvatar({ avatar: id });
    }
  };
  const [preview, setPreview] = useState('');
  const [avatarLoading, setAvatarLoading] = useState(false);
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
    if (data?.ok) {
      alert(`회원님의 아바타를 수정했습니다.`);
      router.reload();
    }
  }, [avatar, data, router]);
  return (
    <>
      <Cont>
        <h1>Edit Avatar</h1>
        <Form onSubmit={handleSubmit(onValid)}>
          <label className="avatar-label" htmlFor="avatar">
            <ProfileAvatar size={130} preview={preview} url={user?.avatar} />
          </label>
          <input
            className="avatar-input"
            {...register('avatar', {
              required: '프로필 사진 파일을 업로드해주세요.',
            })}
            id="avatar"
            name="avatar"
            type="file"
            accept="image/*"
          />
          {errors.avatar && <ErrorMsg error={errors.avatar.message} />}
          {data?.error && <ErrorMsg error={data.error} />}
          <Btn name="아바타 수정" type="submit" loading={avatarLoading} />
        </Form>
      </Cont>
    </>
  );
};
const Cont = styled(FormCont)`
  text-align: center;
  h1 {
    font-weight: 700;
    margin-bottom: 15px;
  }
  form {
    display: flex;
    align-items: center;
    justify-content: center;
    .avatar-label {
      width: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .avatar-input {
      display: none;
    }
  }
`;
