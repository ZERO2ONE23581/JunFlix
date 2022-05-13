import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Btn } from '../../src/components/Btn';
import { Error, Input } from '../../src/components/Input';
import { JoinModal } from '../../src/components/Modal/JoinConfirm';
import { IdCheckModal } from '../../src/components/Modal/UserIdCheck';
import { Form, Layer } from '../../styles/join-style';
import { IJoinForm, IJoinRes } from '../../src/types/join';
import useMutation from '../../src/libs/client/useMutation';
import { Title } from '../../src/components/Layout/parts/Title';

const Join: NextPage = () => {
  //Post api
  const [postJoin, { loading, data, error }] =
    useMutation<IJoinRes>('/api/user/join');

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

  const onValid = (formData: IJoinForm) => {
    if (!confirm) {
      return setError('dupUserId', {
        type: 'custom',
        message: '아이디 중복확인이 필요합니다!',
      });
    }
    if (loading) return;
    postJoin(formData);
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
    if (verifiedID) clearErrors('dupUserId');
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
    <>
      <Title title="회원가입" />
      {modal && <JoinModal />}

      {checkModal && (
        <IdCheckModal
          handleData={handleData}
          userId={getValues('userId')}
          confirmClick={confirmClick}
          toggleCheckModal={toggleCheckModal}
          confirm={confirm}
        />
      )}

      {state.openBtn && (
        <Btn
          type="button"
          btnName={confirm ? '아이디 재입력' : '아이디 중복체크'}
          onClick={() => setCheckModal((p) => !p)}
        />
      )}
      {errors.dupUserId && <Error>{errors.dupUserId.message}</Error>}

      <Form onSubmit={handleSubmit(onValid)}>
        {data?.error && <span>{data.error}</span>}
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
