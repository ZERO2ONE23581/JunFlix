import { useEffect } from 'react';
import { Btn } from '../../Button';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { MutationRes } from '../../../types/mutation';
import { IEditUserIdForm } from '../../../types/user';
import useMutation from '../../../libs/client/useMutation';
import { Errors, Form, FormCont, Input } from '../../../../styles/global';
import { IEditProfileProps } from '../../../../pages/user/my/profile/edit';

export const EditUserId = ({ user }: IEditProfileProps) => {
  const router = useRouter();
  const [editUserId, { loading, data }] = useMutation<MutationRes>(
    `/api/user/${user?.id}/edit/user_id`
  );
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditUserIdForm>({ mode: 'onSubmit' });
  const onValid = ({ userId }: IEditUserIdForm) => {
    if (loading) return;
    const userID = userId?.toUpperCase();
    return editUserId({ userID });
  };
  useEffect(() => {
    if (user?.userId) setValue('userId', user?.userId);
    if (data?.ok) {
      alert('회원님의 아이디가 수정되었습니다.');
      router.reload();
    }
  }, [user, data, router]);
  console.log(data);
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
        {data?.error && <Errors>{data.error}</Errors>}
        <div className="btn-flex">
          <Btn name="아이디 수정" type="submit" loading={loading} />
        </div>
      </Form>
    </FormCont>
  );
};
