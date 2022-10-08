import { useForm } from 'react-hook-form';
import { Btn } from '../../../Tools/Button';
import { IUserForm } from '../../../types/user';
import { ITheme } from '../../../../styles/theme';
import { InputWrap } from '../../../Tools/Input';
import useUser from '../../../libs/client/useUser';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Flex } from '../../../../styles/global';
import styled from '@emotion/styled';

interface IPasswordForm extends ITheme {
  loading: boolean;
  update: ({}) => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
export const Edit_Password = ({
  theme,
  update,
  loading,
  setLoading,
}: IPasswordForm) => {
  const { loggedInUser } = useUser();
  const userId = loggedInUser?.userId;
  const {
    watch,
    register,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: 'onSubmit' });
  //
  useEffect(() => {
    if (userId) setValue('userId', userId);
  }, [userId, setValue]);
  //
  const onValid = ({ password, newPassword, confirmPassword }: IUserForm) => {
    if (newPassword !== confirmPassword)
      return setError('confirmPassword', {
        message: '비밀번호가 일치하지 않습니다.',
      });
    if (loading) return;
    setLoading(true);
    update({ password, newPassword, confirmPassword });
  };
  //
  return (
    <>
      <Cont onSubmit={handleSubmit(onValid)}>
        <InputWrap
          theme={theme}
          id="password"
          type="password"
          label="Password"
          watch={watch('password')}
          error={errors.password?.message}
          register={register('password', {
            required: '현재 비밀번호를 입력해주세요.',
          })}
        />
        <Flex className="flex">
          <InputWrap
            theme={theme}
            type="password"
            id="newPassword"
            label="New Password"
            watch={watch('newPassword')}
            error={errors.newPassword?.message}
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
          />
          <InputWrap
            theme={theme}
            type="password"
            id="confirmPassword"
            label="Confirm Password"
            watch={watch('confirmPassword')}
            error={errors.confirmPassword?.message}
            register={register('confirmPassword', {
              required: '새로운 비밀번호를 재입력해주세요.',
            })}
          />
        </Flex>
        <Btn theme={theme} name="Update" type="submit" />
      </Cont>
    </>
  );
};
const Cont = styled.form`
  gap: 15px;
  .flex {
    align-items: flex-start;
  }
`;
