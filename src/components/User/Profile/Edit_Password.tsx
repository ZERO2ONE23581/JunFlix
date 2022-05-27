import { Btn } from '../../Btn';
import { useEffect } from 'react';
import { Input } from '../../Input';
import { useForm } from 'react-hook-form';
import useUser from '../../../libs/client/loggedInUser';
import useMutation from '../../../libs/client/useMutation';
import { ErrMsg, Form, OkMsg } from '../../../../styles/components/default';

interface IEditPassword {
  currentPassword?: string;
  password?: string;
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
  } = useForm<IEditPassword>({ mode: 'onSubmit' });

  const onValid = ({
    currentPassword,
    password,
    passwordConfirm,
  }: IEditPassword) => {
    if (password !== passwordConfirm)
      return setError('passwordConfirm', {
        message: '비밀번호가 일치하지 않습니다.',
      });
    if (loading) return;
    editPassword({ currentPassword, password, passwordConfirm });
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
    <>
      <Form onSubmit={handleSubmit(onValid)}>
        <>
          {data && (
            <>
              {data.ok && <OkMsg>비밀번호가 수정되었습니다.</OkMsg>}
              {data.error && <ErrMsg>{data.error}</ErrMsg>}
            </>
          )}
          {errors.passwordConfirm && (
            <ErrMsg>{errors.passwordConfirm.message}</ErrMsg>
          )}
        </>

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
          name="password"
          label="New Password"
          placeholder="새로운 비밀번호를 입력해주세요."
          register={register('password', {
            required: '새로운 비밀번호를 입력해주세요.',
          })}
          errMsg={errors.password?.message}
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
    </>
  );
};
