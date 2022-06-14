import { ErrMsg, Form, Layer } from '../../styles/default';
import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Btn } from '../../src/components/Button';
import { Input } from '../../src/components/Input';
import { IJoinForm, IJoinRes } from '../../src/types/join';
import useMutation from '../../src/libs/client/useMutation';
import { Title } from '../../src/components/Layout/Title';
import { LoginLink } from '../../src/components/Login/LoginLink';
import { JoinConfirmModal } from '../../src/components/Modal/Join/Confirm';
import { UserIdCheckModal } from '../../src/components/Modal/Join/DupCheck';

const Join: NextPage = () => {
  const [createUser, { loading, data }] =
    useMutation<IJoinRes>('/api/user/join');
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
    setValue,
    getValues,
  } = useForm<IJoinForm>({ mode: 'onBlur' });
  //
  const [confirm, setConfirm] = useState(false);
  const confirmClick = () => {
    setConfirm(true);
    return setCheckModal((value) => !value);
  };
  const onValid = ({
    username,
    userId,
    email,
    password,
    passwordConfirm,
  }: IJoinForm) => {
    if (!confirm) {
      return setError('userIdCheckErr', {
        type: 'custom',
        message: '아이디 중복확인이 필요합니다!',
      });
    }
    if (password !== passwordConfirm) {
      return setError('passwordConfirm', {
        message: '비밀번호가 일치하지 않습니다.',
      });
    }
    if (loading) return;
    const userID = userId!.toUpperCase();
    createUser({ username, userID, email, password, passwordConfirm });
  };
  //
  const [modal, setModal] = useState(false);
  const [checkModal, setCheckModal] = useState(false);
  const toggleCheckModal = () => {
    return setCheckModal((value) => !value);
  };
  //
  const [verifiedID, setVerifiedID] = useState('');
  const handleData = (data: any) => {
    setVerifiedID(data);
  };
  useEffect(() => {
    setValue('userId', verifiedID);
    if (verifiedID) clearErrors('userIdCheckErr');
  }, [verifiedID]);
  //
  const [state, setState] = useState({
    openBtn: false,
    layerOne: false,
    layerTwo: false,
    layerThree: false,
    layerFour: false,
    layerFive: false,
  });
  //
  useEffect(() => {
    setState((prev) => ({ ...prev, openBtn: Boolean(watch('userId')) }));
    setState((prev) => ({ ...prev, layerOne: Boolean(watch('username')) }));
    setState((prev) => ({ ...prev, layerTwo: Boolean(watch('userId')) }));
    setState((prev) => ({ ...prev, layerThree: Boolean(watch('password')) }));
    setState((prev) => ({
      ...prev,
      layerFour: Boolean(watch('passwordConfirm')),
    }));
    setState((prev) => ({ ...prev, layerFive: Boolean(watch('email')) }));
    if (data?.ok) {
      setModal(true);
    }
  }, [
    watch('username'),
    watch('userId'),
    watch('password'),
    watch('passwordConfirm'),
    watch('email'),
    data,
  ]);
  //
  return (
    <PageSection>
      <Title title="회원가입" />
      {modal && <JoinConfirmModal toggleCheckModal={toggleCheckModal} />}
      {checkModal && (
        <UserIdCheckModal
          handleData={handleData}
          userId={getValues('userId')}
          confirmClick={confirmClick}
          toggleCheckModal={toggleCheckModal}
          confirm={confirm}
        />
      )}

      <Form onSubmit={handleSubmit(onValid)}>
        {data?.error && <ErrMsg>{data.error}</ErrMsg>}
        <Input
          label="Username"
          register={register('username', {
            required: '닉네임을 입력해주세요.',
            maxLength: {
              value: 25,
              message: '사용하실 닉네임은 25자를 초과할수 없습니다.',
            },
          })}
          name="username"
          type="text"
          placeholder="닉네임을 입력해주세요."
          errMsg={errors.username?.message}
        />

        {state.layerOne && (
          <Layer>
            <Input
              disabled={confirm ? true : false}
              label="ID"
              register={register('userId', {
                required: '아이디를 입력해주세요.',
                pattern: {
                  value: /^[a-z]+[a-z0-9]{5,19}$/g,
                  message:
                    '아이디는 기호를 제외한 영문자 또는 6~20자리 숫자를 포함해야합니다.',
                },
              })}
              name="userId"
              type="text"
              placeholder="아이디를 입력해주세요."
              errMsg={errors.userId?.message}
            />
          </Layer>
        )}
        {state?.openBtn && (
          <Btn
            type="idCheck"
            btnName={confirm ? '아이디 재입력' : '아이디 중복체크'}
            onClick={toggleCheckModal}
          />
        )}
        {errors.userIdCheckErr && (
          <ErrMsg>{errors.userIdCheckErr.message}</ErrMsg>
        )}
        {confirm && (
          <>
            {state.layerTwo && (
              <Layer>
                <Input
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
                  name="password"
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  errMsg={errors.password?.message}
                />
              </Layer>
            )}

            {state.layerThree && (
              <Layer>
                <Input
                  register={register('passwordConfirm', {
                    required: '비번호를 재입력해주세요.',
                  })}
                  type="password"
                  name="passwordConfirm"
                  label="Confirm Password"
                  placeholder="비밀번호를 재입력해주세요."
                  errMsg={errors.passwordConfirm?.message}
                />
              </Layer>
            )}

            {state.layerFour && (
              <Layer>
                <Input
                  label="Email"
                  register={register('email', {
                    required: '이메일을 입력해주세요.',
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: '이메일 형식이 올바르지 않습니다.',
                    },
                  })}
                  name="email"
                  type="email"
                  placeholder="이메일을 입력해주세요."
                  errMsg={errors.email?.message}
                />
              </Layer>
            )}
          </>
        )}
        <Btn type="register" btnName={loading ? 'Loading...' : '회원가입'} />
      </Form>

      <LoginLink joined={true} />
    </PageSection>
  );
};
export default Join;
