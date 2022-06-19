import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../Style/Button';
import { InputWrap } from '../../../Style/Input';
import { ErrorMsg } from '../../../Style/ErrMsg';
import useMutation from '../../../../libs/client/useMutation';
import { Form, FormCont, Info, JoinCont } from '../../../../../styles/global';
import {
  IJoinForm,
  IJoinFormProps,
  IJoinFormRes,
} from '../../../../types/join';
import styled from '@emotion/styled';

export const CreateUser = ({
  setCreatedID,
  savedUserID,
  setOpenCreateAvatar,
}: IJoinFormProps) => {
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
    if (savedUserID) setValue('userId', savedUserID);
    if (data?.ok) {
      setOpenCreateAvatar((p: boolean) => !p);
      setCreatedID(data.createdID);
    }
  }, [savedUserID, setOpenCreateAvatar, setValue, data, setCreatedID]);
  return (
    <JoinCont>
      <h1>Create Your Account</h1>
      <h2>Step 2. 회원정보를 입력해 주세요.</h2>
      <Form onSubmit={handleSubmit(onValid)}>
        <InputWrap
          watch={watch('userId')}
          id="userId"
          type="text"
          label="ID"
          disabled
          inputErrMsg={errors.userId?.message}
          register={register('userId', { required: true })}
        />
        <div className="flex">
          <InputWrap
            watch={watch('password')}
            id="password"
            type="password"
            label="Password"
            inputErrMsg={errors.password?.message}
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
            label="Confirm"
            inputErrMsg={errors.confirmPassword?.message}
            register={register('confirmPassword', {
              required: '비밀번호를 재입력해주세요.',
            })}
          />
        </div>
        <h3>* Option (선택사항)</h3>
        <div className="flex">
          <InputWrap
            watch={watch('username')}
            id="username"
            type="text"
            label="Username"
            inputErrMsg={errors.username?.message}
            register={register('username', {
              maxLength: {
                value: 10,
                message: '사용하실 유저이름은 10자를 초과할수 없습니다.',
              },
            })}
          />
          <InputWrap
            watch={watch('email')}
            id="email"
            type="email"
            label="Email"
            inputErrMsg={errors.email?.message}
            register={register('email', {
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: '이메일 형식이 올바르지 않습니다.',
              },
            })}
          />
        </div>
        {data?.error && <ErrorMsg error={data.error} />}
        <Btn type="submit" name="회원가입" loading={loading} />
        <Info>
          <span>* 이름을 적지 않으면 'Anonymous'로 자동저장 됩니다.</span>
          <span>* 이름은 추후에 수정 가능합니다.</span>
        </Info>
      </Form>
    </JoinCont>
  );
};
