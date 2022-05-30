import type { NextPage } from 'next';
import { SelectBoard } from '../../../src/components/Board/SelectBoard';
import { Title } from '../../../src/components/Layout/parts/Title';

const MyBoards: NextPage = () => {
  return (
    <>
      <Title title="보드 선택하기" />
      <SelectBoard />
    </>
  );
};
export default MyBoards;
