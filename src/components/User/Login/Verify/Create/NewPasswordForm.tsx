import { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../../Style/Button';
import { Form, Info, JoinCont } from '../../../../../../styles/global';
import useMutation from '../../../../../libs/client/useMutation';
import { IFindForm, IFindPostRes } from '../../../../../types/login';
import styled from '@emotion/styled';
import { ErrorMsg } from '../../../../Style/ErrMsg';
import { InputWrap } from '../../../../Style/Input';

interface ICreateNewPasswordFormProps {
  userId: string;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}
export const CreateNewPasswordForm = ({
  userId,
  setOpenModal,
}: ICreateNewPasswordFormProps) => {
  const [CreateNewPassword, { loading, data }] = useMutation<IFindPostRes>(
    `/api/user/login/create/new_password`
  );
  const {
    watch,
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFindForm>({ mode: 'onSubmit' });
  const onValid = ({ password, confirmPassword }: IFindForm) => {
    if (!userId) return;
    if (password !== confirmPassword)
      return setError('confirmPassword', {
        message: '확인 비밀번호가 일치하지 않습니다.',
      });
    return CreateNewPassword({ password, userId });
  };
  useEffect(() => {
    if (data?.ok) setOpenModal(data?.ok);
  }, [data, , setOpenModal]);
  return (
    <Cont>
      <h1>Find Password</h1>
      <h2>Step 3. Create New Password</h2>
      <Form onSubmit={handleSubmit(onValid)}>
        <InputWrap
          watch={watch('password')}
          id="password"
          type="password"
          label="New Password"
          inputErrMsg={errors.password?.message}
          register={register('password', {
            required: '새 비밀번호 입력하세요.',
            minLength: {
              value: 8,
              message: '비밀번호는 최소 8자리여야 합니다.',
            },
            maxLength: {
              value: 16,
              message: '비밀번호는 최대 16자리여야 합니다.',
            },
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/,
              message:
                '비밀번호는 최소 1개이상의 숫자, 문자, 정의된 특수문자를 포함해야 합니다.',
            },
          })}
        />
        <InputWrap
          watch={watch('confirmPassword')}
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          inputErrMsg={errors.confirmPassword?.message}
          register={register('confirmPassword', {
            required: '새 비밀번호 재입력하세요.',
          })}
        />
        {data?.error && <ErrorMsg error={data.error} />}
        <Btn type="submit" loading={loading} name="새로운 비밀번호 만들기" />
        <Info>
          <span>* Please type your new password.</span>
          <span>* 새로운 비밀번호를 입력해주세요.</span>
        </Info>
      </Form>
    </Cont>
  );
};
const Cont = styled(JoinCont)``;
