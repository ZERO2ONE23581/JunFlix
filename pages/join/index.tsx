import { IPage } from '../_app';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Btn } from '../../src/Tools/Button';
import { IRes } from '../../src/types/global';
import { ErrTxt } from '../../src/Tools/ErrTxt';
import { variants } from '../../styles/variants';
import { IUserForm } from '../../src/types/user';
import { InputWrap } from '../../src/Tools/Input';
import { BG, Box, FlexCol_ } from '../../styles/global';
import { MsgModal } from '../../src/Tools/Modal/Message';
import { FindUser } from '../../src/components/User/Find';
import { AvatarInput } from '../../src/Tools/Avatar/Input';
import useMutation from '../../src/libs/client/useMutation';
import { LoadingModal } from '../../src/Tools/Modal/Loading';
import { useResponsive, useUploadImg } from '../../src/libs/client/useTools';

const JoinPage: NextPage<IPage> = ({ theme }) => {
  const [post, { loading, data }] = useMutation<IRes>(`/api/user/create`);
  const {
    reset,
    watch,
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: 'onBlur' });
  const avatar = watch('avatar');
  const [preview, setPreview] = useState('');
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [avatar, setPreview]);

  const onValid = async ({
    email,
    avatar,
    password,
    password_confirm,
  }: IUserForm) => {
    if (loading) return;
    if (password !== password_confirm)
      return setError('password_confirm', {
        message: 'invalid_password_confirm',
      });
    setLoading(true);
    const avatar_id = await useUploadImg(avatar);
    return post({ email, password, password_confirm, avatar: avatar_id });
  };
  const router = useRouter();
  const [msg, setMsg] = useState('');
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (data.error) {
          setMsg(data.error);
          setTimeout(() => {
            setMsg('');
          }, 1000);
        }
        if (data.ok) router.push(`/`);
      }, 2000);
    }
  }, [data, router, setLoading, setMsg]);
  //
  const { isDesk } = useResponsive();
  return (
    <Cont isDesk={isDesk}>
      {!Loading && (
        <Box_
          exit="exit"
          layoutId="join"
          initial="initial"
          animate="animate"
          custom={theme}
          variants={variants}
        >
          <form onSubmit={handleSubmit(onValid)}>
            <h1 className="title">
              <span>Join</span>
              <span className="kor">회원가입</span>
            </h1>
            <Wrap isDesk={isDesk}>
              <AvatarInput
                _data={{ register, theme, preview, setPreview, reset }}
              />
              <InputWrap
                _data={{
                  theme,
                  id: 'email',
                  clearErrors,
                  type: 'text',
                  label: 'Email',
                  text: watch('email')!,
                  register: register('email', {
                    required: 'need_email',
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: 'invalid_email',
                    },
                  }),
                }}
              />
              <ErrTxt error={errors.email?.message!} theme={theme} />
              <InputWrap
                _data={{
                  theme,
                  clearErrors,
                  id: 'password',
                  type: 'password',
                  label: 'password',
                  text: watch('password')!,
                  register: register!('password', {
                    required: 'need_password',
                    minLength: { value: 8, message: 'min_password' },
                    maxLength: { value: 16, message: 'max_password' },
                    pattern: {
                      value:
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/,
                      message: 'invalid_password',
                    },
                  }),
                }}
              />
              <ErrTxt error={errors.password?.message!} theme={theme} />
              <InputWrap
                _data={{
                  theme,
                  clearErrors,
                  type: 'password',
                  id: 'password_confirm',
                  label: 'Confirm Password',
                  text: watch('password_confirm')!,
                  register: register('password_confirm', {
                    required: 'need_password_confirm',
                  }),
                }}
              />
              <ErrTxt theme={theme} error={errors.password_confirm?.message!} />
            </Wrap>
            <Btn type="submit" item={{ theme, name: 'Submit' }} />
          </form>
          <FindUser theme={theme} type="join" />
          {msg && <MsgModal _data={{ theme, msg }} />}
        </Box_>
      )}
      {Loading && <LoadingModal theme={theme} layoutId="join" />}
    </Cont>
  );
};
export default JoinPage;

const Cont = styled(BG)`
  padding-top: 15vh;
  .title {
    font-size: ${(p) => (p.isDesk ? '2rem' : '4rem')};
    .kor {
      margin-left: 12px;
      font-size: ${(p) => (p.isDesk ? '1.5rem' : '3rem')};
    }
  }
  button {
    padding: 0.5rem;
    margin-top: 2rem;
    font-size: ${(p) => (p.isDesk ? '1.1rem' : '3rem')};
  }
`;
const Box_ = styled(Box)`
  form {
    width: 100%;
  }
`;
const Wrap = styled(FlexCol_)`
  gap: 1rem;
  padding-top: 2rem;
  .avatar_input {
    width: ${(p) => (p.isDesk ? '5rem' : '15rem')};
    height: ${(p) => (p.isDesk ? '5rem' : '15rem')};
  }
  .avatar {
    margin-top: 1rem;
  }
  button {
    margin-top: 1rem;
  }
`;
