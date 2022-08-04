import { useEffect } from 'react';
import { Btn } from '../../Tools/Button';
import { useForm } from 'react-hook-form';
import { InputWrap } from '../../Tools/Input';
import { MutationRes } from '../../../types/mutation';
import useMutation from '../../../libs/client/useMutation';
import { Form } from '../../../../styles/global';
import { Heading } from '../Create/Heading';
import useUser from '../../../libs/client/useUser';
import { IUserForm } from '../../../types/user';
import styled from '@emotion/styled';
import { Box } from './UserId';
import { Errors } from '../../Tools/Errors';

export const Password = () => {
  const { loggedInUser } = useUser();
  const [editPassword, { loading, data }] = useMutation<MutationRes>(
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
      <Cont>
        <Heading type="edit-password" h1="Password (비밀번호)" />
        <Form onSubmit={handleSubmit(onValid)}>
          <InputWrap
            watch={watch('password')}
            id="password"
            type="password"
            label="Password"
            register={register('password', {
              required: '현재 비밀번호를 입력해주세요.',
            })}
          />
          <Flex>
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
              label="Confirm"
              register={register('confirmPassword', {
                required: '새로운 비밀번호를 재입력해주세요.',
              })}
            />
            <Btn name="Edit" type="submit" loading={loading} />
          </Flex>
        </Form>
      </Cont>
      <Errors errors={errors} />
    </>
  );
};
const Cont = styled(Box)`
  width: 440px;
  max-width: 440px;
  min-height: 100px;
`;
const Flex = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;
  button {
    width: 100px;
    height: 50px;
  }
`;
