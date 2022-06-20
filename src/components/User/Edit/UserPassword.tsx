import Link from 'next/link';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../Style/Button';
import { useForm } from 'react-hook-form';
import { ErrorMsg } from '../../Style/ErrMsg';
import { InputWrap } from '../../Style/Input';
import { MutationRes } from '../../../types/mutation';
import { IEditProfileProps } from '../../../types/user';
import useMutation from '../../../libs/client/useMutation';
import { Form, FormCont, Info } from '../../../../styles/global';

interface IEditPasswordForm {
  password?: string;
  newPassword?: string;
  confirmPassword?: string;
}
export const EditUserPassword = ({ user }: IEditProfileProps) => {
  const router = useRouter();
  const {
    watch,
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
  return (
    <Cont>
      <h1>Edit Password</h1>
      <Form onSubmit={handleSubmit(onValid)}>
        <InputWrap
          watch={watch('password')}
          id="password"
          type="password"
          label="Password"
          inputErrMsg={errors.password?.message}
          register={register('password', {
            required: '현재 비밀번호를 입력해주세요.',
          })}
        />
        <InputWrap
          watch={watch('newPassword')}
          id="newPassword"
          type="password"
          label="New Password"
          inputErrMsg={errors.newPassword?.message}
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
          inputErrMsg={errors.confirmPassword?.message}
          register={register('confirmPassword', {
            required: '새로운 비밀번호를 재입력해주세요.',
          })}
        />
        {data?.error && <ErrorMsg error={data.error} />}
        <Btn name="비밀번호 수정" type="submit" loading={loading} />
      </Form>
      <FindPassword>
        <span>비밀번호가 기억나지 않습니까?</span>
        <span>
          <Link href="/user/login/find/password">
            <a>&rarr; 비밀번호 찾기</a>
          </Link>
        </span>
      </FindPassword>
    </Cont>
  );
};
export const Cont = styled(FormCont)``;

const FindPassword = styled(Info)`
  margin-top: 20px;
  a {
    :hover {
      color: ${(p) => p.theme.color.font};
      font-weight: 600;
    }
  }
`;
