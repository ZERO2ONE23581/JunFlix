import { useForm } from 'react-hook-form';
import { Btn } from '../../../Tools/Button';
import { IEditUser, IUserForm } from '../../../types/user';
import { InputWrap } from '../../../Tools/Input';
import useUser from '../../../libs/client/useUser';
import { useEffect } from 'react';
import { Flex, Form } from '../../../../styles/global';
import styled from '@emotion/styled';

export const Password_Form = ({ dataWrap }: IEditUser) => {
  const type = dataWrap.type;
  const post = dataWrap.post;
  const theme = dataWrap.theme;
  const loading = dataWrap.loading;
  const setLoading = dataWrap.setLoading;
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
  const onValid = ({ password, newPassword, pw_confirm }: IUserForm) => {
    if (newPassword !== pw_confirm)
      return setError('pw_confirm', {
        message: '비밀번호가 일치하지 않습니다.',
      });
    if (loading) return;
    setLoading(true);
    post({ password, newPassword, pw_confirm });
  };
  //
  return (
    <>
      {type === 'password' && (
        <Cont onSubmit={handleSubmit(onValid)}>
          <InputWrap
            theme={theme}
            id="password"
            type="password"
            label="Password"
            watch={Boolean(watch('password'))}
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
              watch={Boolean(watch('newPassword'))}
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
              id="pw_confirm"
              label="Confirm Password"
              error={errors.pw_confirm?.message}
              watch={Boolean(watch('pw_confirm'))}
              register={register('pw_confirm', {
                required: '새로운 비밀번호를 재입력해주세요.',
              })}
            />
          </Flex>
          <Btn theme={theme} name="Update" type="submit" />
        </Cont>
      )}
    </>
  );
};
const Cont = styled(Form)`
  gap: 20px;
  .input-wrap {
    gap: 20px;
  }
`;
