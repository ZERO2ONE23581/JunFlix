import type { NextPage } from 'next';
import { Title } from '../../../../../src/components/Layout/parts/Title';
import { AllMyBoards } from '../../../../../src/components/Board/AllMyBoards';

const MyBoards: NextPage = () => {
  return (
    <>
      <Title title="나의 보드" />
      <AllMyBoards />
    </>
  );
};
export default MyBoards;
