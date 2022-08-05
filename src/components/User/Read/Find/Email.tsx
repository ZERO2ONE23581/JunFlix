import { useForm } from 'react-hook-form';
import { Btn } from '../../../Tools/Button';
import { InputWrap } from '../../../Tools/Input';
import { ErrorMsg } from '../../../Tools/Errors';
import { Dispatch, SetStateAction, useEffect } from 'react';
import useMutation from '../../../../libs/client/useMutation';
import { Form } from '../../../../../styles/global';
import { Heading } from '../../Create/Heading';
import { IFindForm, IFindPostRes } from '../../../../types/user';

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
      <Heading
        type="verify-id"
        h1="Find ID (아이디 찾기)"
        h2="Step 1. Verify Email (이메일 인증)"
      />
      <Form onSubmit={handleSubmit(onValid)}>
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
        <Btn
          type="submit"
          loading={loading}
          name="이메일로 인증하기"
          CLASSNAME="submit-btn"
        />
        {errors.email && <ErrorMsg error={errors.email.message} />}
      </Form>
    </>
  );
};
