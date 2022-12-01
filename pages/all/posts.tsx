import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { PostSchema } from '../../src/components/Post/Schema';
import { useGetAllPosts } from '../../src/libs/client/usePosts';
import { Page } from '../../styles/global';

const AllPosts: NextPage<{ theme: boolean }> = ({ theme }) => {
  const { posts } = useGetAllPosts();
  return (
    <PostPage>
      <PostSchema _data={{ theme, posts, grid: 6 }} />
    </PostPage>
  );
};
export default AllPosts;

export const PostPage = styled(Page)`
  padding: 0.5rem 10rem;
`;
