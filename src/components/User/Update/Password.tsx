import { useEffect } from 'react';
import { Btn } from '../../../Tools/Button';
import { useForm } from 'react-hook-form';
import { InputWrap } from '../../../Tools/Input';
import useMutation from '../../../libs/client/useMutation';
import useUser from '../../../libs/client/useUser';
import { IUserForm } from '../../../types/user';
import styled from '@emotion/styled';
import { Errors } from '../../../Tools/Errors';
import { Title } from '../../../Tools/Title';
import { Box } from '../../../../styles/global';
import { IData } from '../../../types/global';
import { UserBox } from './UserId';

export const Password = () => {
  const { loggedInUser } = useUser();
  const [editPassword, { loading, data }] = useMutation<IData>(
    `/api/user/${loggedInUser?.id}/edit/password`
  );

  const {
    watch,
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: 'onBlur' });

  const onValid = ({ password, newPassword, confirmPassword }: IUserForm) => {
    if (newPassword !== confirmPassword)
      return setError('confirmPassword', {
        message: '비밀번호가 일치하지 않습니다.',
      });
    if (loading) return;
    editPassword({ password, newPassword, confirmPassword });
  };

  useEffect(() => {
    if (data?.error) alert(data.error);
    if (data?.ok) {
      alert('비밀번호가 수정되었습니다.');
    }
  }, [data]);
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <Cont>
          <Title type="edit-password" eng="Password" />
          <InputWrap
            watch={watch('password')}
            id="password"
            type="password"
            label="Password"
            register={register('password', {
              required: '현재 비밀번호를 입력해주세요.',
            })}
          />
          <div className="flex">
            <InputWrap
              watch={watch('newPassword')}
              id="newPassword"
              type="password"
              label="New Password"
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
              watch={watch('confirmPassword')}
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              register={register('confirmPassword', {
                required: '새로운 비밀번호를 재입력해주세요.',
              })}
            />
          </div>
          <Btn name="Edit" type="submit" loading={loading} />
        </Cont>
        <Errors errors={errors} />
      </form>
    </>
  );
};
const Cont = styled(UserBox)`
  width: 400px;
`;
