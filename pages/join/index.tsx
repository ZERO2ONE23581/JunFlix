import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../src/components/Input';
import { useMutation } from '../../src/libs/client/useMutation';

const Join: NextPage = () => {
  //Form
  const { register, handleSubmit } = useForm();
  const onValid = (formData: any) => {
    postJoin(formData);
  };
  //Post
  const [postJoin, { loading, data, error }] = useMutation('/api/user/join');
  console.log(data);
  //
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <Input
          register={register('userId', { required: '아이디를 입력해주세요.' })}
          name="userId"
          type="text"
          placeholder="아이디를 입력해주세요."
        />
        <Input
          register={register('password', {
            required: '비밀번호를 입력해주세요.',
          })}
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
        />
        <Input
          register={register('confirmPassword', {
            required: '비밀번호를 재입력해주세요.',
          })}
          name="confirmPassword"
          type="password"
          placeholder="비밀번호를 재입력해주세요."
        />
        <Input
          register={register('email', {
            required: '이메일을 입력해주세요.',
          })}
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요."
        />

        <Input type="submit" value="회원가입" />
      </form>
    </>
  );
};

export default Join;
