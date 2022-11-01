import type { NextPage } from 'next';
import { BoardPage } from '../../styles/boards';
import { HeadTitle } from '../../src/Tools/head_title';
import { FixedBtns } from '../../src/Tools/Button/Fixed';
import { PageTitle } from '../../src/Tools/Title/Page_Title';
import { useGetAllBoards } from '../../src/libs/client/useBoards';
import { BoardsGrid } from '../../src/components/Board/Read/Grid';

const AllBoards: NextPage<{ theme: boolean }> = ({ theme }) => {
  const { boards, isBoard } = useGetAllBoards();
  return (
    <>
      <HeadTitle title="All Boards" />
      <BoardPage>
        <PageTitle type="board" theme={theme} detail={{ all: true }} />
        <BoardsGrid isBoard={isBoard} boards={boards} theme={theme} />
      </BoardPage>
      <FixedBtns theme={theme} type="board" />
    </>
  );
};
export default AllBoards;
