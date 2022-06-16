import { useEffect } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Btn } from '../../src/components/Style/Button';
import { ILoginForm } from '../../src/types/login';
import { LinkWrap } from '../../src/components/Style/LinkWrap';
import { MutationRes } from '../../src/types/mutation';
import { Title } from '../../src/components/Layout/Title';
import useMutation from '../../src/libs/client/useMutation';
import { Errors, Form, FormCont, H1, Input, Page } from '../../styles/global';

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
      <Cont>
        <section className="form-wrap">
          <FormCont>
            <H1>Login</H1>
            <Form onSubmit={handleSubmit(onValid)}>
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

              <div className="btn-flex">
                <Btn type="submit" name="로그인" loading={loading} />
              </div>
            </Form>
          </FormCont>
          <LinkWrap login />
        </section>
      </Cont>
    </>
  );
};
export default Login;
const Cont = styled(Page)`
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
