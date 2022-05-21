import type { NextPage } from 'next';
import {
  ErrMsg,
  Form,
  Layer,
  PageContainer,
} from '../../styles/components/default';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Btn } from '../../src/components/Btn';
import { Input } from '../../src/components/Input';
import { IJoinForm, IJoinRes } from '../../src/types/join';
import useMutation from '../../src/libs/client/useMutation';
import { Title } from '../../src/components/Layout/parts/Title';
import { LoginLink } from '../../src/components/Login/LoginLink';
import { JoinConfirmModal } from '../../src/components/Modal/JoinConfirmModal';
import { UserIdCheckModal } from '../../src/components/Modal/UserIdCheckModal';

const Join: NextPage = () => {
  //Post api
  const [postJoin, { loading, data }] = useMutation<IJoinRes>('/api/user/join');

  //Form
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

  //중복아이디 방지
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
    confirmPw,
  }: IJoinForm) => {
    if (!confirm) {
      return setError('userIdCheckErr', {
        type: 'custom',
        message: '아이디 중복확인이 필요합니다!',
      });
    }
    if (password !== confirmPw) {
      return setError('confirmPw', {
        message: '비밀번호가 일치하지 않습니다.',
      });
    }
    if (loading) return;
    const userID = userId!.toUpperCase();
    postJoin({ username, userID, email, password, confirmPw });
  };

  //Modals
  const [modal, setModal] = useState(false);
  const [checkModal, setCheckModal] = useState(false);
  const toggleCheckModal = () => {
    return setCheckModal((value) => !value);
  };

  //Confirmation
  const [verifiedID, setVerifiedID] = useState('');
  const handleData = (data: any) => {
    setVerifiedID(data);
  };
  useEffect(() => {
    setValue('userId', verifiedID);
    if (verifiedID) clearErrors('userIdCheckErr');
  }, [verifiedID]);

  //UI
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
    setState((prev) => ({ ...prev, layerFour: Boolean(watch('confirmPw')) }));
    setState((prev) => ({ ...prev, layerFive: Boolean(watch('email')) }));
    if (data?.ok) {
      setModal(true);
    }
  }, [
    watch('username'),
    watch('userId'),
    watch('password'),
    watch('confirmPw'),
    watch('email'),
    data,
  ]);

  //
  return (
    <PageContainer>
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
                  label="Confirm Password"
                  register={register('confirmPw', {
                    required: '비번호를 재입력해주세요.',
                  })}
                  name="confirmPw"
                  type="password"
                  placeholder="비밀번호를 재입력해주세요."
                  errMsg={errors.confirmPw?.message}
                />
              </Layer>
            )}

            {state.layerFour && (
              <Layer>
                <Input
                  label="Email"
                  register={register('email', {
                    required: '이메일을 입력해주세요.',
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
        <Btn type="submit" btnName={loading ? 'Loading...' : '회원가입'} />
      </Form>

      <LoginLink joined={true} />
    </PageContainer>
  );
};
export default Join;
