import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Btn } from '../../src/components/Btn';
import { Error, Input } from '../../src/components/Input';
import { IdModal } from '../../src/components/Join/IdModal';
import { JoinModal } from '../../src/components/Join/Modal';
import { useMutation } from '../../src/libs/client/useMutation';

export interface IJoinForm {
  username?: string;
  userId?: string;
  password?: string;
  confirmPw?: string;
  email?: string;
  userIdCheck?: string;
}

const Join: NextPage = () => {
  //Post api
  const [postJoin, { loading, data, error }] = useMutation('/api/user/join');

  //Submit Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    reset,
    setValue,
    getValues,
  } = useForm<IJoinForm>({ mode: 'onBlur' });

  const onValid = (formData: IJoinForm) => {
    if (!confirm) {
      setError('userId', {
        type: 'custom',
        message: '아이디 중복확인이 필요합니다!',
      });
      return;
    }
    if (loading) return;
    postJoin(formData);
  };

  //Prevet Overlap
  const [confirm, setConfirm] = useState(false);
  const confirmClick = () => {
    setConfirm(true);
    return setOpenIdModal((value) => !value);
  };

  //Modals
  const [openIdModal, setOpenIdModal] = useState(false);
  const [modal, setModal] = useState(false);
  const toggleClick = (idCheck: string, final: string) => {
    if (idCheck) return setOpenIdModal((value) => !value);
    if (final) return setModal((value) => !value);
  };
  // useEffect(() => {
  //   if (data?.ok) {
  //     setModal(true);
  //   }
  // }, [data]);

  //Set confirmed userId
  const [verifiedID, setVerifiedID] = useState('');
  const handleData = (data: any) => {
    setVerifiedID(data);
  };
  useEffect(() => {
    setValue('userId', verifiedID);
  }, [verifiedID]);

  //UI순서. 아이디입력 -> 버튼생성 -> 아이디확인 -> 패스워드생성 (+패스워드확인) -> 이메일생성 -> 회원가입
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
    <>
      {modal && <JoinModal toggleClick={toggleClick} />}

      {openIdModal && (
        <IdModal
          handleData={handleData}
          userId={getValues('userId')}
          confirmClick={confirmClick}
          toggleClick={toggleClick}
        />
      )}

      {state.openBtn && (
        <button onClick={() => setOpenIdModal((p) => !p)}>
          아이디 중복체크
        </button>
      )}

      <Form onSubmit={handleSubmit(onValid)}>
        <>
          {data?.error && <span>{data.error}</span>}
          {error && <span>{error}</span>}
        </>
        <Input
          label="NICK NAME"
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
        {confirm && (
          <>
            {state.layerTwo && (
              <Layer>
                <Input
                  label="PASSWORD"
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
                  label="CONFIRM PASSWORD"
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
                  label="EMAIL"
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
    </>
  );
};

export default Join;

const Layer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Form = styled.form`
  padding: 20px;
  border: 5px solid black;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 50%;
`;
