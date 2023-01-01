import { IPage } from '../_app';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Btn } from '../../src/Tools/Button';
import { IRes } from '../../src/types/global';
import { AnimatePresence } from 'framer-motion';
import { ErrTxt } from '../../src/Tools/ErrTxt';
import { variants } from '../../styles/variants';
import { IUserForm } from '../../src/types/user';
import { InputWrap } from '../../src/Tools/Input';
import { Head_ } from '../../src/Tools/Title/Head';
import { BG, Box, Form } from '../../styles/global';
import { MsgModal } from '../../src/Tools/Modal/Message';
import { FindUser } from '../../src/components/User/Find';
import useMutation from '../../src/libs/client/useMutation';
import { LoadingModal } from '../../src/Tools/Modal/Loading';
import { useResponsive } from '../../src/libs/client/useTools';

const Login: NextPage<IPage> = ({ theme }) => {
  const router = useRouter();
  const [msg, setMsg] = useState('');
  const { isDesk } = useResponsive();
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
  }, [data, router, setMsg]);
  //

  return (
    <>
      <Head_ title="로그인" />
      <AnimatePresence>
        <Cont isDesk={isDesk}>
          {!loading && (
            <Box
              exit="exit"
              className="box"
              initial="initial"
              animate="animate"
              layoutId="login"
              custom={theme}
              variants={variants}
            >
              <Title className="title">
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
          )}
          {loading && <LoadingModal theme={theme} layoutId="login" />}
          <MsgModal _data={{ msg, theme, layoutId: 'login' }} />
        </Cont>
      </AnimatePresence>
    </>
  );
};
export default Login;

const Cont = styled(BG)`
  padding: 15vh 0;
  .box {
    margin: 0 auto;
    width: ${(p) => p.isDesk && 'fit-content'};
    form {
      gap: ${(p) => p.isDesk && '0.5rem'};
    }
  }
  .title {
    margin-bottom: ${(p) => p.isDesk && '1rem'};
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
const Title = styled.h1`
  height: 100%;
  margin-bottom: 2px;
  .kor {
    margin-left: 12px;
  }
`;
