import type { NextPage } from 'next';
import useSWR from 'swr';
import { Title } from '../../../src/components/Layout/parts/Title';
import { PostList } from '../../../src/components/Post/PostList';
import { IGetAllPosts } from '../../../src/types/post';

const All_Posts: NextPage = () => {
  const { data } = useSWR<IGetAllPosts>(`/api/all/posts`);
  return (
    <>
      <Title title="모든 포스트 둘러보기" />
      <PostList posts={data?.posts} />
    </>
  );
};
export default All_Posts;
