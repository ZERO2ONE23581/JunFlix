import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../Tools/Button';
import { InputWrap } from '../../../Tools/Input';
import { ErrorMsg } from '../../../Tools/ErrMsg';
import { Dispatch, SetStateAction } from 'react';
import useMutation from '../../../../libs/client/useMutation';
import { IFindForm, IFindPostRes } from '../../../../types/login';
import { Form } from '../../../../../styles/global';
import { Heading } from '../../Create/Heading';

interface IToken {
  setUserId: Dispatch<SetStateAction<string>> | any;
  setConfirm: Dispatch<SetStateAction<boolean>>;
}
export const Token = ({ setUserId, setConfirm }: IToken) => {
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
    if (data?.error) alert(data.error);
    if (data?.ok) {
      setConfirm(data.ok);
      setUserId(data.FoundUserID);
    }
  }, [data, setConfirm]);
  return (
    <>
      <Heading
        h1="Find ID"
        type="verifyToken"
        h2="Step 2. Confirm Token (토큰 확인)"
      />
      <Form onSubmit={handleSubmit(onValid)}>
        <InputWrap
          watch={watch('token')}
          id="token"
          type="number"
          label="Token Number"
          register={register('token', {
            required: '6자리 토큰번호를 입력하세요.',
            maxLength: {
              value: 6,
              message: '인증번호는 6자리 숫자입니다. 이메일을 확인해주세요.',
            },
          })}
        />
        <Btn type="submit" name="토큰 인증하기" loading={loading} />
      </Form>
      {errors.token && <ErrorMsg error={errors.token.message} />}
    </>
  );
};
