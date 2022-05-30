import type { NextPage } from 'next';
import { Title } from '../../../src/components/Layout/Title';
import { AllMyPosts } from '../../../src/components/Post/AllMyPosts';
import { AllMyBoards } from '../../../src/components/Board/AllMyBoards';
import { PageCont } from '../../../styles/default';

const Mypage: NextPage = () => {
  //
  return (
    <PageCont>
      <Title title="마이페이지" />
      <AllMyBoards />
      <AllMyPosts />
    </PageCont>
  );
};
export default Mypage;
