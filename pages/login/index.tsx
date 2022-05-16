import type { NextPage } from 'next';
import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Btn } from '../../src/components/Btn';
import { Input } from '../../src/components/Input';
import { Title } from '../../src/components/Layout/parts/Title';
import { MoveHome } from '../../src/components/moveHome';
import useMutation from '../../src/libs/client/useMutation';
import { ILoginForm, ILoginRes } from '../../src/types/login';
import { ErrMsg, Form } from '../../styles/globalStyle';

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
      {/* <MoveHome data={data?.ok} /> */}
      <Title title="로그인" />
      <Form onSubmit={handleSubmit(onValid)}>
        {data?.error && <ErrMsg>{data?.error}</ErrMsg>}
        <Input
          register={register('userId', { required: '아이디를 입력해주세요.' })}
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
    </>
  );
};

export default Login;
