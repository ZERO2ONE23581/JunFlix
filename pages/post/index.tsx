import type { NextPage } from 'next';
import useSWR from 'swr';
import { Title } from '../../src/components/Layout/parts/Title';
import { AllPosts } from '../../src/components/Post/AllPosts';
import { Fullheight, H1, PageCont } from '../../styles/components/default';

const AllPostsPage: NextPage = () => {
  const { data: posts } = useSWR(`/api/post/all_posts`);
  return (
    <>
      <Title title="포스트 둘러보기" />
      <Fullheight>
        <PageCont>
          <H1>All Posts</H1>
          <AllPosts />
        </PageCont>
      </Fullheight>
    </>
  );
};
export default AllPostsPage;
