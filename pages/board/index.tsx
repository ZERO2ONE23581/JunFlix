import type { NextPage } from 'next';
import { AllBoards } from '../../src/components/Board';
import { Title } from '../../src/components/Layout/parts/Title';
import { Fullheight } from '../../styles/components/default';

const News: NextPage = () => {
  return (
    <Fullheight>
      <Title title="보드 둘러보기" />
      <AllBoards />
    </Fullheight>
  );
};
export default News;
