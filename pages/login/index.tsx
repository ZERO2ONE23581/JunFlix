import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { Btn } from '../../src/components/Btn';
import { Input } from '../../src/components/Input';
import { useMutation } from '../../src/libs/client/useMutation';
import { Form } from '../../styles/join-style';

export interface ILoginForm {
  userId?: string;
  password?: string;
}

const Login: NextPage = () => {
  //Post
  const [postJoin, { loading, data }] = useMutation(`/api/user/login`);

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
  //
  return (
    <>
      <Form onSubmit={handleSubmit(onValid)}>
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
        <Btn type="submit" btnName="로그인" />
      </Form>
    </>
  );
};

export default Login;
