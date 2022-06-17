import { useEffect } from 'react';
import { Btn } from '../../../Style/Button';
import { useForm } from 'react-hook-form';
import useMutation from '../../../../libs/client/useMutation';
import { Errors, Form, Input } from '../../../../../styles/global';
import { IFindForm, IFindPostRes } from '../../../../types/login';
import { Cont } from './EmailForm';

export const VerifyTokenForm = ({ setIsTokenConfirm, setFoundUserID }: any) => {
  const [verifyToken, { loading, data }] = useMutation<IFindPostRes>(
    `/api/user/login/verify/token`
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFindForm>({ mode: 'onSubmit' });
  const onValid = ({ tokenNum }: IFindForm) => {
    if (loading) return;
    return verifyToken(tokenNum);
  };
  useEffect(() => {
    if (data?.ok) {
      setIsTokenConfirm(data.ok);
      setFoundUserID(data.FoundUserID);
    }
  }, [data, setIsTokenConfirm]);
  //
  return (
    <Cont>
      <h2>* Please type 6 digit number for verification.</h2>
      <h3>인증을 위하여 6자리 인증번호를 입력해주세요.</h3>
      <Form onSubmit={handleSubmit(onValid)}>
        <label htmlFor="tokenNum" />
        <Input
          {...register('tokenNum', {
            required: '6자리 토큰번호를 입력하세요.',
            maxLength: {
              value: 6,
              message: '인증번호는 6자리 숫자입니다. 이메일을 확인해주세요.',
            },
          })}
          type="text"
          id="tokenNum"
          name="tokenNum"
          placeholder="6자리 토큰번호를 입력하세요."
        />
        {errors.tokenNum && <Errors>{errors.tokenNum.message}</Errors>}
        {data?.error && <Errors>{data?.error}</Errors>}

        <Btn type="submit" name="토큰 인증하기" loading={loading} />
      </Form>
    </Cont>
  );
};
