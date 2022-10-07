import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Btn } from '../../src/Tools/Button';
import { IData } from '../../src/types/global';
import { Box, Page } from '../../styles/global';
import { AnimatePresence } from 'framer-motion';
import { ILoginForm } from '../../src/types/user';
import { InputWrap } from '../../src/Tools/Input';
import { joinBoxVar } from '../../styles/variants';
import { ErrModal } from '../../src/Tools/errorModal';
import { HeadTitle } from '../../src/components/Head';
import useMutation from '../../src/libs/client/useMutation';
import { LoadingModal } from '../../src/Tools/Modal/Loading';
import { FindUserWrap } from '../../src/components/User/Read/Links/Find';

const Login: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const [dataErr, setDataErr] = useState('');
  const [Loading, setLoading] = useState(false);
  const [login, { loading, data }] = useMutation<IData>(`/api/user/login`);
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({ mode: 'onSubmit' });

  const onValid = ({ userId, password }: ILoginForm) => {
    setLoading(true);
    if (loading) return;
    const userID = userId!.toUpperCase();
    return login({ userID, password });
  };

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (data?.ok) return router.replace('/');
        if (data?.error) return setDataErr(data.error);
      }, 1000);
    }
  }, [data, router, setDataErr, setTimeout, setLoading]);
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
              <form onSubmit={handleSubmit(onValid)}>
                <InputWrap
                  theme={theme}
                  id="userId"
                  type="text"
                  label="USER ID"
                  error={errors.userId?.message}
                  watch={watch('userId')}
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
                  watch={watch('password')}
                  register={register('password', {
                    required: '비밀번호를 입력해주세요.',
                  })}
                />
                <Btn theme={theme} name="Login" type="submit" />
              </form>
              <FindUserWrap />
              <ErrModal theme={theme} error={dataErr} setDataErr={setDataErr} />
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
    gap: 30px;
    h1 {
      height: 100%;
      //border: 2px solid yellow;
      font-size: 2rem;
      .kor {
        font-size: 1.5rem;
        margin-left: 12px;
      }
    }
    .box-title {
      height: 100%;
    }
    form {
      gap: 20px;
      .err-msg {
        margin-top: 20px;
      }
      button {
        padding: 6px;
      }
    }
    .find-user-wrap {
      height: 100%;
    }
  }
`;
