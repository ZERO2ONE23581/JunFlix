import styled from '@emotion/styled';
import { Btn } from '../../../Button';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import useUser from '../../../../libs/client/useUser';
import { MutationRes } from '../../../../types/mutation';
import { ProfileAvatar } from '../../../Avatar/profile';
import { IProfileAvatarForm } from '../../../../types/avatar';
import useMutation from '../../../../libs/client/useMutation';
import { Errors, Form, FormCont } from '../../../../../styles/global';

export const EditProfileAvatar = () => {
  const router = useRouter();
  const { loggedInUser } = useUser();
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
    if (avatar && avatar.length > 0 && loggedInUser?.id) {
      const { uploadURL } = await (await fetch(`/api/file`)).json();
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
      editAvatar({ avatar: id });
    }
  };
  const [editAvatar, { loading, data }] = useMutation<MutationRes>(
    `/api/user/${loggedInUser?.id}/edit/avatar`
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
          <ProfileAvatar
            size={130}
            preview={preview}
            url={loggedInUser?.avatar}
          />
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
        <div className="flex btn-wrap">
          <Btn type="submit" name="사진 저장" loading={avatarLoading} />
        </div>
        {data?.error && <Errors>{data?.error}</Errors>}
      </Form>
    </Cont>
  );
};
const Cont = styled(FormCont)`
  form {
    .avatar-label {
      display: block;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .avatar-input {
      display: none;
    }
    .btn-wrap {
      gap: 8px;
      button {
        width: 100%;
      }
    }
  }
`;
