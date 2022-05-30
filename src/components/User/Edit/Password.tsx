import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { ErrMsg, Form, OkMsg } from '../../../../styles/default';
import useMutation from '../../../libs/client/useMutation';
import useUser from '../../../libs/client/useUser';
import { Btn } from '../../Button';
import { Input } from '../../Input';

interface IEditPasswordForm {
  currentPassword?: string;
  newPassword?: string;
  passwordConfirm?: string;
}
interface IEditPasswordRes {
  ok: boolean;
  error?: string;
}

export const Edit_Password = () => {
  const { loggedInUserId } = useUser();
  const [editPassword, { loading, data }] = useMutation<IEditPasswordRes>(
    `/api/user/${loggedInUserId}/edit/profile/password`
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IEditPasswordForm>({ mode: 'onSubmit' });

  const onValid = ({
    currentPassword,
    newPassword,
    passwordConfirm,
  }: IEditPasswordForm) => {
    if (newPassword !== passwordConfirm)
      return setError('passwordConfirm', {
        message: '비밀번호가 일치하지 않습니다.',
      });
    if (loading) return;
    editPassword({ currentPassword, newPassword, passwordConfirm });
  };
  //Set up
  useEffect(() => {
    if (data?.ok) {
      setTimeout(() => {
        location.reload();
      }, 2000);
    }
  }, [data]);
  //
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      {data?.ok && <OkMsg>비밀번호가 수정되었습니다.</OkMsg>}
      {data?.error && <ErrMsg>{data.error}</ErrMsg>}
      <Input
        type="password"
        name="currentPassword"
        label="Current Password"
        placeholder="현재 비밀번호를 입력해주세요."
        register={register('currentPassword', {
          required: '현재 비밀번호를 입력해주세요.',
        })}
        errMsg={errors.currentPassword?.message}
      />
      <Input
        type="password"
        name="newPassword"
        label="New Password"
        placeholder="새로운 비밀번호를 입력해주세요."
        register={register('newPassword', {
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
        errMsg={errors.newPassword?.message}
      />
      <Input
        type="password"
        name="passwordConfirm"
        label="New Password Confirm"
        placeholder="새로운 비밀번호를 재입력해주세요."
        register={register('passwordConfirm', {
          required: '새로운 비밀번호를 재입력해주세요.',
        })}
        errMsg={errors.passwordConfirm?.message}
      />
      <Btn type="submit" loading={loading} btnName="SAVE" />
    </Form>
  );
};
