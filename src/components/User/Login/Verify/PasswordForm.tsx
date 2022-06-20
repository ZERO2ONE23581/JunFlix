import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../Style/Button';
import { ErrorMsg } from '../../../Style/ErrMsg';
import { InputWrap } from '../../../Style/Input';
import { Dispatch, SetStateAction, useEffect } from 'react';
import useMutation from '../../../../libs/client/useMutation';
import { IFindForm, IFindPostRes } from '../../../../types/login';
import { Form, Info, JoinCont } from '../../../../../styles/global';

interface IVerifyPasswordFormProps {
  setOpenTokenForm: Dispatch<SetStateAction<boolean>>;
}
export const VerifyPasswordForm = ({
  setOpenTokenForm,
}: IVerifyPasswordFormProps) => {
  const [verifyUserId, { loading, data }] = useMutation<IFindPostRes>(
    `/api/user/login/verify/user_id`
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFindForm>({ mode: 'onSubmit' });
  const onValid = ({ userId }: IFindForm) => {
    if (loading) return;
    return verifyUserId(userId);
  };
  useEffect(() => {
    if (data?.ok) setOpenTokenForm(data?.ok);
  }, [data, , setOpenTokenForm]);
  return (
    <Cont>
      <h1>Find Password</h1>
      <h2>Step 1. Confirm User ID</h2>
      <Form onSubmit={handleSubmit(onValid)}>
        <InputWrap
          type="text"
          id="userId"
          label="USER ID"
          inputErrMsg={errors.userId?.message}
          register={register('userId', {
            required: '아이디를 입력해주세요.',
          })}
        />
        {data?.error && <ErrorMsg error={data.error} />}
        <Btn type="submit" name="아이디로 인증하기" loading={loading} />
        <Info>
          <span>* Please type your ID for verification.</span>
          <span>* 인증을 위하여 아이디를 입력해주세요.</span>
        </Info>
      </Form>
    </Cont>
  );
};
const Cont = styled(JoinCont)``;
