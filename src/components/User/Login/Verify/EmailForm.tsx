import { useEffect } from 'react';
import { Btn } from '../../../Style/Button';
import { useForm } from 'react-hook-form';
import useMutation from '../../../../libs/client/useMutation';
import { IFindForm, IFindPostRes } from '../../../../types/login';
import { Errors, Form, Input } from '../../../../../styles/global';
import styled from '@emotion/styled';

export const VerifyEmailForm = ({ setOpenTokenForm }: any) => {
  const [verifyEmail, { loading, data }] = useMutation<IFindPostRes>(
    `/api/user/login/verify/email`
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFindForm>({ mode: 'onSubmit' });
  const onValid = ({ email }: IFindForm) => {
    if (loading) return;
    return verifyEmail(email);
  };
  useEffect(() => {
    if (data?.ok) setOpenTokenForm(data?.ok);
  }, [data, , setOpenTokenForm]);
  return (
    <Cont>
      <h2>* Please type your email for verification.</h2>
      <h3>인증을 위하여 이메일을 입력해주세요.</h3>
      <Form onSubmit={handleSubmit(onValid)}>
        <label htmlFor="email" />
        <Input
          {...register('email', {
            required: '이메일을 입력하세요.',
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: '이메일 형식이 올바르지 않습니다.',
            },
          })}
          type="text"
          id="email"
          name="email"
          placeholder="이메일을 입력하세요."
        />
        {errors.email && <Errors>{errors.email.message}</Errors>}
        {data?.error && <Errors>{data?.error}</Errors>}

        <Btn type="submit" name="이메일로 인증하기" loading={loading} />
      </Form>
    </Cont>
  );
};
export const Cont = styled.article`
  button {
    width: 100%;
  }
`;
