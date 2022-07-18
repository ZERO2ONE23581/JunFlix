import useSWR from 'swr';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../../../styles/global';
import { IGetAllPosts } from '../../../../src/types/post';
import { PostList } from '../../../../src/components/Post/Read/List';
import { Title, TitleSign } from '../../../../src/components/Layout/Title';
import { FixedBtn } from '../../../../src/components/Post/Read/FixedBtn';

const AllPosts: NextPage = () => {
  const { data } = useSWR<IGetAllPosts>(`/api/user/all/posts`);
  return (
    <>
      <Title title="모든 포스트" />
      <PostListPage>
        <TitleSign type="Posts" width="180px" svg="post" svgSize="2rem" />
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
