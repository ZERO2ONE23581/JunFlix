import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { Dispatch, SetStateAction } from 'react';
import { PostSchema } from '../../src/components/Post/Schema';
import { useGetAllPosts } from '../../src/libs/client/usePosts';

const AllPosts: NextPage<{
  theme: boolean;
  setFixed: Dispatch<SetStateAction<boolean>>;
}> = ({ theme, setFixed }) => {
  const { posts } = useGetAllPosts();
  return (
    <PostPage>
      <PostSchema _data={{ theme, posts, grid: 6 }} setFixed={setFixed} />
    </PostPage>
  );
};
export default AllPosts;

export const PostPage = styled(Page)`
  padding: 0.5rem 10rem;
`;
