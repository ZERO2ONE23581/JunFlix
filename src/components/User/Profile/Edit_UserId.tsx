import { Btn } from '../../Btn';
import { useEffect } from 'react';
import { Input } from '../../Input';
import { useForm } from 'react-hook-form';
import useUser from '../../../libs/client/loggedInUser';
import useMutation from '../../../libs/client/useMutation';
import { ErrMsg, Form, OkMsg } from '../../../../styles/components/default';

interface IEditUserId {
  userId?: string;
  email?: string;
  method?: string;
}
interface IEditUserIdRes {
  ok: boolean;
  error?: string;
  method?: string;
}

export const Edit_UserId = () => {
  const { loggedInUser, loggedInUserId } = useUser();
  const [editLoginID, { loading, data }] = useMutation<IEditUserIdRes>(
    `/api/user/${loggedInUserId}/edit/profile/userId`
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    watch,
  } = useForm<IEditUserId>({ mode: 'onSubmit' });
  const selectMethod = watch('method');
  const onValid = ({ userId, email }: IEditUserId) => {
    if (!selectMethod)
      setError('method', { message: '아이디 또는 이메일을 선택해주세요.' });
    if (selectMethod === 'userId') return editLoginID({ userId });
    if (selectMethod === 'email') return editLoginID({ email });
  };
  //Set up
  useEffect(() => {
    if (loggedInUser?.userId) setValue('userId', loggedInUser?.userId);
    if (loggedInUser?.email) setValue('email', loggedInUser?.email);
    if (data?.ok) {
      setTimeout(() => {
        location.reload();
      }, 2000);
    }
  }, [loggedInUser, data]);
  //
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      {data && (
        <>
          <OkMsg>
            {data.ok && data.method === 'userId'
              ? '아이디가 수정되었습니다.'
              : data.ok &&
                data.method === 'email' &&
                '이메일이 수정되었습니다.'}
          </OkMsg>
          {data.error && <ErrMsg>{data.error}</ErrMsg>}
        </>
      )}
      {errors.method && <ErrMsg>{errors.method.message}</ErrMsg>}

      <label htmlFor="method">아이디 또는 이메일을 선택해주세요.</label>
      <select {...register('method')} name="method" id="method">
        <option value="userId">아이디</option>
        <option value="email">이메일</option>
      </select>

      {selectMethod === 'userId' && (
        <Input
          label="ID"
          type="text"
          name="userId"
          errMsg={errors.userId?.message}
          register={register('userId', {
            required: '새로운 아이디를 입력해주세요.',
          })}
          placeholder="새로운 아이디를 입력해주세요."
        />
      )}
      {selectMethod === 'email' && (
        <Input
          label="Email"
          type="email"
          name="email"
          errMsg={errors.email?.message}
          placeholder="새로운 이메일을 입력해주세요."
          register={register('email')}
        />
      )}
      <Btn type="submit" loading={loading} btnName="SAVE" />
    </Form>
  );
};