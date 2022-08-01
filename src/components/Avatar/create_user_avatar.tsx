import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Btn } from '../Tools/Button';
import { MutationRes } from '../../types/mutation';
import useMutation from '../../libs/client/useMutation';
import { Form } from '../../../styles/global';
import { Label, ProfileAvatar } from './ProfileAvatar';
import { Errors } from '../Tools/Error';
import { Answer } from '../Tools/Modal/user_qna';
import styled from '@emotion/styled';
import { Heading } from '../User/Create/Heading';
import { IUserForm } from '../../types/user';

interface ICreateAvatar {
  createdId: number;
}
export const CreateAvatar = ({ createdId }: ICreateAvatar) => {
  const router = useRouter();
  const [createAvatar, { loading, data }] = useMutation<MutationRes>(
    '/api/user/create/avatar'
  );
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({
    mode: 'onSubmit',
  });
  const avatar = watch('avatar');
  const [avatarLoading, setAvatarLoading] = useState(false);

  const onValid = async ({ avatar }: IUserForm) => {
    if (loading) return;
    setAvatarLoading((p) => !p);
    if (!createdId) return router.replace('/login');
    if (avatar && avatar.length > 0 && createdId) {
      const { uploadURL } = await (await fetch(`/api/file`)).json();
      const form = new FormData();
      form.append('file', avatar[0], createdId.toString());
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form,
        })
      ).json();
      createAvatar({ avatar: id, createdId });
    }
  };
  const [preview, setPreview] = useState('');
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [avatar, watch, setAvatarLoading]);

  useEffect(() => {
    if (data?.error) alert(data.error);
    if (data?.ok) {
      alert(
        `회원가입을 성공적으로 완료하였습니다. 로그인 페이지로 이동합니다.`
      );
      router.replace('/user/login');
    }
  }, [data, router]);
  const [answer, setAnswer] = useState(false);
  return (
    <>
      <>
        <Heading
          type="avatar"
          h1="Step 3. Optional (선택사항)"
          h2="Profile Picture (프로필 사진)"
        />
        <Form onSubmit={handleSubmit(onValid)}>
          <Label htmlFor="avatar">
            <ProfileAvatar preview={preview} size="8rem" />
            <input
              {...register('avatar', {
                required: '프로필 사진 파일을 업로드해주세요.',
              })}
              id="avatar"
              name="avatar"
              type="file"
              accept="image/*"
            />
          </Label>
          <Flex>
            <Btn
              type="button"
              name="나중에 설정"
              onClick={() => router.replace('/user/login')}
            />
            <Btn type="submit" name="사진 저장" loading={avatarLoading} />
          </Flex>
        </Form>
        <Errors errors={errors} />
        {answer && <Answer setAnswer={setAnswer} />}
      </>
    </>
  );
};
const Flex = styled.div`
  gap: 20px;
  width: 300px;
  display: flex;
  margin: 0 auto;
  align-items: center;
  button {
    width: 100%;
  }
`;
