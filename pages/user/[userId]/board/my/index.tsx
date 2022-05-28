import type { NextPage } from 'next';
import { PageCont } from '../../../../../styles/components/default';
import { Title } from '../../../../../src/components/Layout/parts/Title';
import { AllMyBoards } from '../../../../../src/components/MyPage/AllMyBoards';

const MyBoards: NextPage = () => {
  return (
    <PageCont>
      <Title title="나의 보드" />
      <AllMyBoards />
    </PageCont>
  );
};
export default MyBoards;
