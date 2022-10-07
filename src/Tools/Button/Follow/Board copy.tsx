import { Btn } from '..';
import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import { IData } from '../../../types/global';
import { FollowBoardModal } from '../../Modal/Follow/Board';
import { IGetFollowingBoard } from '../../../types/board';
import useMutation from '../../../libs/client/useMutation';
import useUser from '../../../libs/client/useUser';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

interface IFollowBtn {
  userId: number;
  boardId: number;
}
export const FollowBtn = ({ userId, boardId }: IFollowBtn) => {
  const { isLoggedIn } = useUser();
  const router = useRouter();
  const [FollowBoard] = useMutation<IData>(
    `/api/user/${userId}/follow/board/${boardId}`
  );
  const { data, mutate } = useSWR<IGetFollowingBoard>(
    `/api/user/${userId}/board/${boardId}`
  );
  const [follow, setFollow] = useState(false);
  const [unFollow, setUnFollow] = useState(false);
  const onClick = () => {
    if (!isLoggedIn) {
      alert(`You need to login (로그인이 필요합니다.)`);
      router.push(`/user/login`);
    }
    setFollow(false);
    setUnFollow(false);
    if (!data) return;
    mutate(
      {
        ...data,
        isFollowing: !data.isFollowing,
        board: {
          ...data.board,
        },
      },
      false
    );
    FollowBoard({});
  };
  return (
    <>
      <Cont className="follow-board" isFollow={data?.isFollowing!}>
        {data?.isFollowing && (
          <Btn
            type="button"
            name="ON AIR"
            CLASSNAME="follow-btn"
            onClick={() => setUnFollow(true)}
            svg={{
              type: 'check',
              size: '1.2rem',
              fill: '#e50815',
              location: { right: true },
            }}
          />
        )}
        {!data?.isFollowing && (
          <Btn
            type="button"
            name="Follow"
            CLASSNAME="follow-btn"
            onClick={() => setFollow(true)}
          />
        )}
      </Cont>
      {follow && (
        <FollowBoardModal closeModal={setFollow} onClick={onClick} isFollow />
      )}
      {unFollow && (
        <FollowBoardModal closeModal={setFollow} onClick={onClick} isUnFollow />
      )}
    </>
  );
};
const Cont = styled(motion.article)<{ isFollow: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  button {
    border: none;
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    padding-left: 1.5rem;
    border-end-start-radius: 20px;
    color: ${(p) => p.theme.color.font};
    background-color: ${(p) => p.theme.color.bg};
  }
`;
