import type { NextPage } from 'next';
import { Page } from '../../../../styles/global';
import { Title } from '../../../../src/components/Layout/Title';
import { PostList } from '../../../../src/components/User/Post/List';

const AllPosts: NextPage = () => {
  return (
    <>
      <Title title="모든 포스트 둘러보기" />
      <Page>
        <PostList isAllPosts={true} />
      </Page>
    </>
  );
};
export default AllPosts;
