import styled from '@emotion/styled';
import { Btn } from '../../../Button';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { ProfileAvatar } from '../../../Avatar/profile';
import { MutationRes } from '../../../../types/mutation';
import useMutation from '../../../../libs/client/useMutation';
import { Errors, Form, FormCont } from '../../../../../styles/global';
import {
  ICreateProfileAvatarProps,
  IProfileAvatarForm,
} from '../../../../types/avatar';

export const CreateProfileAvatar = ({
  joinSuccess,
  createdID,
}: ICreateProfileAvatarProps) => {
  const router = useRouter();
  const [createAvatar, { loading, data }] = useMutation<MutationRes>(
    '/api/user/join/create/avatar'
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
  const [avatarLoading, setAvatarLoading] = useState(false);
  const onValid = async ({ avatar }: IProfileAvatarForm) => {
    if (loading) return;
    setAvatarLoading((p) => !p);
    if (!createdID) return router.replace('/login');
    if (avatar && avatar.length > 0 && createdID) {
      const { uploadURL } = await (await fetch(`/api/file`)).json();
      const form = new FormData();
      form.append('file', avatar[0], createdID.toString());
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form,
        })
      ).json();
      createAvatar({ avatar: id, createdID });
    }
  };
  const [preview, setPreview] = useState('');
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
    if (data?.ok) {
      setAvatarLoading((p) => !p);
      alert(
        `회원가입을 성공적으로 완료하였습니다. 로그인 페이지로 이동합니다.`
      );
      router.replace('/login');
    }
  }, [avatar, watch, data, router, setAvatarLoading]);
  return (
    <>
      {joinSuccess && (
        <Container>
          <h1>Profile Avatar</h1>
          <h2>Step 3 (Optional)</h2>
          <Form onSubmit={handleSubmit(onValid)}>
            <label className="avatar-label" htmlFor="avatar">
              <ProfileAvatar preview={preview} size={130} />
            </label>
            <input
              className="avatar-input"
              {...register('avatar', {
                required: '프로필 사진 파일을 업로드해주세요.',
              })}
              type="file"
              accept="image/*"
              id="avatar"
              name="avatar"
            />
            {errors.avatar && <Errors>{errors.avatar.message}</Errors>}
            <span className="info">
              * 프로필 사진은 추후에 수정 가능합니다.
            </span>
            <div className="flex btn-wrap">
              <Btn type="submit" name="사진 저장" loading={avatarLoading} />
              <Btn
                type="button"
                name="나중에 설정"
                onClick={() => router.replace('/login')}
              />
            </div>
            {data?.error && <Errors>{data?.error}</Errors>}
          </Form>
        </Container>
      )}
    </>
  );
};
const Container = styled(FormCont)`
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
