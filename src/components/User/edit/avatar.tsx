import styled from '@emotion/styled';
import { Btn } from '../../Button';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { MutationRes } from '../../../types/mutation';
import { ProfileAvatar } from '../../Avatar/profile';
import { IProfileAvatarForm } from '../../../types/avatar';
import useMutation from '../../../libs/client/useMutation';
import { Errors, Form, FormCont } from '../../../../styles/global';
import { IEditProfileProps } from '../../../../pages/user/my/profile/edit';

export const EditProfileAvatar = ({ user }: IEditProfileProps) => {
  const router = useRouter();
  const [preview, setPreview] = useState('');
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileAvatarForm>({
    mode: 'onSubmit',
  });
  const avatar = watch('avatar');
  const [avatarLoading, setAvatarLoading] = useState(false);
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
  const [editAvatar, { loading, data }] = useMutation<MutationRes>(
    `/api/user/${user?.id}/edit/avatar`
  );
  //
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
  //
  return (
    <Cont>
      <h1>Edit Profile Avatar</h1>
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
        {errors.avatar && <Errors>{errors.avatar.message}</Errors>}
        <div className="btn-flex">
          <Btn name="아바타 수정" type="submit" loading={avatarLoading} />
        </div>
        {data?.error && <Errors>{data?.error}</Errors>}
      </Form>
    </Cont>
  );
};
const Cont = styled(FormCont)`
  form {
    .avatar-label {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .avatar-input {
      display: none;
    }
    .btn-flex {
      justify-content: center;
    }
  }
`;
