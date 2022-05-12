import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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
  idCheckError?: string;
}

const Join: NextPage = () => {
  //Post
  const [postJoin, { loading, data, error }] = useMutation('/api/user/join');

  //Form
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
  //

  const onValid = (formData: IJoinForm) => {
    //아이디 중복체크
    if (!confirm) {
      return setError('idCheckError', {
        message: '아이디 중복확인을 실행해주세요.',
      });
    }

    return;
    if (loading) return;
    postJoin(formData);
  };

  const [confirm, setConfirm] = useState(false);
  const confirmClick = () => {
    setConfirm(true);
    return setOpenIdModal((value) => !value);
  };

  //Modal
  const [modal, setModal] = useState(false);
  const [openIdModal, setOpenIdModal] = useState(false);
  const [openBtn, setOpenBtn] = useState(false);

  useEffect(() => {
    if (data?.ok) {
      setModal(true);
    }
  }, [data]);

  const toggleClick = (idCheck: string, final: string) => {
    if (idCheck) return setOpenIdModal((value) => !value);
    if (final) return setModal((value) => !value);
  };

  //UI
  const [state, setState] = useState({
    layerOne: false,
    layerTwo: false,
    layerThree: false,
    layerFour: false,
    layerFive: false,
  });
  //
  useEffect(() => {
    setOpenBtn(Boolean(watch('userId')));
    setState((prev) => ({ ...prev, layerOne: Boolean(watch('username')) }));
    setState((prev) => ({ ...prev, layerTwo: Boolean(watch('userId')) }));
    setState((prev) => ({ ...prev, layerThree: Boolean(watch('password')) }));
    setState((prev) => ({ ...prev, layerFour: Boolean(watch('confirmPw')) }));
    setState((prev) => ({ ...prev, layerFive: Boolean(watch('email')) }));
  }, [
    watch('username'),
    watch('userId'),
    watch('password'),
    watch('confirmPw'),
    watch('email'),
  ]);

  //GET VALUE FROM MODAL
  const [dataFromModal, setDataFromModal] = useState('');
  const handleData = (data: any) => {
    setDataFromModal(data);
  };
  useEffect(() => {
    setValue('userId', dataFromModal);
  }, [dataFromModal]);

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

      {openBtn && (
        <button onClick={() => setOpenIdModal((p) => !p)}>
          아이디 중복체크
        </button>
      )}

      <Form onSubmit={handleSubmit(onValid)}>
        {!confirm && <Error>{errors?.idCheckError?.message}</Error>}
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
          <FirstLayer>
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

            {confirm && state.layerTwo && (
              <SecondLayer>
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
                {state.layerThree && (
                  <ThirdLayer>
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
                    {state.layerFour && (
                      <FourthLayer>
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
                      </FourthLayer>
                    )}
                  </ThirdLayer>
                )}
              </SecondLayer>
            )}
          </FirstLayer>
        )}

        <Input type="submit" btnName={loading ? 'Loading...' : '회원가입'} />
      </Form>
    </>
  );
};

export default Join;

const FirstLayer = styled.div`
  border: 5px solid red;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const SecondLayer = styled(FirstLayer)`
  border: 4px solid orange;
`;
const ThirdLayer = styled(SecondLayer)`
  border: 3px solid yellow;
`;
const FourthLayer = styled(ThirdLayer)`
  border: 2px solid green;
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
