import { useEffect } from 'react';
import { Btn } from '../../../Button';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import useUser from '../../../../libs/client/useUser';
import { MutationRes } from '../../../../types/mutation';
import { IEditUserIdForm } from '../../../../types/user';
import useMutation from '../../../../libs/client/useMutation';
import { Errors, Form, FormCont, Input } from '../../../../../styles/global';

export const EditUserId = () => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const [editUserId, { loading, data }] = useMutation<MutationRes>(
    `/api/user/${loggedInUser?.id}/edit/user_id`
  );
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditUserIdForm>({ mode: 'onSubmit' });
  const onValid = ({ userId }: IEditUserIdForm) => {
    if (loading) return;
    return editUserId({ userId });
  };
  useEffect(() => {
    if (loggedInUser?.userId) setValue('userId', loggedInUser?.userId);
    if (data?.ok) {
      alert('회원님의 아이디가 수정되었습니다.');
      router.reload();
    }
  }, [loggedInUser, data, router]);
  return (
    <FormCont>
      <h1>Edit ID</h1>
      <Form onSubmit={handleSubmit(onValid)}>
        <label htmlFor="userId" />
        <Input
          {...register('userId', {
            required: '새로운 아이디를 입력해주세요.',
          })}
          id="userId"
          name="userId"
          type="text"
          placeholder="New User ID"
        />
        {errors.userId && <Errors>{errors.userId.message}</Errors>}
        <Btn type="submit" loading={loading} name="Edit" />
      </Form>
    </FormCont>
  );
};
