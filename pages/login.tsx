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
import { Page } from '../styles/global';
import { useNeedLogout } from '../src/libs/client/useTools';

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
        <form onSubmit={handleSubmit(onValid)}>
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
          <Btn type="submit" name="로그인" loading={loading} />
          <FindLink />
          <Errors errors={errors} />
        </form>
      </Cont>
    </>
  );
};
export default Login;

const Cont = styled(Page)`
  padding: 10% 35%;
  form {
    gap: 22px;
    width: 100%;
    display: flex;
    padding: 30px 40px;
    border-radius: 5px;
    flex-direction: column;
    border: ${(p) => p.theme.border.thick};
    box-shadow: ${(p) => p.theme.boxShadow.nav};
    h1 {
      font-size: 1.8rem;
      margin-left: 5px;
    }
    input {
      padding: 15px;
    }
  }
`;
