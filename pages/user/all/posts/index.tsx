import useSWR from 'swr';
import type { NextPage } from 'next';
import { Page } from '../../../../styles/global';
import { IGetAllPosts } from '../../../../src/types/post';
import { Title } from '../../../../src/components/Layout/Title';
import { PostList } from '../../../../src/components/Post/Read/List';

const AllPosts: NextPage = () => {
  const { data } = useSWR<IGetAllPosts>(`/api/user/all/posts`);
  return (
    <>
      <Title title="모든 포스트" />
      <Page>
        <h1>모든 포스트</h1>
        <PostList posts={data?.posts!} />
      </Page>
    </>
  );
};
export default AllPosts;
