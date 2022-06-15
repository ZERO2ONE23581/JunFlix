import { useEffect } from 'react';
import { Btn } from '../../Button';
import { useForm } from 'react-hook-form';
import useMutation from '../../../libs/client/useMutation';
import { Errors, Form, FormCont, Input } from '../../../../styles/global';
import { IJoinForm, IJoinFormProps, IJoinFormRes } from '../../../types/join';

export const CreateUser = ({
  setCreatedID,
  UserId,
  confirmId,
  joinSuccess,
  setJoinSuccess,
}: IJoinFormProps) => {
  const {
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
  //
  useEffect(() => {
    if (UserId) setValue('userId', UserId);
    if (data?.ok) {
      setJoinSuccess((p: boolean) => !p);
      setCreatedID(data.createdID);
    }
  }, [UserId, setJoinSuccess, setValue, data, setCreatedID]);
  //
  return (
    <>
      {confirmId && !joinSuccess && (
        <FormCont>
          <h1>Create Your Account</h1>
          <h2>Step 2</h2>
          <Form onSubmit={handleSubmit(onValid)}>
            <label htmlFor="userId" />
            <Input
              className="user-id"
              {...register('userId')}
              id="userId"
              name="userId"
              type="text"
              disabled
            />

            <div className="flex">
              <label htmlFor="password" />
              <Input
                placeholder="Password"
                {...register('password', {
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
                id="password"
                name="password"
                type="password"
              />

              <label htmlFor="confirmPassword" />
              <Input
                placeholder="Confirm Password"
                {...register('confirmPassword', {
                  required: '비밀번호를 재입력해주세요.',
                })}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
              />
            </div>

            {(errors.password || errors.confirmPassword) && (
              <div className="flex">
                {errors.password && <Errors>{errors.password.message}</Errors>}
                {errors.confirmPassword && (
                  <Errors>{errors.confirmPassword.message}</Errors>
                )}
              </div>
            )}

            <h3>(Optional)</h3>
            <div className="flex">
              <label htmlFor="username" />
              <Input
                placeholder="Username"
                {...register('username', {
                  maxLength: {
                    value: 25,
                    message: '사용하실 닉네임은 25자를 초과할수 없습니다.',
                  },
                })}
                id="username"
                name="username"
                type="text"
              />
              <label htmlFor="email" />
              <Input
                placeholder="Email"
                {...register('email', {
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: '이메일 형식이 올바르지 않습니다.',
                  },
                })}
                id="email"
                name="email"
                type="email"
              />
            </div>
            {(errors.username || errors.username) && (
              <div className="flex">
                {errors.username && <Errors>{errors.username.message}</Errors>}
                {errors.email && <Errors>{errors.email.message}</Errors>}
              </div>
            )}
            <span className="info">
              <span>* 이름을 적지 않으면 'Anonymous'로 자동저장 됩니다.</span>
              <span>이름은 추후에 수정 가능합니다.</span>
            </span>

            <div className="btn-flex">
              <Btn type="submit" name="회원가입" loading={loading} />
            </div>
            {data?.error && <Errors>{data?.error}</Errors>}
          </Form>
        </FormCont>
      )}
    </>
  );
};
