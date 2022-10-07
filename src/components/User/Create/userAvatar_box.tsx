import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import useMutation from '../../../libs/client/useMutation';
import { Box, BtnWrap } from '../../../../styles/global';
import { Label, ProfileAvatar } from '../../Avatar/Profile';
import styled from '@emotion/styled';
import { IUserForm } from '../../../types/user';
import { Answer } from '../../../Tools/Modal/Answer';
import { IData } from '../../../types/global';
import { LoadingModal } from '../../../Tools/Modal/Loading';
import { AnimatePresence } from 'framer-motion';
import { ITheme } from '../../../../styles/theme';
import { Btn } from '../../../Tools/Button';
import { BoxTitle } from '../../../Tools/Title';
import { ErrModal } from '../../../Tools/errorModal';
import { inputErrVar, joinBoxVar } from '../../../../styles/variants';
import { ErrMsg } from '../../../Tools/Input';

interface IUserAvatarBox extends ITheme {
  isBox: boolean;
  createdId: number;
}
export const UserAvatarBox = ({ isBox, createdId, theme }: IUserAvatarBox) => {
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
    if (!createdId) return router.replace('/user/login');
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

  const [dataErr, setDataErr] = useState('');
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        if (data.error) setDataErr(data.error);
        if (data.ok) router.replace('/user/login');
      }, 1000);
    }
  }, [data, router, setDataErr]);
  const [answer, setAnswer] = useState(false);
  //
  return (
    <AnimatePresence>
      {isBox && (
        <>
          {!Loading && (
            <Cont
              exit="exit"
              initial="initial"
              animate="animate"
              custom={theme}
              variants={joinBoxVar}
              className="box"
            >
              <BoxTitle theme={theme} type="join-step3" />
              <form onSubmit={handleSubmit(onValid)}>
                <Label htmlFor="avatar">
                  <ProfileAvatar
                    size="4em"
                    theme={theme}
                    type={{ preview: preview, avatar: '' }}
                  />
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
                {errors.avatar?.message && (
                  <ErrMsg
                    exit="exit"
                    initial="initial"
                    animate="animate"
                    custom={theme}
                    variants={inputErrVar}
                    className="err-msg"
                  >
                    {errors.avatar?.message}
                  </ErrMsg>
                )}
                <BtnWrap className="btn-wrap">
                  <Btn
                    theme={theme}
                    name="SKIP"
                    type="button"
                    onClick={() => router.replace('/user/login')}
                  />
                  <Btn type="submit" name="SAVE" theme={theme} />
                </BtnWrap>
              </form>
              <ErrModal theme={theme} error={dataErr} setDataErr={setDataErr} />
              {answer && (
                <Answer
                  theme={theme}
                  type="join-userAvatar"
                  closeModal={setAnswer}
                />
              )}
            </Cont>
          )}
          {Loading && <LoadingModal theme={theme} />}
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Box)`
  width: fit-content;
  position: relative;
  gap: 20px;
  padding: 40px;
  align-items: center;
  .box-title {
    width: fit-content;
    .title-wrap {
      h1 {
        font-size: 2rem;
      }
    }
  }
  form {
    margin: 0 auto;
    //border: 2px solid yellow;
    .btn-wrap {
      width: 200px;
      margin: 20px auto 0;
      //border: 4px solid blueviolet;
    }
    button {
      width: 100%;
      padding: 8px;
      font-size: 0.5em;
    }
  }
`;
