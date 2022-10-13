import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Btn } from '../src/Tools/Button';
import { Box, Form, Page } from '../styles/global';
import { AnimatePresence } from 'framer-motion';
import { ILoginForm } from '../src/types/user';
import { InputWrap } from '../src/Tools/Input';
import { joinBoxVar } from '../styles/variants';
import { IRes } from '../src/types/global';
import { HeadTitle } from '../src/Tools/head_title';
import useMutation from '../src/libs/client/useMutation';
import { LoadingModal } from '../src/Tools/Modal/loading_modal';
import { MessageModal } from '../src/Tools/msg_modal';
import { FindUserWrap } from '../src/components/post/read/user/Links/Find';

const Login: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [Loading, setLoading] = useState(false);
  const [login, { loading, data }] = useMutation<IRes>(`/api/login`);
  const {
    watch,
    register,
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
        if (data?.error) return setMessage(data.error);
      }, 1000);
    }
  }, [data, router, setMessage, setTimeout, setLoading]);
  //
  return (
    <>
      <HeadTitle title="로그인" />
      <Cont>
        <AnimatePresence>
          {!Loading && (
            <Box
              className="box"
              exit="exit"
              initial="initial"
              animate="animate"
              custom={theme}
              variants={joinBoxVar}
            >
              <h1>
                <span>Login</span>
                <span className="kor">로그인</span>
              </h1>
              <Form onSubmit={handleSubmit(onValid)}>
                <InputWrap
                  theme={theme}
                  id="userId"
                  type="text"
                  label="USER ID"
                  error={errors.userId?.message}
                  watch={Boolean(watch('userId'))}
                  register={register('userId', {
                    required: '아이디를 입력해주세요.',
                  })}
                />
                <InputWrap
                  theme={theme}
                  id="password"
                  type="password"
                  label="Password"
                  error={errors.password?.message}
                  watch={Boolean(watch('password'))}
                  register={register('password', {
                    required: '비밀번호를 입력해주세요.',
                  })}
                />
                <Btn
                  isBtn
                  type="submit"
                  isBoolean={{ theme }}
                  isString={{ btnName: 'Login' }}
                />
              </Form>
              <FindUserWrap theme={theme} />
              <MessageModal
                theme={theme}
                message={message}
                setMessage={setMessage}
              />
            </Box>
          )}
          {Loading && <LoadingModal theme={theme} />}
        </AnimatePresence>
      </Cont>
    </>
  );
};
export default Login;

const Cont = styled(Page)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  .box {
    width: 440px;
    form {
      gap: 20px;
      .input-wrap {
        gap: 20px;
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
