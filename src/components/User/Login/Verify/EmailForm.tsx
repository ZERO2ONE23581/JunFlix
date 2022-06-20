import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../Style/Button';
import { InputWrap } from '../../../Style/Input';
import { ErrorMsg } from '../../../Style/ErrMsg';
import { Dispatch, SetStateAction, useEffect } from 'react';
import useMutation from '../../../../libs/client/useMutation';
import { IFindForm, IFindPostRes } from '../../../../types/login';
import { Form, Info, JoinCont } from '../../../../../styles/global';

interface IVerifyEmailFormProps {
  setOpenTokenForm: Dispatch<SetStateAction<boolean>>;
}
export const VerifyEmailForm = ({
  setOpenTokenForm,
}: IVerifyEmailFormProps) => {
  const [verifyEmail, { loading, data }] = useMutation<IFindPostRes>(
    `/api/user/login/verify/email`
  );
  const {
    watch,
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
      <h1>Find ID</h1>
      <h2>Step 1. Confirm Email</h2>
      <Form onSubmit={handleSubmit(onValid)}>
        <InputWrap
          watch={watch('email')}
          id="email"
          type="text"
          label="Email"
          inputErrMsg={errors.email?.message}
          register={register('email', {
            required: '이메일을 입력하세요.',
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: '이메일 형식이 올바르지 않습니다.',
            },
          })}
        />
        {data?.error && <ErrorMsg error={data.error} />}
        <Btn type="submit" name="이메일로 인증하기" loading={loading} />
        <Info>
          <span>* Please type your email for verification.</span>
          <span>* 인증을 위하여 이메일을 입력해주세요.</span>
        </Info>
      </Form>
    </Cont>
  );
};
const Cont = styled(JoinCont)``;
