import useSWR from 'swr';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../../../styles/global';
import { IGetAllPosts } from '../../../../src/types/post';
import { PostList } from '../../../../src/components/Post/Read/List';
import { Title, TitleSign } from '../../../../src/components/Layout/Title';

const AllPosts: NextPage = () => {
  const { data } = useSWR<IGetAllPosts>(`/api/user/all/posts`);
  return (
    <>
      <Title title="모든 포스트" />
      <AllPostsPg>
        <TitleSign type="Posts" />
        <PostList posts={data?.posts!} />
      </AllPostsPg>
    </>
  );
};
export default AllPosts;

export const AllPostsPg = styled(Page)`
  padding: 0 22%;
  padding-bottom: 5%;
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
