import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { Btn } from '../../src/components/Btn';
import { Error, Input } from '../../src/components/Input';
import useMutation from '../../src/libs/client/useMutation';
import { ILoginForm, ILoginRes } from '../../src/types/login';
import { Form } from '../../styles/join-style';
import useSWR from 'swr';

const Login: NextPage = () => {
  //Get
  const { data: userData } = useSWR(`/api/user/login`);
  console.log(userData);
  //Post
  const [postJoin, { loading, data }] =
    useMutation<ILoginRes>(`/api/user/login`);

  //Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginForm>({ mode: 'onSubmit' });
  //
  const onValid = (formData: ILoginForm) => {
    if (loading) return;
    postJoin(formData);
  };
  //
  return (
    <>
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
