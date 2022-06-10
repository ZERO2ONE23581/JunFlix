import type { NextPage } from 'next';
import { BoardList } from '../../../src/components/Board/List';
import { Title } from '../../../src/components/Layout/Title';

const All_Boards: NextPage = () => {
  return (
    <>
      <Title title="모든보드 둘러보기" />
      <BoardList isAllBoards={true} />
    </>
  );
};
export default All_Boards;
