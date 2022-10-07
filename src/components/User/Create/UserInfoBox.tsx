import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { InputWrap } from '../../../Tools/Input';
import useMutation from '../../../libs/client/useMutation';
import { IJoinForm, IJoinFormRes } from '../../../types/user';
import { LoadingModal } from '../../../Tools/Modal/Loading';
import { ITheme } from '../../../../styles/theme';
import { Btn } from '../../../Tools/Button';
import { BoxTitle } from './Title';
import { ErrModal } from '../../../Tools/errorModal';
import { Box, Flex } from '../../../../styles/global';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { joinBoxVar } from '../../../../styles/variants';

export interface IUserInfoBox extends ITheme {
  isBox: boolean;
  savedID: string;
  setUserId: Dispatch<SetStateAction<boolean>>;
  setSecNext: Dispatch<SetStateAction<boolean>>;
  setCreatedId: Dispatch<SetStateAction<number>>;
}

export const UserInfoBox = ({
  isBox,
  theme,
  savedID,
  setSecNext,
  setUserId,
  setCreatedId,
}: IUserInfoBox) => {
  const [Loading, setLoading] = useState(false);
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
  useEffect(() => {
    if (savedID) setValue('userId', savedID);
  }, [savedID, setValue]);
  //
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
    setLoading(true);
    const userID = userId!.toUpperCase();
    createUser({ userID, password, confirmPassword, username, email });
  };
  const [createUser, { loading, data }] =
    useMutation<IJoinFormRes>('/api/user/create');

  //data result
  const [dataErr, setDataErr] = useState('');
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (data.error) setDataErr(data.error);
        if (data?.ok) {
          setSecNext(true);
          setCreatedId(data.createdID);
        }
      }, 1000);
    }
  }, [data, setDataErr, setSecNext, setCreatedId]);
  //
  return (
    <AnimatePresence>
      {isBox && (
        <>
          {!Loading && (
            <>
              <Cont
                className="box"
                exit="exit"
                initial="initial"
                animate="animate"
                custom={theme}
                variants={joinBoxVar}
              >
                <Btn
                  theme={theme}
                  type="button"
                  name="Back"
                  className="back"
                  onClick={() => setUserId(false)}
                />
                <BoxTitle type="userInfo" theme={theme} />
                <form onSubmit={handleSubmit(onValid)}>
                  <InputWrap
                    disabled
                    label="USER ID"
                    id="userId"
                    type="text"
                    theme={theme}
                    watch={watch('userId')}
                    register={register('userId', { required: true })}
                  />
                  <Flex className="flex">
                    <InputWrap
                      theme={theme}
                      id="password"
                      type="password"
                      label="Password"
                      watch={watch('password')}
                      error={errors.password?.message}
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
                      theme={theme}
                      type="password"
                      id="confirmPassword"
                      label="Confirm Password"
                      watch={watch('confirmPassword')}
                      error={errors.confirmPassword?.message}
                      register={register('confirmPassword', {
                        required: '비밀번호를 재입력해주세요.',
                      })}
                    />
                  </Flex>
                  <InputWrap
                    id="email"
                    type="email"
                    label="Email"
                    theme={theme}
                    watch={watch('email')}
                    error={errors.email?.message}
                    register={register('email', {
                      required: '이메일을 입력해주세요.',
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: '이메일 형식이 올바르지 않습니다.',
                      },
                    })}
                  />
                  <InputWrap
                    type="text"
                    id="username"
                    theme={theme}
                    label="Username"
                    watch={watch('username')}
                    error={errors.username?.message}
                    register={register('username', {
                      maxLength: {
                        value: 10,
                        message:
                          '사용하실 유저이름은 10자를 초과할수 없습니다.',
                      },
                    })}
                  />
                  <Btn theme={theme} type="submit" name="회원가입" />
                </form>
                <ErrModal
                  theme={theme}
                  error={dataErr}
                  setDataErr={setDataErr}
                />
              </Cont>
            </>
          )}
          {Loading && <LoadingModal theme={theme} />}
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Box)`
  min-width: 40vw;
  min-height: 70vh;
  max-width: 40vw;
  max-height: 90vh;
  justify-content: center;
  padding: 1.2em;
  .back {
    top: 2.5em;
    right: 2em;
    width: 80px;
    font-weight: 600;
    position: absolute;
  }
  .box-title {
    width: 80%;
    .wrap {
      .kor {
        font-size: 0.9em;
      }
      .eng {
        font-size: 1em;
        margin-right: 5px;
      }
    }
  }
  form {
    //border: 5px solid yellow;
    max-height: 400px;
    margin-top: 10px;
    gap: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .flex {
      //border: 2px solid yellow;
      align-items: flex-start;
    }
    .input-wrap {
      .err-msg {
        margin-top: 20px;
      }
      input {
        //margin-bottom: 10px;
      }
    }

    button {
      width: 100%;
      padding: 8px;
      font-size: 0.5em;
    }
  }
`;
