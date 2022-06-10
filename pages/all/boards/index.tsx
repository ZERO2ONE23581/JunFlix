import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { BoardList } from '../../../src/components/Board/List';
import { Title } from '../../../src/components/Layout/Title';
import { Page } from '../../my/boards';

const AllBoards: NextPage = () => {
  return (
    <>
      <Title title="모든보드 둘러보기" />
      <Page>
        <h1>All Boards</h1>
        <BoardList isAllBoards={true} />
      </Page>
    </>
  );
};
export default AllBoards;
