import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Btn } from '../../src/components/Btn';
import { Error, Input } from '../../src/components/Input';
import { Title } from '../../src/components/Layout/parts/Title';
import useMutation from '../../src/libs/client/useMutation';
import { ILoginForm, ILoginRes } from '../../src/types/login';
import { Form } from '../../styles/join-style';

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
  } = useForm<ILoginForm>({ mode: 'onSubmit' });
  //
  const onValid = (formData: ILoginForm) => {
    if (loading) return;
    postJoin(formData);
  };
  useEffect(() => {
    if (data?.ok) {
      router.replace('/');
    }
  }, [data]);

  return (
    <>
      <Title title="로그인" />
      <Form onSubmit={handleSubmit(onValid)}>
        {data?.error && <Error>{data?.error}</Error>}
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
