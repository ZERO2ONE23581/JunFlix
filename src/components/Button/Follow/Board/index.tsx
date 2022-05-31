import styled from '@emotion/styled';
import { Post, User } from '@prisma/client';
import { useState } from 'react';
import useSWR from 'swr';
import { Icons } from '../../../../../styles/svg';
import useMutation from '../../../../libs/client/useMutation';

interface IGetPost {
  ok: boolean;
  error?: string;
  isLiked?: boolean;
  post: PostWithUser;
}
interface PostWithUser extends Post {
  user: User;
  _count: {
    likes: number;
  };
}

export const FollowBoard = ({ userId, boardId }: any) => {
  const [followBoard] = useMutation(
    `/api/user/${userId}/board/${boardId}/follow/create`
  );
  //
  const handleClick = () => {
    followBoard({});
  };
  //
  return (
    <>
      <CountsWrap className="btnWithCounts">
        <Counts>10 Followers</Counts>
      </CountsWrap>
      <BtnWrap>
        <Btn onClick={handleClick}>Follow</Btn>
      </BtnWrap>
    </>
  );
};

const BtnWrap = styled.article`
  border: 2px solid red;
  padding: 0 10px;
  gap: 20px;
  display: flex;
  align-items: center;
  margin: 10px auto;
`;
const Btn = styled.button`
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 5px;
  padding: 7px 20px;
  color: inherit;
  background-color: inherit;
  border: 3px solid ${(p) => p.theme.color.font};
  &:hover {
    color: ${(p) => p.theme.color.bg};
    background-color: ${(p) => p.theme.color.font};
  }
`;
const CountsWrap = styled(BtnWrap)`
  border: 2px solid blue;
`;
const Counts = styled.span`
  text-align: center;
  font-size: 1.2rem;
  font-weight: 500;
`;
