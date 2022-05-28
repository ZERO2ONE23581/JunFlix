import type { NextPage } from 'next';
import { PageCont } from '../../../../styles/components/default';
import { Title } from '../../../../src/components/Layout/parts/Title';
import { AllMyPosts } from '../../../../src/components/MyPage/AllMyPosts';

const MyPosts: NextPage = () => {
  return (
    <PageCont>
      <Title title="나의 포스트" />
      <AllMyPosts />
    </PageCont>
  );
};
export default MyPosts;
