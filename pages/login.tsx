import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Btn } from '../src/Tools/Button';
import { Box, FlexPage, Form, Page } from '../styles/global';
import { AnimatePresence } from 'framer-motion';
import { ILoginForm } from '../src/types/user';
import { InputWrap } from '../src/Tools/Input';
import { IRes } from '../src/types/global';
import { Head_ } from '../src/Tools/head_title';
import useMutation from '../src/libs/client/useMutation';
import { LoadingModal } from '../src/Tools/Modal/loading_modal';
import { MsgModal } from '../src/Tools/msg_modal';
import { variants } from '../styles/variants';

const Login: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const [msg, setMsg] = useState('');
  const [Loading, setLoading] = useState(false);
  const [login, { loading, data }] = useMutation<IRes>(`/api/login`);
  const {
    watch,
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({ mode: 'onSubmit' });
  //
  const onValid = ({ userId, password }: ILoginForm) => {
    setLoading(true);
    if (loading) return;
    return login({ userId: userId?.toUpperCase(), password });
  };
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (data?.ok) return router.replace('/');
        if (data?.error) return setMsg(data.error);
      }, 1000);
    }
  }, [data, router, setMsg, setTimeout, setLoading]);
  //

  return (
    <>
      <Head_ title="로그인" />
      <AnimatePresence>
        <Cont variants={variants} animate="animate" custom={theme}>
          {!Loading && (
            <Box
              exit="exit"
              className="box"
              initial="initial"
              animate="animate"
              layoutId="login"
              custom={theme}
              variants={variants}
            >
              <h1>
                <span>Login</span>
                <span className="kor">로그인</span>
              </h1>
              <Form onSubmit={handleSubmit(onValid)}>
                <InputWrap
                  _data={{
                    theme,
                    clearErrors,
                    label: 'ID',
                    id: 'userId',
                    type: 'text',
                    text: watch('userId')!,
                    error: errors.userId?.message!,
                    register: register('userId', {
                      required: '아이디를 입력해주세요.',
                    }),
                  }}
                />
                <InputWrap
                  _data={{
                    theme,
                    clearErrors,
                    id: 'password',
                    type: 'password',
                    label: 'Password',
                    text: watch('password')!,
                    error: errors.password?.message!,
                    register: register('password', {
                      required: '비밀번호를 입력해주세요.',
                    }),
                  }}
                />
                <Btn type="submit" item={{ theme, name: 'Submit' }} />
              </Form>
            </Box>
          )}
          {Loading && <LoadingModal theme={theme} />}
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
    align-items: flex-start;
    //min-width: 30vw;
    //    width: fit-content;

    form {
      button {
        margin-top: 20px;
      }
    }
    h1 {
      height: 100%;
      font-size: 2rem;
      margin-bottom: 2px;
      .kor {
        font-size: 1.5rem;
        margin-left: 12px;
      }
    }
  }
`;
