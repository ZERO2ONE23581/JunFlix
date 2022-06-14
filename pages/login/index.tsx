import { useEffect } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { ILoginForm } from '../../src/types/login';
import { Btn } from '../../src/components/Button/def';
import { MutationRes } from '../../src/types/mutation';
import { Title } from '../../src/components/Layout/Title';
import useMutation from '../../src/libs/client/useMutation';
import { LoginLink } from '../../src/components/Login/LoginLink';
import { Errors, Form, FormCont, Page, Input } from '../../styles/global';

const Login: NextPage = () => {
  const router = useRouter();
  const [login, { loading, data }] =
    useMutation<MutationRes>(`/api/user/login`);
  const {
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
    if (data?.ok) {
      alert('로그인을 성공하셨습니다.');
      router.replace('/');
    }
  }, [data, router]);
  return (
    <>
      <Title title="로그인" />
      <LoginPage>
        <div className="wrap">
          <FormCont>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit(onValid)}>
              {data?.error && <Errors>{data?.error}</Errors>}
              <label htmlFor="userId" />
              <Input
                {...register('userId', {
                  required: '아이디를 입력해주세요.',
                })}
                id="userId"
                name="userId"
                type="text"
                placeholder="User ID"
              />
              {errors.userId && <Errors>{errors.userId.message}</Errors>}

              <label htmlFor="password" />
              <Input
                {...register('password', {
                  required: '비밀번호를 입력해주세요.',
                })}
                id="password"
                name="password"
                type="password"
                placeholder="Password"
              />
              {errors.password && <Errors>{errors.password.message}</Errors>}

              <span className="info">
                * 아이디는 영어 소문자 대문자를 구분하지 않습니다.
              </span>
              {data?.error && <Errors>{data?.error}</Errors>}
              <Btn type="submit" name="로그인" loading={loading} />
            </Form>
          </FormCont>
          <LoginLink login />
        </div>
      </LoginPage>
    </>
  );
};
export default Login;
const LoginPage = styled(Page)`
  .wrap {
    width: 420px;
  }
`;
