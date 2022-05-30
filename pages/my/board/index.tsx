import type { NextPage } from 'next';
import { Title } from '../../../src/components/Layout/parts/Title';
import useSWR from 'swr';
import { Board, User } from '@prisma/client';
import useUser from '../../../src/libs/client/useUser';
import { BoardList } from '../../../src/components/Board/BoardList';
import { IGetBoards } from '../../../src/types/board';

const My_Boards: NextPage = () => {
  const { isloggedIn, loggedInUser } = useUser();
  const { data } = useSWR<IGetBoards>(`/api/my/board`);
  return (
    <>
      <Title title="나의 보드" />
      {isloggedIn && data?.ok && data?.boards && (
        <BoardList boards={data.boards} loggedInUser={loggedInUser} />
      )}
    </>
  );
};
export default My_Boards;
