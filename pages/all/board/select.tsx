import type { NextPage } from 'next';
import { Title } from '../../../src/components/Layout/parts/Title';
import { AllMyBoards } from '../../../src/components/Board/AllMyBoards';
import { Fullheight, H1, PageCont } from '../../../styles/default';

const News: NextPage = () => {
  return (
    <>
      <Title title="보드선택" />
      <Fullheight>
        <PageCont>
          <H1>Select Board</H1>
          <h2>"포스트를 생성하려면 보드를 먼저 선택해주십시요."</h2>
          <AllMyBoards />
        </PageCont>
      </Fullheight>
    </>
  );
};
export default News;
