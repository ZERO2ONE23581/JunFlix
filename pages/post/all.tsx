import { IPage } from '../_app';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { useLogin } from '../../src/libs/client/useLogin';
import { PostSchema } from '../../src/components/Post/Schema/PostSchema';
import { useGetAllPosts } from '../../src/libs/client/usePosts';
import { useResponsive } from '../../src/libs/client/useTools';

const AllPosts: NextPage<IPage> = ({ theme }) => {
  useLogin();
  const { posts } = useGetAllPosts();
  const { isDesk } = useResponsive();
  return (
    <Cont isDesk={isDesk}>
      <PostSchema _data={{ theme, posts }} />
    </Cont>
  );
};
export default AllPosts;

const Cont = styled(Page)<{ isDesk: boolean }>`
  padding: ${(p) => (p.isDesk ? '1rem 4rem' : '2rem 2.5rem')};
`;
