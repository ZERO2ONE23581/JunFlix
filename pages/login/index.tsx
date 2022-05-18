import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Btn } from '../../src/components/Btn';
import { Input } from '../../src/components/Input';
import { Title } from '../../src/components/Layout/parts/Title';
import useMutation from '../../src/libs/client/useMutation';
import { ILoginForm, ILoginRes } from '../../src/types/login';
import { ErrMsg, LoginPageCont } from '../../styles/defaultStyle';
import { Form } from '../../styles/formStyle';

const Login: NextPage = () => {
  const router = useRouter();
  //Post
  const [postJoin, { loading, data }] =
    useMutation<ILoginRes>(`/api/user/login`);

  //Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ILoginForm>({ mode: 'onSubmit' });
  //
  const onValid = ({ userId, password }: ILoginForm) => {
    if (loading) return;
    if (!userId) setError('userId', { message: '아이디를 입력해주세요.' });
    const userID = userId!.toUpperCase();
    postJoin({ userID, password });
  };
  useEffect(() => {
    if (data?.ok) {
      router.replace('/api/user/login/move');
    }
  }, [data, router]);

  return (
    <>
      <Title title="로그인" />
      <LoginPageCont>
        <Form onSubmit={handleSubmit(onValid)}>
          {data?.error && <ErrMsg>{data?.error}</ErrMsg>}
          <Input
            register={register('userId', {
              required: '아이디를 입력해주세요.',
            })}
            label="ID"
            name="userId"
            type="text"
            placeholder="아이디를 입력해주세요."
            errMsg={errors.userId?.message}
          />
          <Input
            register={register('password', {
              required: '비밀번호를 입력해주세요.',
            })}
            label="Password"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            errMsg={errors.password?.message}
          />
          <Btn type="submit" btnName={loading ? 'Loading...' : '로그인'} />
        </Form>
        <div>
          <Link href="/login/find_id">
            <a>아이디 찾기</a>
          </Link>
          <Link href="/login/find_pw">
            <a>비밀번호 찾기</a>
          </Link>
          <Link href="/join">
            <a>회원가입</a>
          </Link>
        </div>
      </LoginPageCont>
    </>
  );
};

export default Login;
