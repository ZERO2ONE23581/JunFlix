import useSWR from 'swr';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { Board, Following, User } from '@prisma/client';
import Link from 'next/link';
import { BoardWithUser, IGetBoards } from '../../../../types/board';

interface IGetFollowInfo {
  ok: boolean;
  error?: string;
  following?: FollowingWithBoards[];
}
interface FollowingWithBoards extends Following {
  board: Board;
}

export const MyPageFollow = () => {
  const router = useRouter();
  const { data } = useSWR<IGetFollowInfo>(`/api/my/follow`);
  const { data: BoardData } = useSWR<IGetBoards>(`/api/my/boards`);
  const following = data?.following;
  const MyBoards = BoardData?.boards?.filter(
    (board) => board?.followers?.length > 0
  );
  console.log(MyBoards);

  return (
    <Cont>
      <h1>following</h1>
      {following?.map((following) => (
        <div key={following.board?.id}>
          <Link
            href={`/user/${following.board.UserID}/board/${following.board.id}`}
          >
            <a>
              <div>#{following.board?.title.toUpperCase()}</div>
            </a>
          </Link>
        </div>
      ))}
      <h1>follower</h1>
      {MyBoards?.map((board) => (
        <div key={board.id}>
          <div>
            {board.followers?.map((follower) => (
              <div key={follower.user?.id}>##{follower.user?.userId}</div>
            ))}
          </div>
        </div>
      ))}
    </Cont>
  );
};
const Cont = styled.section`
  border: 10px solid blueviolet;
`;
