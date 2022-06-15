import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IEditProfileProps } from '../../../../pages/my/profile/edit';
import { Errors, Form, FormCont, Input } from '../../../../styles/global';
import useMutation from '../../../libs/client/useMutation';
import useUser from '../../../libs/client/useUser';
import { MutationRes } from '../../../types/mutation';
import { Btn } from '../../Button';

interface IEditPasswordForm {
  password?: string;
  newPassword?: string;
  confirmPassword?: string;
}
export const EditUserPassword = ({ user }: IEditProfileProps) => {
  const router = useRouter();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditPasswordForm>({ mode: 'onBlur' });
  const onValid = ({
    password,
    newPassword,
    confirmPassword,
  }: IEditPasswordForm) => {
    if (newPassword !== confirmPassword)
      return setError('confirmPassword', {
        message: '비밀번호가 일치하지 않습니다.',
      });
    if (loading) return;
    editPassword({ password, newPassword, confirmPassword });
  };
  const [editPassword, { loading, data }] = useMutation<MutationRes>(
    `/api/user/${user?.id}/edit/password`
  );
  useEffect(() => {
    if (data?.ok) {
      alert('회원님의 비밀번호가 수정되었습니다.');
      router.reload();
    }
  }, [data, router]);
  //
  return (
    <>
      <FormCont>
        <h1>Edit Password</h1>
        <Form onSubmit={handleSubmit(onValid)}>
          <label htmlFor="password" />
          <Input
            {...register('password', {
              required: '현재 비밀번호를 입력해주세요.',
            })}
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
          {errors.password && <Errors>{errors.password.message}</Errors>}

          <label htmlFor="newPassword" />
          <Input
            {...register('newPassword', {
              required: '새로운 비밀번호를 입력해주세요.',
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
            id="newPassword"
            name="newPassword"
            type="password"
            placeholder="New Password"
          />
          {errors.newPassword && <Errors>{errors.newPassword.message}</Errors>}

          <label htmlFor="confirmPassword" />
          <Input
            {...register('confirmPassword', {
              required: '새로운 비밀번호를 재입력해주세요.',
            })}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm New Password"
          />
          {errors.confirmPassword && (
            <Errors>{errors.confirmPassword.message}</Errors>
          )}

          {data?.error && <Errors>{data?.error}</Errors>}

          <div className="btn-flex">
            <Btn name="비밀번호 수정" type="submit" loading={loading} />
          </div>
        </Form>
      </FormCont>
    </>
  );
};
