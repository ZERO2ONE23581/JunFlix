import useSWR from 'swr';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { Board, Following, User } from '@prisma/client';
import Link from 'next/link';
import { IGetBoards } from '../../../../types/board';

export const FollowersInBoards = () => {
  const router = useRouter();
  const { data: BoardData } = useSWR<IGetBoards>(`/api/my/boards`);
  const MyBoards = BoardData?.boards?.filter(
    (board) => board?.followers?.length > 0
  );
  return (
    <>
      <h1>follower</h1>
      {MyBoards?.map((board) => (
        <article key={board.id}>
          <div>
            {board.followers?.map((follower) => (
              <span key={follower.user?.id}>{follower.user?.userId}</span>
            ))}
          </div>
          <span>#{board.id}</span>
          <span>{board.title}</span>
        </article>
      ))}
    </>
  );
};
const Cont = styled.section`
  border: 10px solid blueviolet;
`;
