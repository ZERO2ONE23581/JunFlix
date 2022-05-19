import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { Btn } from '../../src/components/Btn';
import { Input } from '../../src/components/Input';
import useMutation from '../../src/libs/client/useMutation';
import { IFindForm, IPostRes } from '../../src/types/login';
import { LoginLink } from '../../src/components/Login/LoginLink';
import { ErrMsg, Form, PageContainer } from '../../styles/components/default';
import { FindConfirmModal } from '../../src/components/Modal/FindConfirmModal';

const Find_Id: NextPage = () => {
  //Post
  const [postFindId, { loading, data }] = useMutation<IPostRes>(
    `/api/user/login/find/userId`
  );
  const [postToken, { loading: tokenLoading, data: tokenData }] =
    useMutation<IPostRes>(`/api/user/login/find/token-confirm`);

  //Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<IFindForm>({ mode: 'onSubmit' });

  const onValid = ({ email }: IFindForm) => {
    if (loading) return;
    if (!email) setError('email', { message: '이메일을 입력해주세요.' });
    postFindId(email);
    reset();
  };
  //
  const onTokenValid = ({ tokenNum }: IFindForm) => {
    if (tokenLoading) return;
    if (data?.ok) {
      if (!tokenNum) setError('tokenNum', { message: '토큰을 입력해주세요.' });
      console.log(tokenNum);
      return postToken(tokenNum);
    }
  };
  //
  return (
    <PageContainer>
      {!tokenData?.ok ? (
        <>
          {!data?.ok ? (
            <Form onSubmit={handleSubmit(onValid)}>
              {data?.error && <ErrMsg>{data?.error}</ErrMsg>}
              <Input
                type="text"
                name="email"
                label="Email"
                placeholder="이메일을 입력하세요."
                errMsg={errors.email?.message}
                register={register('email', {
                  required: '이메일을 입력하세요.',
                })}
              />
              <Btn type="submit" btnName="아이디 찾기" loading={loading} />
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
          <LoginLink findId={true} />
        </>
      ) : (
        <FindConfirmModal userId={tokenData?.foundUser?.userId} />
      )}
    </PageContainer>
  );
};

export default Find_Id;
