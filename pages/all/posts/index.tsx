import type { NextPage } from 'next';
import { Page } from '../../../styles/global';
import { Title } from '../../../src/components/Layout/Title';
import { PostList } from '../../../src/components/Post/List';

const AllPosts: NextPage = () => {
  return (
    <>
      <Title title="모든 포스트 둘러보기" />
      <Page>
        <h1>All Posts</h1>
        <PostList isAllPosts={true} />
      </Page>
    </>
  );
};
export default AllPosts;
