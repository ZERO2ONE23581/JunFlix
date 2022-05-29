import type { NextPage } from 'next';
import { Title } from '../../../../src/components/Layout/parts/Title';
import { AllMyPosts } from '../../../../src/components/MyPage/AllMyPosts';

const MyPosts: NextPage = () => {
  return (
    <>
      <Title title="나의 포스트" />
      <AllMyPosts />
    </>
  );
};
export default MyPosts;
