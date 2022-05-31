import styled from '@emotion/styled';
import { Board, Following, Post, User } from '@prisma/client';
import { useState } from 'react';
import useSWR from 'swr';
import { Icons } from '../../../../styles/svg';
import useMutation from '../../../libs/client/useMutation';

interface IGetFollowingBoard {
  ok: boolean;
  error?: string;
  isFollowing?: boolean;
  board: BoardWithRecords;
}
interface BoardWithRecords extends Board {
  user: User;
  followers?: Following[];
  post?: Post[];
  _count: {
    followers: number;
    posts: number;
  };
}

export const FollowBoard = ({ user_id, board_id }: any) => {
  const { data, mutate } = useSWR<IGetFollowingBoard>(
    user_id && board_id && `/api/user/${user_id}/board/${board_id}`
  );
  const [followBoard] = useMutation(
    `/api/user/${user_id}/board/${board_id}/follow/create`
  );
  const handleClick = () => {
    if (!data) return;
    mutate(
      {
        ...data,
        isFollowing: !data.isFollowing,
        board: {
          ...data.board,
          _count: {
            ...data.board._count,
            followers: data.isFollowing
              ? data.board._count?.followers - 1
              : data.board._count?.followers + 1,
          },
        },
      },
      false
    );
    followBoard({});
  };
  //
  return (
    <Cont>
      <Wrap>
        <Counts>
          <span>
            {data?.board._count?.followers
              ? data?.board._count?.followers
              : '0'}
          </span>
          <span>Followers</span>
        </Counts>
        <Btn isFollowing={data?.isFollowing} onClick={handleClick}>
          {data?.isFollowing ? 'Following...' : 'Follow'}
        </Btn>
      </Wrap>
    </Cont>
  );
};

const Cont = styled.article`
  /* border: 2px solid blueviolet; */
  margin: 10px 0;
`;
const Wrap = styled.article`
  width: 200px;
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Btn = styled.button<{ isFollowing: boolean | undefined }>`
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 5px;
  padding: 7px 20px;
  border: none;
  color: ${(p) => (p.isFollowing ? 'whitesmoke' : p.theme.color.bg)};
  background-color: ${(p) =>
    p.isFollowing ? p.theme.color.logo : p.theme.color.font};
  &:hover {
    color: ${(p) => p.theme.color.bg};
    background-color: ${(p) => p.theme.color.logo};
  }
`;
const Counts = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  span {
    text-align: center;
    font-size: 1.4rem;
    font-weight: 600;
  }
`;
