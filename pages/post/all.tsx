import { IPage } from '../_app';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { useLogin } from '../../src/libs/client/useLogin';
import { PostSchema } from '../../src/components/Post/Schema';
import { useGetAllPosts } from '../../src/libs/client/usePosts';

const AllPosts: NextPage<IPage> = ({ theme }) => {
  useLogin();
  const { posts } = useGetAllPosts();
  return (
    <Cont>
      <PostSchema _data={{ theme, posts }} />
    </Cont>
  );
};
export default AllPosts;

const Cont = styled(Page)`
  padding: 2.5rem;
`;
