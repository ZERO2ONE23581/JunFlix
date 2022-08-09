import useSWR from 'swr';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { IGetAllPosts } from '../src/types/post';
import { HeadTitle } from '../src/components/Layout/Head';
import { Title } from '../src/components/Tools/Title';
import { PostList } from '../src/components/Post/Read/List';
import { Fixed } from '../src/components/Tools/Button/Fixed';
import { Page } from '../styles/global';

const AllPosts: NextPage = () => {
  const { data } = useSWR<IGetAllPosts>(`/api/posts`);
  return (
    <>
      <HeadTitle title="모든 포스트" />
      <PostCont>
        <Title kind="Posts" svg={{ type: 'post', size: '2rem' }} />
        <PostList from={20} size={4} posts={data?.posts!} />
        <Fixed type="post" />
      </PostCont>
    </>
  );
};
export default AllPosts;

export const PostCont = styled(Page)`
  .post-list {
    .post {
      min-height: 330px;
    }
  }
`;
