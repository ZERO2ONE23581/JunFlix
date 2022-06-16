import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../src/components/Style/Button';
import useMutation from '../../../src/libs/client/useMutation';
import { LinkWrap } from '../../../src/components/Style/LinkWrap';
import { IFindForm, IFindPostRes } from '../../../src/types/login';
import { Errors, Form, FormCont, Input, Page } from '../../../styles/global';
import { FindConfirmModal } from '../../../src/components/User/Profile/finduseridmodal';

const Find_Id: NextPage = () => {
  //Post
  const [postFindId, { loading, data }] = useMutation<IFindPostRes>(
    `/api/user/login/find/userId`
  );
  const [postToken, { loading: tokenLoading, data: tokenData }] =
    useMutation<IFindPostRes>(`/api/user/login/find/token-confirm`);

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
      return postToken(tokenNum);
    }
  };
  //
  return (
    <Page>
      {!tokenData?.ok ? (
        <FormCont>
          {!data?.ok ? (
            <Form onSubmit={handleSubmit(onValid)}>
              <label htmlFor="email" />
              <Input
                {...register('email', {
                  required: '이메일을 입력하세요.',
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: '이메일 형식이 올바르지 않습니다.',
                  },
                })}
                type="text"
                id="email"
                name="email"
                placeholder="이메일을 입력하세요."
              />
              {errors.email && <Errors>{errors.email.message}</Errors>}
              {data?.error && <Errors>{data?.error}</Errors>}
              <Btn type="submit" name="아이디 찾기" loading={loading} />
            </Form>
          ) : (
            <Form onSubmit={handleSubmit(onTokenValid)}>
              <label htmlFor="tokenNum" />
              <Input
                {...register('tokenNum', {
                  required: '6자리 토큰번호를 입력하세요.',
                })}
                type="text"
                id="tokenNum"
                name="tokenNum"
                placeholder="6자리 토큰번호를 입력하세요."
              />
              {errors.tokenNum && <Errors>{errors.tokenNum.message}</Errors>}
              {tokenData?.error && <Errors>{tokenData?.error}</Errors>}
              <Btn type="submit" name="토큰 인증하기" loading={tokenLoading} />
            </Form>
          )}
          <LinkWrap findId={true} />
        </FormCont>
      ) : (
        <FindConfirmModal userId={tokenData?.foundUser?.userId} />
      )}
    </Page>
  );
};

export default Find_Id;
