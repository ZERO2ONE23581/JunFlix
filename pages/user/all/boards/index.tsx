import type { NextPage } from 'next';
import { H1, Page } from '../../../../styles/global';
import { BoardList } from '../../../../src/components/Board/List';
import { Title } from '../../../../src/components/Layout/Title';

const AllBoards: NextPage = () => {
  return (
    <>
      <Title title="모든보드 둘러보기" />
      <Page>
        <section className="flex-column">
          <H1>All Boards</H1>
          <BoardList isAllBoards={true} />
        </section>
      </Page>
    </>
  );
};
export default AllBoards;
