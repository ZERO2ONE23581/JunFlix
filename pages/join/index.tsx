import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';

const Join: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const onValid = (formData: any) => {
    console.log(formData);
  };
  //
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register('userId')}
          name="userId"
          type="text"
          placeholder="아이디를 입력해주세요."
        />
        <input
          {...register('password')}
          name="password"
          type="text"
          placeholder="비밀번호를 입력해주세요."
        />
        <input
          {...register('confirmPassword')}
          name="confirmPassword"
          type="password"
          placeholder="비밀번호를 재입력해주세요."
        />
        <input
          {...register('email')}
          name="email"
          type="text"
          placeholder="이메일을 입력해주세요."
        />

        <input type="submit" value="회원가입" />
      </form>
    </>
  );
};

export default Join;
