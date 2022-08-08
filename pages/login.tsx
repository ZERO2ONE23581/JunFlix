import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { MutationRes } from '../src/types/global';
import useMutation from '../src/libs/client/useMutation';
import { ILoginForm } from '../src/types/user';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { HeadTitle } from '../src/components/Layout/Head';
import { InputWrap } from '../src/components/Tools/Input';
import { Btn } from '../src/components/Tools/Button';
import { FindLink } from '../src/components/User/Read/Links/Find';
import { Errors } from '../src/components/Tools/Errors';
import { Box, Page } from '../styles/global';
import { useNeedLogout } from '../src/libs/client/useTools';
import { LoadingModal } from '../src/components/Tools/Modal/Loading';

const Login: NextPage = () => {
  useNeedLogout();
  const router = useRouter();
  const [login, { loading, data }] =
    useMutation<MutationRes>(`/api/user/login`);
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({ mode: 'onSubmit' });

  const onValid = ({ userId, password }: ILoginForm) => {
    if (loading) return;
    const userID = userId!.toUpperCase();
    return login({ userID, password });
  };
  useEffect(() => {
    if (data?.error) alert(data.error);
    if (data?.ok) {
      router.replace('/');
    }
  }, [data, router]);
  return (
    <>
      <HeadTitle title="로그인" />
      <Cont>
        {!loading && (
          <form onSubmit={handleSubmit(onValid)}>
            <Box className="box">
              <h1>Login</h1>
              <InputWrap
                id="userId"
                type="text"
                label="USER ID"
                watch={watch('userId')}
                register={register('userId', {
                  required: '아이디를 입력해주세요.',
                })}
              />
              <InputWrap
                id="password"
                type="password"
                label="Password"
                watch={watch('password')}
                register={register('password', {
                  required: '비밀번호를 입력해주세요.',
                })}
              />
              <Btn name="로그인" type="submit" CLASSNAME="submit" />
              <FindLink />
              <Errors errors={errors} />
            </Box>
          </form>
        )}
        {loading && <LoadingModal type="loading" zIndex={991} />}
      </Cont>
    </>
  );
};
export default Login;

const Cont = styled(Page)`
  padding: 0;
  .box {
    max-width: 500px;
    gap: 20px;
    h1 {
      font-size: 1.8rem;
      margin-bottom: 8px;
    }
  }
`;
