import useSWR from 'swr';
import type { NextPage } from 'next';
import { Page } from '../../../../styles/global';
import { IGetAllPosts } from '../../../../src/types/post';
import { Title, TitleSign } from '../../../../src/components/Layout/Title';
import { PostList } from '../../../../src/components/Post/Read/List';
import styled from '@emotion/styled';

const AllPosts: NextPage = () => {
  const { data } = useSWR<IGetAllPosts>(`/api/user/all/posts`);
  return (
    <>
      <Title title="모든 포스트" />
      <Cont>
        <TitleSign type="Posts" />
        <PostList posts={data?.posts!} />
      </Cont>
    </>
  );
};
export default AllPosts;

const Cont = styled(Page)`
  padding: 0 20%;
  padding-bottom: 5%;
`;
