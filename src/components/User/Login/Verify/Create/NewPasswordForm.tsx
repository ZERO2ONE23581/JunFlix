import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Errors, Form, Input } from '../../../../../../styles/global';
import useMutation from '../../../../../libs/client/useMutation';
import { IFindForm, IFindPostRes } from '../../../../../types/login';
import { Btn } from '../../../../Style/Button';
import { Cont } from '../EmailForm';

export const CreateNewPasswordForm = ({ userId, setOpenModal }: any) => {
  const [CreateNewPassword, { loading, data }] = useMutation<IFindPostRes>(
    `/api/user/login/create/new_password`
  );
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFindForm>({ mode: 'onSubmit' });
  const onPasswordValid = ({ password, confirmPassword }: IFindForm) => {
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
      <h2>* Please type your new password.</h2>
      <h3>새로운 비밀번호를 입력해주세요.</h3>
      <Form onSubmit={handleSubmit(onPasswordValid)}>
        <label htmlFor="password" />
        <Input
          {...register('password', {
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
          id="password"
          name="password"
          type="password"
          placeholder="새 비밀번호 입력하세요."
        />
        {errors.password && <Errors>{errors.password.message}</Errors>}

        <label htmlFor="confirmPassword" />
        <Input
          {...register('confirmPassword', {
            required: '새 비밀번호 재입력하세요.',
          })}
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="새 비밀번호 재입력하세요."
        />
        {errors.confirmPassword && (
          <Errors>{errors.confirmPassword.message}</Errors>
        )}

        {data?.error && <Errors>{data?.error}</Errors>}

        <Btn type="submit" loading={loading} name="새로운 비밀번호 만들기" />
      </Form>
    </Cont>
  );
};
