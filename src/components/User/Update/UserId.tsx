import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Btn } from '../../../Tools/Button';
import { useForm } from 'react-hook-form';
import { ErrorMsg, Errors } from '../../../Tools/Errors';
import { InputWrap } from '../../../Tools/Input';
import useMutation from '../../../libs/client/useMutation';
import { Box } from '../../../../styles/global';
import useUser from '../../../libs/client/useUser';
import { IUserForm } from '../../../types/user';
import { IData } from '../../../types/global';
import { Title } from '../../../Tools/Title';
import { LoadingModal } from '../../../Tools/Modal/Loading';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Answer } from '../../../Tools/Modal/Answer';
import { Svg } from '../../../Tools/Svg';

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
  const [answer, setAnswer] = useState(false);
  return (
    <>
      {!loading && (
        <form onSubmit={handleSubmit(onValid)}>
          {answer && <Answer type="edit-user-info" closeModal={setAnswer} />}
          <UserBox className="user-box">
            <h1>
              <span>USER ID</span>
              <span className="small">(유저 아이디)</span>
              <Svg
                size="2rem"
                type="question"
                onClick={() => setAnswer(true)}
              />
            </h1>
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
export const UserBox = styled(motion.div)`
  border: 3px solid ${(p) => p.theme.color.font};
  border-radius: 5px;
  padding: 20px 30px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  h1 {
    gap: 5px;
    display: flex;
    align-items: center;
    span {
      font-size: 1.5em;
      margin-right: 5px;
    }
    .small {
      font-size: 1.3em;
    }
  }
  button {
    width: 100%;
  }
  .flex {
    gap: 15px;
    display: flex;
    align-items: center;
  }
`;
