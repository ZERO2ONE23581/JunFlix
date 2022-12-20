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
import { AnimatePresence } from 'framer-motion';
import { Head_ } from '../../src/Tools/Title/Head';
import { MsgModal } from '../../src/Tools/Modal/Message';
import { ErrTxt } from '../../src/Tools/ErrTxt';
import { Box, FlexPage, Form } from '../../styles/global';
import { FindUser } from '../../src/components/User/Find';
import useMutation from '../../src/libs/client/useMutation';
import { LoadingModal } from '../../src/Tools/Modal/Loading';

const Login: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const [msg, setMsg] = useState('');
  const [login, { loading, data }] = useMutation<IRes>(`/api/login`);
  const {
    watch,
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: 'onSubmit' });
  //
  const onValid = ({ email, password }: IUserForm) => {
    if (loading) return;
    return login({ email, password });
  };
  useEffect(() => {
    if (data) {
      if (data?.msg) return setMsg(data.msg);
      if (data?.error) return setMsg(data.error);
    }
  }, [data, router, setMsg, setTimeout]);
  //
  return (
    <>
      <Head_ title="로그인" />
      <AnimatePresence>
        <Cont variants={variants} animate="animate" custom={theme}>
          {!loading && (
            <>
              <Box
                exit="exit"
                className="box"
                initial="initial"
                animate="animate"
                layoutId="login"
                custom={theme}
                variants={variants}
              >
                <Title>
                  <span>Login</span>
                  <span className="kor">로그인</span>
                </Title>
                <Form onSubmit={handleSubmit(onValid)}>
                  <InputWrap
                    _data={{
                      theme,
                      id: 'email',
                      type: 'text',
                      label: 'Email',
                      clearErrors,
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
                      label: 'Password',
                      text: watch('password')!,
                      register: register('password', {
                        required: 'need_password',
                      }),
                    }}
                  />
                  <ErrTxt error={errors.password?.message!} theme={theme} />
                  <Btn type="submit" item={{ theme, name: 'Submit' }} />
                </Form>
                <FindUser theme={theme} type="login" />
              </Box>
            </>
          )}
          {loading && <LoadingModal theme={theme} layoutId="login" />}
          <MsgModal _data={{ msg, theme, layoutId: 'login' }} />
        </Cont>
      </AnimatePresence>
    </>
  );
};
export default Login;

const Cont = styled(FlexPage)`
  justify-content: center;
  .box {
    form {
      gap: 0;
      .err_msg {
        margin-bottom: 0;
      }
      button {
        margin-top: 1rem;
      }
    }
  }
`;
const Title = styled.h1`
  height: 100%;
  font-size: 2rem;
  margin-bottom: 2px;
  .kor {
    font-size: 1.5rem;
    margin-left: 12px;
  }
`;
