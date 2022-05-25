import type { NextPage } from 'next';
import { Title } from '../../src/components/Layout/parts/Title';
import { Fullheight, H1, PageCont } from '../../styles/components/default';

const News: NextPage = () => {
  return (
    <>
      <Title title="보드선택" />
      <Fullheight>
        <PageCont>
          <H1>Select Board</H1>
        </PageCont>
      </Fullheight>
    </>
  );
};
export default News;
