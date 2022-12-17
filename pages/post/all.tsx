import { IPage } from '../_app';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { PostSchema } from '../../src/components/Post/Schema';
import { useGetAllPosts } from '../../src/libs/client/usePosts';
import { useLogin } from '../../src/libs/client/useLogin';

const AllPosts: NextPage<IPage> = ({ theme, setFixed }) => {
  useLogin();
  const { posts } = useGetAllPosts();
  return (
    <PostPage>
      <PostSchema _data={{ theme, posts, grid: 6 }} setFixed={setFixed} />
    </PostPage>
  );
};
export default AllPosts;

export const PostPage = styled(Page)`
  padding: 0 10rem;
`;
