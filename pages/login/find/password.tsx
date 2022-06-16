import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../src/components/Style/Button';
import useMutation from '../../../src/libs/client/useMutation';
import { LinkWrap } from '../../../src/components/Style/LinkWrap';
import { IFindForm, IFindPostRes } from '../../../src/types/login';
import { Errors, Form, FormCont, Input, Page } from '../../../styles/global';
import { FindConfirmModal } from '../../../src/components/User/Profile/finduseridmodal';

const Find_Pw: NextPage = () => {
  const [postFindPw, { loading, data }] = useMutation<IFindPostRes>(
    `/api/user/login/find/password`
  );
  const [postToken, { loading: tokenLoading, data: tokenData }] =
    useMutation<IFindPostRes>(`/api/user/login/find/token-confirm`);
  const [postCreateNewPw, { loading: newLoading, data: paswordUpdated }] =
    useMutation<IFindPostRes>(`/api/user/login/find/new-password`);
  const {
    reset,
    setError,
    register,
    handleSubmit,
    formState: { errors },
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
  const foundUserId = tokenData?.foundUser?.id;
  const onPasswordValid = ({ newPassword, confirmPassword }: IFindForm) => {
    if (newPassword !== confirmPassword)
      return setError('confirmPassword', {
        message: '확인 비밀번호가 일치하지 않습니다.',
      });
    if (tokenData?.ok) {
      if (newLoading) return;
      return postCreateNewPw({ newPassword, foundUserId });
    }
  };
  return (
    <Page>
      {paswordUpdated?.ok && <FindConfirmModal />}
      {!tokenData?.ok ? (
        <FormCont>
          {!data?.ok ? (
            <Form onSubmit={handleSubmit(onValid)}>
              <label htmlFor="userId" />
              <Input
                {...register('userId', {
                  required: '아이디를 입력해주세요.',
                })}
                type="text"
                id="userId"
                name="userId"
                placeholder="아이디를 입력하세요."
              />
              {errors.userId && <Errors>{errors.userId.message}</Errors>}
              {data?.error && <Errors>{data?.error}</Errors>}
              <Btn type="submit" name="아이디로 인증하기" loading={loading} />
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
        </FormCont>
      ) : (
        <FormCont>
          <Form onSubmit={handleSubmit(onPasswordValid)}>
            <label htmlFor="newPassword" />
            <Input
              {...register('newPassword', {
                required: '새 비밀번호 입력하세요.',
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
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="새 비밀번호 입력하세요."
            />
            {errors.newPassword && (
              <Errors>{errors.newPassword.message}</Errors>
            )}

            <label htmlFor="confirmPassword" />
            <Input
              {...register('confirmPassword', {
                required: '새 비밀번호 재입력하세요.',
              })}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="새 비밀번호 재입력하세요."
            />

            {errors.confirmPassword && (
              <Errors>{errors.confirmPassword.message}</Errors>
            )}

            {paswordUpdated?.error && <Errors>{paswordUpdated?.error}</Errors>}

            <Btn
              type="submit"
              loading={newLoading}
              name="새로운 비밀번호 만들기"
            />
          </Form>
        </FormCont>
      )}

      <LinkWrap findPassword={true} />
    </Page>
  );
};

export default Find_Pw;
