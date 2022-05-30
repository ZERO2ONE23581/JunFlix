import type { NextPage } from 'next';
import { Title } from '../../../../src/components/Layout/parts/Title';
import { AllPosts } from '../../../../src/components/Post/AllPosts';

const AllPostsPage: NextPage = () => {
  return (
    <>
      <Title title="포스트 둘러보기" />
      <AllPosts />
    </>
  );
};
export default AllPostsPage;
