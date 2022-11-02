import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../styles/global';
import { HeadTitle } from '../../src/Tools/head_title';
import { PageTitle } from '../../src/Tools/Title/Page_Title';
import { BoardsGrid } from '../../src/components/Board/Read/Grid';
import { useGetAllBoards } from '../../src/libs/client/useBoards';

const AllBoards: NextPage<{ theme: boolean }> = ({ theme }) => {
  const { boards, isBoard } = useGetAllBoards();
  return (
    <>
      <HeadTitle title="All Boards" />
      <BoardPage>
        <PageTitle type="board" theme={theme} detail={{ all: true }} />
        <BoardsGrid _data={{ theme, isBoard, boards }} />
      </BoardPage>
    </>
  );
};
export default AllBoards;

export const BoardPage = styled(Page)`
  padding: 0 4rem;
  .no-data {
    border: 2px solid yellow;
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
