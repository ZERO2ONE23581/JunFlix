import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Btn } from '../../src/Tools/Button';
import { IRes } from '../../src/types/global';
import { variants } from '../../styles/variants';
import { IUserForm } from '../../src/types/user';
import { InputWrap } from '../../src/Tools/Input';
import { MsgModal } from '../../src/Tools/Modal/Message';
import { ErrTxt } from '../../src/Tools/ErrTxt';
import { FindUser } from '../../src/components/User/Find';
import { AvatarInput } from '../../src/Tools/Avatar/Input';
import useMutation from '../../src/libs/client/useMutation';
import { Flex, FlexCol, FlexPage } from '../../styles/global';
import { useUploadImg } from '../../src/libs/client/useTools';
import { LoadingModal } from '../../src/Tools/Modal/Loading';

const JoinPage: NextPage<{ theme: boolean }> = ({ theme }) => {
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
  return (
    <FlexPage>
      <>
        {msg && <MsgModal _data={{ theme, msg }} />}
        {Loading && <LoadingModal theme={theme} />}
        {!Loading && (
          <Box
            exit="exit"
            custom={theme}
            initial="initial"
            animate="animate"
            variants={variants}
          >
            <form onSubmit={handleSubmit(onValid)}>
              <h1>
                <span>Join</span>
                <span className="kor">회원가입</span>
              </h1>
              <Wrap>
                <AvatarInput
                  _data={{ register, theme, preview, setPreview, reset }}
                />
                <Inputs>
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
                  <ErrTxt
                    theme={theme}
                    error={errors.password_confirm?.message!}
                  />
                </Inputs>
              </Wrap>
              <Btn type="submit" item={{ theme, name: 'Submit' }} />
            </form>
            <FindUser theme={theme} type="join" />
          </Box>
        )}
      </>
    </FlexPage>
  );
};
export default JoinPage;

const Box = styled(FlexCol)`
  padding: 2rem;
  border-radius: 10px;
  align-items: flex-start;
  border: 1px solid ${(p) => p.theme.color.font};
  width: fit-content;
  height: fit-content;
  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
  }
  h1 {
    font-size: 2rem;
    .kor {
      font-size: 1.5rem;
    }
    span {
      margin-right: 0.5rem;
    }
  }

  .err_msg {
    margin-top: 1rem;
  }
  button {
    margin-top: 1rem;
  }
`;
const Wrap = styled(Flex)`
  gap: 1rem;
  align-items: flex-start;
  .avatar {
    margin-top: 1rem;
  }
  button {
    margin-top: 1rem;
  }
`;
const Inputs = styled(FlexCol)`
  width: fit-content;
`;
