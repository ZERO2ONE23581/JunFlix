import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Svg } from '../../../Tools/Svg';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../Tools/Button';
import { InputWrap } from '../../../Tools/Input';
import { Flex, Form } from '../../../../styles/global';
import { useLength } from '../../../libs/client/useTools';
import { ICreateUser, IUserForm } from '../../../types/user';

export const CreateUserInfo = ({ wrap, isType }: ICreateUser) => {
  const {
    watch,
    setError,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({
    mode: 'onSubmit',
  });
  useEffect(() => {
    if (wrap.id?.userId) setValue('userId', wrap.id.userId);
    if (wrap) {
    }
  }, [wrap.id, setValue]);
  //
  const onValid = ({
    email,
    userId,
    password,
    username,
    pw_confirm,
  }: IUserForm) => {
    if (username) {
      const max = 20;
      if (useLength(username)! > max) {
        return setError('username', {
          msg: `유저의 이름은 ${max}를 초과할 수 없습니다. (Length of the username can't exeed ${max}.)`,
        });
      }
    }
    if (password !== pw_confirm) {
      return setError('pw_confirm', {
        msg: '비밀번호가 일치하지 않습니다.',
      });
    }
    if (wrap.loading) return;
    wrap.setLoading(true);
    wrap.post({
      email,
      username,
      password,
      pw_confirm,
      userId: userId?.toUpperCase(),
    });
  };
  //
  const router = useRouter();
  const theme = wrap.theme;
  return (
    <>
      {isType && (
        <Cont onSubmit={handleSubmit(onValid)}>
          <Svg
            theme={theme}
            type="left-arrow"
            onClick={() => router.reload()}
          />
          <InputWrap
            disabled
            id="userId"
            type="text"
            theme={theme}
            label="USER ID"
            watch={Boolean(watch('userId'))}
            register={register('userId', { required: true })}
          />
          <Flex className="flex">
            <InputWrap
              theme={theme}
              id="password"
              type="password"
              label="Password"
              watch={Boolean(watch('password'))}
              error={errors.password?.msg}
              register={register('password', {
                required: '비밀번호를 입력해주세요.',
                minLength: {
                  value: 8,
                  msg: '비밀번호는 최소 8자리여야 합니다.',
                },
                maxLength: {
                  value: 16,
                  msg: '비밀번호는 최대 16자리여야 합니다.',
                },
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/,
                  msg: '비밀번호는 최소 1개이상의 숫자, 문자, 정의된 특수문자를 포함해야 합니다.',
                },
              })}
            />
            <InputWrap
              theme={theme}
              type="password"
              id="pw_confirm"
              label="Confirm Password"
              watch={Boolean(watch('pw_confirm'))}
              error={errors.pw_confirm?.msg}
              register={register('pw_confirm', {
                required: '비밀번호를 재입력해주세요.',
              })}
            />
          </Flex>
          <InputWrap
            id="email"
            type="email"
            label="Email"
            theme={theme}
            watch={Boolean(watch('email'))}
            error={errors.email?.msg}
            register={register('email', {
              required: '이메일을 입력해주세요.',
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                msg: '이메일 형식이 올바르지 않습니다.',
              },
            })}
          />
          <InputWrap
            type="text"
            id="username"
            theme={theme}
            label="Username"
            register={register('username')}
            error={errors.username?.msg}
            watch={Boolean(watch('username'))}
          />
          <Btn item={{ theme, name: 'Submit' }} type="submit" />
        </Cont>
      )}
    </>
  );
};
const Cont = styled(Form)`
  .left-arrow {
    top: 50px;
    right: 10px;
    width: 80px;
    position: absolute;
  }
  gap: 20px;
`;
