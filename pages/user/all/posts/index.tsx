import type { NextPage } from 'next';
import { H1, Page } from '../../../../styles/global';
import { Title } from '../../../../src/components/Layout/Title';
import { PostList } from '../../../../src/components/Post/List';

const AllPosts: NextPage = () => {
  return (
    <>
      <Title title="모든 포스트 둘러보기" />
      <Page>
        <section className="flex-column">
          <H1>All Posts</H1>
          <PostList isAllPosts={true} />
        </section>
      </Page>
    </>
  );
};
export default AllPosts;
