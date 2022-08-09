import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Btn } from '../../Tools/Button';
import { useForm } from 'react-hook-form';
import { ErrorMsg, Errors } from '../../Tools/Errors';
import { InputWrap } from '../../Tools/Input';
import useMutation from '../../../libs/client/useMutation';
import { Box } from '../../../../styles/global';
import useUser from '../../../libs/client/useUser';
import { IUserForm } from '../../../types/user';
import { IData } from '../../../types/global';
import { Title } from '../Create/Title';
import { LoadingModal } from '../../Tools/Modal/Loading';
import styled from '@emotion/styled';

export const UserId = () => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const [editUserId, { loading, data }] = useMutation<IData>(
    `/api/user/${loggedInUser?.id}/edit/user_id`
  );
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: 'onSubmit' });

  useEffect(() => {
    if (loggedInUser?.userId) setValue('userId', loggedInUser?.userId);
  }, [loggedInUser, setValue]);

  const onValid = ({ userId }: IUserForm) => {
    if (loading) return;
    const userID = userId?.toUpperCase();
    return editUserId({ userID });
  };
  useEffect(() => {
    if (data?.error) alert(data.error);
    if (data?.ok) {
      alert('회원님의 아이디가 수정되었습니다.');
      router.reload();
    }
  }, [data, router]);

  return (
    <>
      {!loading && (
        <form onSubmit={handleSubmit(onValid)}>
          <UserBox>
            <Title type="edit-user-id" eng="User ID" />
            <InputWrap
              id="userId"
              type="text"
              label="User ID"
              watch={watch('userId')}
              register={register('userId', {
                required: '새로운 아이디를 입력해주세요.',
              })}
            />
            <Btn name="Edit" type="submit" />
            <Errors errors={errors} />
          </UserBox>
        </form>
      )}
      {loading && <LoadingModal type="loading" zIndex={99} />}
    </>
  );
};
export const UserBox = styled(Box)`
  width: 300px;
  height: 300px;
`;
