import { useForm } from 'react-hook-form';
import { Btn } from '../../../../Tools/Button';
import { InputWrap } from '../../../../Tools/Input';
import { ErrorMsg } from '../../../../Tools/Errors';
import { Dispatch, SetStateAction, useEffect } from 'react';
import useMutation from '../../../../libs/client/useMutation';
import { IFindForm, IFindPostRes } from '../../../../types/user';
import { Title } from '../../Create/Title';
import styled from '@emotion/styled';
import { Box } from '../../../../../styles/global';
import { LoadingModal } from '../../../../Tools/Modal/Loading';
import { FindLink } from '../Links/Find';

interface IEmail {
  setToken: Dispatch<SetStateAction<boolean>>;
}
export const Email = ({ setToken }: IEmail) => {
  const [verify, { loading, data }] = useMutation<IFindPostRes>(
    `/api/user/login/verify/email`
  );
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFindForm>({ mode: 'onSubmit' });
  const onValid = ({ email }: IFindForm) => {
    if (loading) return;
    return verify(email);
  };
  useEffect(() => {
    if (data?.error) alert(data.error);
    if (data?.ok) setToken(data?.ok);
  }, [data, setToken]);

  return (
    <>
      {!loading && (
        <form onSubmit={handleSubmit(onValid)}>
          <Cont>
            <Title type="verify-email" eng="Find ID" kor="아이디 찾기" />
            <h2>
              <span>Step 1.</span>
              <span className="kor">이메일 인증하기</span>
              <span>Verify your Email</span>
            </h2>
            <InputWrap
              watch={watch('email')}
              id="email"
              type="text"
              label="Email"
              register={register('email', {
                required: '이메일을 입력하세요.',
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: '이메일 형식이 올바르지 않습니다.',
                },
              })}
            />
            <Btn type="submit" name="SUBMIT" CLASSNAME="submit-btn" />
            {errors.email && <ErrorMsg error={errors.email.message} />}
            <FindLink />
          </Cont>
        </form>
      )}
      {loading && <LoadingModal type="verify-email" zIndex={1} />}
    </>
  );
};
const Cont = styled(Box)``;
