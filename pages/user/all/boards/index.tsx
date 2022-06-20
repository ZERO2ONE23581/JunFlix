import type { NextPage } from 'next';
import { Page } from '../../../../styles/global';
import { Title } from '../../../../src/components/Layout/Title';
import { BoardList } from '../../../../src/components/User/Board/List';

const AllBoards: NextPage = () => {
  return (
    <>
      <Title title="모든보드 둘러보기" />
      <Page>
        <BoardList isAllBoards />
      </Page>
    </>
  );
};
export default AllBoards;
