import { useForm } from 'react-hook-form';
import { Btn } from '../../../Tools/Button';
import { ErrorMsg } from '../../../Tools/Errors';
import { InputWrap } from '../../../Tools/Input';
import { Dispatch, SetStateAction, useEffect } from 'react';
import useMutation from '../../../../libs/client/useMutation';
import { IFindForm, IFindPostRes } from '../../../../types/login';
import { Form } from '../../../../../styles/global';
import { Heading } from '../../Create/Heading';

interface IVerify {
  setToken: Dispatch<SetStateAction<boolean>>;
}
export const UserId = ({ setToken }: IVerify) => {
  const [verifyUserId, { loading, data }] = useMutation<IFindPostRes>(
    `/api/user/login/verify/user_id`
  );
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFindForm>({ mode: 'onSubmit' });
  const onValid = ({ userId }: IFindForm) => {
    if (loading) return;
    return verifyUserId(userId);
  };
  useEffect(() => {
    if (data?.error) alert(data.error);
    if (data?.ok) setToken(data?.ok);
  }, [data, setToken]);
  return (
    <>
      <Heading
        type="verifyId"
        h1="Find Password (비밀번호 찾기)"
        h2="Step 1. Verify ID (아이디 인증)"
      />
      <Form onSubmit={handleSubmit(onValid)}>
        <InputWrap
          watch={watch('userId')}
          type="text"
          id="userId"
          label="USER ID"
          register={register('userId', {
            required: '아이디를 입력해주세요.',
          })}
        />
        <Btn type="submit" name="아이디로 인증하기" loading={loading} />
      </Form>
      {errors.userId && <ErrorMsg error={errors.userId.message} />}
    </>
  );
};
