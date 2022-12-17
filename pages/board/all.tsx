import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../styles/global';
import { Head_ } from '../../src/Tools/head_title';
import { BoardsGrid } from '../../src/components/Board/Read/Grid';
import { useGetAllBoards } from '../../src/libs/client/useBoards';
import { PageHeading } from '../../src/components/PageHeading';

const AllBoards: NextPage<{ theme: boolean }> = ({ theme }) => {
  const { boards, isBoard } = useGetAllBoards();
  return (
    <>
      <Head_ title="All Boards" />
      <Cont>
        <PageHeading type="all_board" theme={theme} />
        <BoardsGrid _data={{ theme, isBoard, boards }} />
      </Cont>
    </>
  );
};
export default AllBoards;

const Cont = styled(Page)`
  padding: 0 8rem;
`;
