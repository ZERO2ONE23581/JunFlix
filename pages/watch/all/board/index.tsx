import type { NextPage } from 'next';
import { AllBoards } from '../../../../src/components/Board/AllBoards';
import { Title } from '../../../../src/components/Layout/parts/Title';

const News: NextPage = () => {
  return (
    <>
      <Title title="보드 둘러보기" />
      <AllBoards />
    </>
  );
};
export default News;
