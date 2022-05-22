import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { Btn } from '../../src/components/Btn';
import { Input } from '../../src/components/Input';
import useMutation from '../../src/libs/client/useMutation';
import { IFindForm, IFindPostRes } from '../../src/types/login';
import { LoginLink } from '../../src/components/Login/LoginLink';
import { ErrMsg, Form, PageContainer } from '../../styles/components/default';
import { FindConfirmModal } from '../../src/components/Modal/FindConfirmModal';

const Find_Pw: NextPage = () => {
  //Post
  const [postFindPw, { loading, data }] = useMutation<IFindPostRes>(
    `/api/user/login/find/password`
  );
  const [postToken, { loading: tokenLoading, data: tokenData }] =
    useMutation<IFindPostRes>(`/api/user/login/find/token-confirm`);

  const [postCreateNewPw, { loading: newLoading, data: paswordUpdated }] =
    useMutation<IFindPostRes>(`/api/user/login/find/create-new-password`);

  //Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<IFindForm>({ mode: 'onSubmit' });

  const onValid = ({ userId }: IFindForm) => {
    if (loading) return;
    reset();
    return postFindPw(userId);
  };
  const onTokenValid = ({ tokenNum }: IFindForm) => {
    if (tokenLoading) return;
    if (data?.ok) {
      reset();
      return postToken(tokenNum);
    }
  };
  // const oldPassword = tokenData?.foundUser?.password;
  const id = tokenData?.foundUser?.id;
  const onPasswordValid = ({ newPassword, confirmPassword }: IFindForm) => {
    if (newPassword !== confirmPassword)
      return setError('confirmPassword', {
        message: '확인 비밀번호가 일치하지 않습니다.',
      });
    if (tokenData?.ok) {
      if (newLoading) return;
      return postCreateNewPw({ newPassword, id });
    }
  };
  //
  return (
    <PageContainer>
      {paswordUpdated?.ok && <FindConfirmModal />}
      {!tokenData?.ok ? (
        <>
          {!data?.ok ? (
            <Form onSubmit={handleSubmit(onValid)}>
              {data?.error && <ErrMsg>{data?.error}</ErrMsg>}
              <Input
                label="ID"
                type="text"
                name="userId"
                errMsg={errors.userId?.message}
                placeholder="아이디를 입력하세요."
                register={register('userId', {
                  required: '아이디를 입력해주세요.',
                })}
              />
              <Btn
                type="submit"
                btnName="아이디로 인증하기"
                loading={loading}
              />
            </Form>
          ) : (
            <Form onSubmit={handleSubmit(onTokenValid)}>
              {tokenData?.error && <ErrMsg>{tokenData?.error}</ErrMsg>}
              <Input
                type="text"
                name="tokenNum"
                label="Token"
                placeholder="6자리 토큰번호를 입력하세요."
                errMsg={errors.tokenNum?.message}
                register={register('tokenNum', {
                  required: '6자리 토큰번호를 입력하세요.',
                })}
              />
              <Btn
                type="submit"
                btnName="토큰 인증하기"
                loading={tokenLoading}
              />
            </Form>
          )}
        </>
      ) : (
        <>
          <Form onSubmit={handleSubmit(onPasswordValid)}>
            {paswordUpdated?.error && <ErrMsg>{paswordUpdated?.error}</ErrMsg>}

            <Input
              label="Password"
              type="password"
              name="newPassword"
              errMsg={errors.newPassword?.message}
              placeholder="새 비밀번호 입력하세요."
              register={register('newPassword', {
                required: '새 비밀번호 입력하세요.',
              })}
            />
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              errMsg={errors.confirmPassword?.message}
              placeholder="새 비밀번호 재입력하세요."
              register={register('confirmPassword', {
                required: '새 비밀번호 재입력하세요.',
              })}
            />
            <Btn
              type="submit"
              btnName="새로운 비밀번호 생성하기."
              loading={newLoading}
            />
          </Form>
        </>
      )}

      <LoginLink findPassword={true} />
    </PageContainer>
  );
};

export default Find_Pw;
