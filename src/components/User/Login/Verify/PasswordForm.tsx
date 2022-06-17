import { useEffect } from 'react';
import { Btn } from '../../../Style/Button';
import { useForm } from 'react-hook-form';
import useMutation from '../../../../libs/client/useMutation';
import { IFindForm, IFindPostRes } from '../../../../types/login';
import { Errors, Form, Input } from '../../../../../styles/global';
import { Cont } from './EmailForm';

export const VerifyPasswordForm = ({ setOpenTokenForm }: any) => {
  const [verifyUserId, { loading, data }] = useMutation<IFindPostRes>(
    `/api/user/login/verify/user_id`
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFindForm>({ mode: 'onSubmit' });
  const onValid = ({ userId }: IFindForm) => {
    if (loading) return;
    return verifyUserId(userId);
  };
  useEffect(() => {
    if (data?.ok) setOpenTokenForm(data?.ok);
  }, [data, , setOpenTokenForm]);
  return (
    <Cont>
      <h2>* Please type your ID for verification.</h2>
      <h3>인증을 위하여 아이디를 입력해주세요.</h3>
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
    </Cont>
  );
};
