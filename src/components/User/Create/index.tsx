import styled from '@emotion/styled';
import { Btn } from '../../Tools/Button';
import { useForm } from 'react-hook-form';
import { Errors } from '../../Tools/Errors';
import { InputWrap } from '../../Tools/Input';
import { Box } from '../../../../styles/global';
import useMutation from '../../../libs/client/useMutation';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { IJoinForm, IJoinFormRes } from '../../../types/user';
import { Title } from './Title';
import { LoadingModal } from '../../Tools/Modal/Loading';

export interface ICreateUser {
  saveId: string;
  setAvatar: Dispatch<SetStateAction<boolean>>;
  setCreatedId: Dispatch<SetStateAction<number>>;
}

export const CreateUser = ({
  saveId,
  setAvatar,
  setCreatedId,
}: ICreateUser) => {
  const {
    watch,
    setError,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IJoinForm>({
    mode: 'onSubmit',
  });
  const onValid = ({
    userId,
    password,
    confirmPassword,
    username,
    email,
  }: IJoinForm) => {
    if (password !== confirmPassword) {
      return setError('confirmPassword', {
        message: '비밀번호가 일치하지 않습니다.',
      });
    }
    if (loading) return;
    const userID = userId!.toUpperCase();
    createUser({ userID, password, confirmPassword, username, email });
  };
  const [createUser, { loading, data }] =
    useMutation<IJoinFormRes>('/api/user/create');
  useEffect(() => {
    if (saveId) setValue('userId', saveId);
    if (data?.error) alert(data.error);
    if (data?.ok) {
      setAvatar((p: boolean) => !p);
      setCreatedId(data.createdID);
    }
  }, [saveId, setAvatar, setValue, data, setCreatedId]);

  return (
    <>
      {!loading && (
        <form onSubmit={handleSubmit(onValid)}>
          <Cont>
            <div className="wrap">
              <Title
                kor="계정생성"
                eng="Create Account"
                type="create-user-info"
              />
              <h2>
                <span>Step 2.</span>
                <span className="kor">회원정보</span>
                <span>User Information</span>
              </h2>
            </div>
            <InputWrap
              watch={watch('userId')}
              id="userId"
              type="text"
              label="ID"
              disabled
              register={register('userId', { required: true })}
            />
            <div className="flex">
              <InputWrap
                watch={watch('password')}
                id="password"
                type="password"
                label="Password"
                register={register('password', {
                  required: '비밀번호를 입력해주세요.',
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
                  required: '비밀번호를 재입력해주세요.',
                })}
              />
            </div>
            <div className="flex">
              <InputWrap
                watch={watch('email')}
                id="email"
                type="email"
                label="Email"
                register={register('email', {
                  required: '이메일을 입력해주세요.',
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: '이메일 형식이 올바르지 않습니다.',
                  },
                })}
              />
              <InputWrap
                watch={watch('username')}
                id="username"
                type="text"
                label="Username"
                register={register('username', {
                  maxLength: {
                    value: 10,
                    message: '사용하실 유저이름은 10자를 초과할수 없습니다.',
                  },
                })}
              />
            </div>
            <Btn
              type="submit"
              name="회원가입"
              loading={loading}
              CLASSNAME="submit-btn"
            />
          </Cont>
          <Errors errors={errors} />
        </form>
      )}
      {loading && <LoadingModal type="loading" zIndex={1} />}
    </>
  );
};
const Cont = styled(Box)`
  gap: 18px;
  max-width: 440px;
  .submit-btn {
    margin-top: 12px;
  }
  .wrap {
    h1,
    h2 {
      margin-bottom: 10px;
    }
  }
`;
