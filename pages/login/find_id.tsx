import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { Form } from '../../styles/formStyle';
import { Btn } from '../../src/components/Btn';
import { Input } from '../../src/components/Input';
import useMutation from '../../src/libs/client/useMutation';
import { IFindForm, IPostRes } from '../../src/types/login';
import { ErrMsg, FindIdPageCont } from '../../styles/defaultStyle';
import { ConfirmModal } from '../../src/components/Modal/ConfirmModal';

const Find_Id: NextPage = () => {
  //Post
  const [postFindId, { loading, data }] = useMutation<IPostRes>(
    `/api/user/login/find/userId`
  );
  const [postToken, { loading: tokenLoading, data: tokenData }] =
    useMutation<IPostRes>(`/api/user/login/find/tokenAuth`);

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
    reset();
    return postFindId(email);
  };
  //
  const onTokenValid = ({ tokenNum }: IFindForm) => {
    if (tokenLoading) return;
    if (data?.ok) {
      if (!tokenNum) setError('tokenNum', { message: '토큰을 입력해주세요.' });
      return postToken(tokenNum);
    }
  };
  //
  return (
    <FindIdPageCont>
      {tokenData?.ok ? (
        <ConfirmModal userId={tokenData?.foundUser?.userId} />
      ) : (
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
        </>
      )}
    </FindIdPageCont>
  );
};

export default Find_Id;
