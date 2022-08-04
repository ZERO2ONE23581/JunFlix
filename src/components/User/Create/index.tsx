import { IJoinForm, IJoinFormRes } from '../../../types/join';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Btn } from '../../Tools/Button';
import { InputWrap } from '../../Tools/Input';
import useMutation from '../../../libs/client/useMutation';
import { Form } from '../../../../styles/global';
import { Heading } from './Heading';
import { Errors } from '../../Tools/Errors';

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
      <Heading
        type="userInfo"
        h1="Create Account"
        h2="Step 2. Information (회원정보)"
      />
      <Form onSubmit={handleSubmit(onValid)}>
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
        <h3>* Option (선택사항)</h3>
        <div className="flex">
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
        <Btn type="submit" name="회원가입" loading={loading} />
      </Form>
      <Errors errors={errors} />
    </>
  );
};
