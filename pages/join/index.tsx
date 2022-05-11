import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../src/components/Input';
import { JoinModal } from '../../src/components/Join/Modal';
import { useMutation } from '../../src/libs/client/useMutation';

export interface IJoinForm {
  username?: string;
  userId?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
}

const Join: NextPage = () => {
  //Form
  const { register, handleSubmit } = useForm();
  const onValid = (formData: IJoinForm) => {
    if (loading) return;
    postJoin(formData);
  };
  //Post
  const [postJoin, { loading, data, error }] = useMutation('/api/user/join');

  //After post
  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (data?.ok) {
      setModal(true);
    }
  }, [data]);
  const toggleClick = () => {
    setModal((value) => !value);
  };
  console.log(modal);
  //
  return (
    <>
      {modal && <JoinModal toggleClick={toggleClick} />}
      {/* {true && <JoinModal toggleClick={toggleClick} />} */}
      <form onSubmit={handleSubmit(onValid)}>
        {data?.error && <span>{data.error}</span>}
        {error && <span>{error}</span>}
        <Input
          register={register('userId', { required: '아이디를 입력해주세요.' })}
          name="userId"
          type="text"
          placeholder="아이디를 입력해주세요."
        />
        <Input
          register={register('username', {
            required: '닉네임을 입력해주세요.',
          })}
          name="username"
          type="text"
          placeholder="닉네임을 입력해주세요."
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
        <Input type="submit" btnName={loading ? 'Loading...' : '회원가입'} />
      </form>
    </>
  );
};

export default Join;
