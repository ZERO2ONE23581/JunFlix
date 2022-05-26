import type { NextPage } from 'next';
import { Title } from '../../src/components/Layout/parts/Title';
import { AllMyBoards } from '../../src/components/MyPage/AllMyBoards';
import { Fullheight, H1, H2, PageCont } from '../../styles/components/default';

const News: NextPage = () => {
  return (
    <>
      <Title title="보드선택" />
      <Fullheight>
        <PageCont>
          <H1>Select Board</H1>
          <H2>"포스트를 생성하려면 보드를 먼저 선택해주십시요."</H2>
          <AllMyBoards />
        </PageCont>
      </Fullheight>
    </>
  );
};
export default News;
