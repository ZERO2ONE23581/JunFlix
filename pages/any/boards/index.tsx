import useSWR from 'swr';
import type { NextPage } from 'next';
import { BoardList } from '../../../src/components/Board/BoardList';
import { Title } from '../../../src/components/Layout/Title';
import useUser from '../../../src/libs/client/useUser';
import { IGetExistingBoards } from '../../../src/types/board';

const All_Boards: NextPage = () => {
  const { loggedInUser } = useUser();
  const { data } = useSWR<IGetExistingBoards>(`/api/all/boards`);
  return (
    <>
      <Title title="모든보드 둘러보기" />
      <BoardList
        allBoards={true}
        loggedInUser={loggedInUser}
        boards={data?.boards}
      />
    </>
  );
};
export default All_Boards;
