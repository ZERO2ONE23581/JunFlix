import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../Style/Button';
import { InputWrap } from '../../../Style/Input';
import { ErrorMsg } from '../../../Style/ErrMsg';
import { Dispatch, SetStateAction } from 'react';
import useMutation from '../../../../libs/client/useMutation';
import { IFindForm, IFindPostRes } from '../../../../types/login';
import { Form, Info, JoinCont } from '../../../../../styles/global';

interface IVerifyTokenFormProps {
  setFoundUserID: Dispatch<SetStateAction<string>> | any;
  setIsTokenConfirm: Dispatch<SetStateAction<boolean>>;
}
export const VerifyTokenForm = ({
  setFoundUserID,
  setIsTokenConfirm,
}: IVerifyTokenFormProps) => {
  const [verifyToken, { loading, data }] = useMutation<IFindPostRes>(
    `/api/user/login/verify/token`
  );
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFindForm>({ mode: 'onSubmit' });
  const onValid = ({ token }: IFindForm) => {
    if (loading) return;
    return verifyToken(token);
  };
  useEffect(() => {
    if (data?.ok) {
      setIsTokenConfirm(data.ok);
      setFoundUserID(data.FoundUserID);
    }
  }, [data, setIsTokenConfirm]);
  return (
    <Cont>
      <h1>Find ID</h1>
      <h2>Step 2. Confirm Token</h2>
      <Form onSubmit={handleSubmit(onValid)}>
        <InputWrap
          watch={watch('token')}
          id="token"
          type="text"
          label="Token Number"
          inputErrMsg={errors.token?.message}
          register={register('token', {
            required: '6자리 토큰번호를 입력하세요.',
            maxLength: {
              value: 6,
              message: '인증번호는 6자리 숫자입니다. 이메일을 확인해주세요.',
            },
          })}
        />
        {data?.error && <ErrorMsg error={data.error} />}
        <Btn type="submit" name="토큰 인증하기" loading={loading} />
        <Info>
          <span>* Please type 6 digit number for verification.</span>
          <span>* 인증을 위하여 6자리 인증번호를 입력해주세요.</span>
        </Info>
      </Form>
    </Cont>
  );
};
const Cont = styled(JoinCont)``;
