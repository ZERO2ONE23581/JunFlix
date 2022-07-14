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
      <Cont>
        <TitleSign type="Posts" />
        <PostList posts={data?.posts!} />
      </Cont>
    </>
  );
};
export default AllPosts;

const Cont = styled(Page)`
  padding: 0 20% 5% 20%;
`;
