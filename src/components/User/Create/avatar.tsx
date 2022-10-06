import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import useMutation from '../../../libs/client/useMutation';
import { BtnWrap } from '../../../../styles/global';
import { Label, ProfileAvatar } from '../../Avatar/Profile';
import styled from '@emotion/styled';
import { IUserForm } from '../../../types/user';
import { Answer } from '../../../Tools/Modal/Answer';
import { Errors } from '../../../Tools/Errors';
import { IData } from '../../../types/global';
import { Title } from './Title';
import { LoadingModal } from '../../../Tools/Modal/Loading';
import { motion } from 'framer-motion';
import { ITheme } from '../../../../styles/theme';
import { Btn } from '../../../Tools/Button';

interface ICreateAvatar extends ITheme {
  createdId: number;
}
export const CreateUserAvatar = ({ createdId, theme }: ICreateAvatar) => {
  const router = useRouter();
  const [createAvatar, { loading, data }] = useMutation<IData>(
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
  const Loading = avatarLoading ? avatarLoading : loading ? loading : false;
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
      router.replace('/login');
    }
  }, [data, router]);
  const [answer, setAnswer] = useState(false);
  return (
    <>
      {!Loading && (
        <Cont className="box">
          <Title
            kor="계정생성"
            eng="Create Account"
            type="create-user-avatar"
          />
          <h2>
            <span>Step 3.</span>
            <span className="kor">프로필 사진</span>
            <span>Profile Picture</span>
          </h2>
          <form onSubmit={handleSubmit(onValid)}>
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
            <BtnWrap className="btn-wrap">
              <Btn
                theme={theme}
                name="SKIP"
                type="button"
                onClick={() => router.replace('/login')}
              />
              <Btn type="submit" name="SAVE" theme={theme} />
            </BtnWrap>
          </form>
          <Errors errors={errors} />
          <Answer
            theme={theme}
            isAnswer={answer}
            type="join-userAvatar"
            closeModal={setAnswer}
          />
        </Cont>
      )}
      {Loading && <LoadingModal theme={theme} isLoading={loading} />}
    </>
  );
};
const Cont = styled(motion.div)`
  padding: 30px;
  max-width: 360px;
  .profile-avatar {
    .profile {
      pointer-events: all;
    }
  }
  .btn-wrap {
    margin-top: 30px;
    padding: 0px 40px;
  }
`;
