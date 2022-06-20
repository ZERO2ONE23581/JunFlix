import { useEffect } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { ILoginForm } from '../../../src/types/login';
import { MutationRes } from '../../../src/types/mutation';
import { Btn } from '../../../src/components/Style/Button';
import { Title } from '../../../src/components/Layout/Title';
import useMutation from '../../../src/libs/client/useMutation';
import { LinkWrap } from '../../../src/components/Style/Button/Link';
import { Form, FormCont, Info, Page } from '../../../styles/global';
import { ErrorMsg } from '../../../src/components/Style/ErrMsg';
import { InputWrap } from '../../../src/components/Style/Input';

const Login: NextPage = () => {
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
    if (data?.ok) {
      alert('로그인을 성공하셨습니다.');
      router.replace('/');
    }
  }, [data, router]);
  return (
    <>
      <Title title="로그인" />
      <Cont>
        <Wrapper>
          <FormCont>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit(onValid)}>
              <InputWrap
                watch={watch('userId')}
                id="userId"
                type="text"
                label="USER ID"
                inputErrMsg={errors?.userId?.message}
                register={register('userId', {
                  required: '아이디를 입력해주세요.',
                })}
              />
              <InputWrap
                watch={watch('password')}
                id="password"
                type="password"
                label="Password"
                inputErrMsg={errors?.password?.message}
                register={register('password', {
                  required: '비밀번호를 입력해주세요.',
                })}
              />
              {data?.error && <ErrorMsg error={data.error} />}
              <Btn type="submit" name="로그인" loading={loading} />
              <Info>
                <span>* 아이디는 영어 소문자 대문자를 구분하지 않습니다.</span>
              </Info>
            </Form>
          </FormCont>
          <LinkWrap isLogin />
        </Wrapper>
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
  .btn-flex {
    button {
      width: 100%;
    }
  }
`;
const Wrapper = styled.article`
  margin: 0 auto;
  max-width: 620px;
`;
