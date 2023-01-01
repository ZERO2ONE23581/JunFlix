import type { NextPage } from 'next';
import { IPage } from '../../_app';
import { PostPage } from '../../../styles/post';
import { Head_ } from '../../../src/Tools/Title/Head';
import { PageTitle } from '../../../src/Tools/Title/Page';
import { useResponsive } from '../../../src/libs/client/useTools';
import { useGetAllBoards } from '../../../src/libs/client/useBoards';
import { BoardsGrid } from '../../../src/components/BoardsGrid';
import styled from '@emotion/styled';

const AllBoards: NextPage<IPage> = ({ theme }) => {
  const { isDesk } = useResponsive();
  const { boards, isBoard } = useGetAllBoards();
  return (
    <>
      <Head_ title="All Boards" />
      <Cont isDesk={isDesk}>
        <PageTitle type="all_board" theme={theme} />
        <BoardsGrid _data={{ theme, isBoard, boards }} />
      </Cont>
    </>
  );
};
export default AllBoards;

const Cont = styled(PostPage)``;
