import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { ILoginForm } from '../../../types/login';
import { MutationRes } from '../../../types/mutation';
import { Btn } from '../../Style/Button';
import useMutation from '../../../libs/client/useMutation';
import { InputWrap } from '../../Style/Input';
import { Errors } from '../../Review/Create/Error';
import { FindLink } from '../Links/Find';

export const LoginForm = () => {
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
    console.log(`hello `);
    if (loading) return;
    const userID = userId!.toUpperCase();
    return login({ userID, password });
  };

  useEffect(() => {
    if (data?.error) alert(data.error);
    if (data?.ok) {
      router.replace('/');
    }
  }, [data, router]);
  return (
    <>
      <Cont onSubmit={handleSubmit(onValid)}>
        <h1>Login</h1>
        <InputWrap
          id="userId"
          type="text"
          label="USER ID"
          watch={watch('userId')}
          register={register('userId', {
            required: '아이디를 입력해주세요.',
          })}
        />
        <InputWrap
          id="password"
          type="password"
          label="Password"
          watch={watch('password')}
          register={register('password', {
            required: '비밀번호를 입력해주세요.',
          })}
        />
        <Btn type="submit" name="로그인" loading={loading} />
        <FindLink />
        <Errors errors={errors} />
      </Cont>
    </>
  );
};

const Cont = styled.form`
  gap: 23px;
  width: 100%;
  display: flex;
  padding: 30px 40px;
  border-radius: 5px;
  flex-direction: column;
  border: ${(p) => p.theme.border.thick};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  h1 {
    font-size: 1.8rem;
  }
  input {
    padding: 15px;
  }
  button {
    font-weight: 500;
    font-size: 1.1rem;
    margin-top: 10px;
  }
  .login-err {
    top: 80%;
  }
`;
