import useSWR from 'swr';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../../../styles/global';
import { IGetAllPosts } from '../../../../src/types/post';
import { PostList } from '../../../../src/components/Post/Read/List';
import { HeadTitle } from '../../../../src/components/Title/Head';
import { Title } from '../../../../src/components/Title';

const AllPosts: NextPage = () => {
  const { data } = useSWR<IGetAllPosts>(`/api/user/all/posts`);
  return (
    <>
      <HeadTitle title="모든 포스트" />
      <PostListPage>
        <Title kind="Posts" svg={{ type: 'post', size: '2rem' }} />
        <PostList posts={data?.posts!} />
      </PostListPage>
    </>
  );
};
export default AllPosts;

export const PostListPage = styled(Page)`
  .post-list {
    min-width: 1200px;
  }
  .post-fold {
    button {
      color: ${(p) => p.theme.color.bg};
      background-color: ${(p) => p.theme.color.font};
      :hover {
        color: white;
        background-color: ${(p) => p.theme.color.logo};
      }
    }
  }
`;
