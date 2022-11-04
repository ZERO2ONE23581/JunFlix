import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../styles/global';
import { Head_ } from '../../src/Tools/head_title';
import { BoardsGrid } from '../../src/components/Board/Read/Grid';
import { useGetAllBoards } from '../../src/libs/client/useBoards';
import { PageHeading } from '../../src/components/Board/Read/BoardTitle';

const AllBoards: NextPage<{ theme: boolean }> = ({ theme }) => {
  const { boards, isBoard } = useGetAllBoards();
  return (
    <>
      <Head_ title="All Boards" />
      <BoardPage>
        <PageHeading type="board" theme={theme} detail={{ all: true }} />
        <BoardsGrid _data={{ theme, isBoard, boards }} />
      </BoardPage>
    </>
  );
};
export default AllBoards;

export const BoardPage = styled(Page)`
  padding: 0 8rem;
  .no-data {
    min-height: 60vh;
  }
  .board-icons {
    top: 3.5rem;
    right: 5rem;
  }
  .genre-modal {
    top: 6rem;
    right: 2rem;
  }
  .page-title {
    padding-left: 1rem;
    padding-bottom: 2rem;
  }
`;
