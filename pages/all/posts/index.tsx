import type { NextPage } from 'next';
import useSWR from 'swr';
import { Title } from '../../../src/components/Layout/Title';
import { PostList } from '../../../src/components/Post/List';
import { IGetAllPosts } from '../../../src/types/post';

const AllPosts: NextPage = () => {
  const { data } = useSWR<IGetAllPosts>(`/api/all/posts`);
  return (
    <>
      <Title title="모든 포스트 둘러보기" />
      <PostList isAllPosts={true} posts={data?.posts} />
    </>
  );
};
export default AllPosts;
