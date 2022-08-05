import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Btn } from '../../Tools/Button';
import { useForm } from 'react-hook-form';
import { ErrorMsg } from '../../Tools/Errors';
import { InputWrap } from '../../Tools/Input';
import useMutation from '../../../libs/client/useMutation';
import { Container, Form } from '../../../../styles/global';
import { Heading } from '../Create/Heading';
import useUser from '../../../libs/client/useUser';
import { IUserForm } from '../../../types/user';
import styled from '@emotion/styled';
import { MutationRes } from '../../../types/global';

export const UserId = () => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const [editUserId, { loading, data }] = useMutation<MutationRes>(
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
      <Box>
        <Heading type="edit-userId" h1="ID (아이디)" />
        <Form onSubmit={handleSubmit(onValid)}>
          <Flex>
            <InputWrap
              id="userId"
              type="text"
              label="User ID"
              watch={watch('userId')}
              register={register('userId', {
                required: '새로운 아이디를 입력해주세요.',
              })}
            />
            <Btn name="Edit" type="submit" loading={loading} />
          </Flex>
        </Form>
      </Box>
      {errors.userId && <ErrorMsg error={errors.userId?.message} />}
    </>
  );
};
export const Box = styled(Container)``;
const Flex = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;
  button {
    width: 80px;
    height: 50px;
  }
`;
