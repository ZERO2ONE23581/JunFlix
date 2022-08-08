import useSWR from 'swr';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { IGetAllPosts } from '../../src/types/post';
import { Title } from '../../src/components/Tools/Title';
import { HeadTitle } from '../../src/components/Layout/Head';
import { PostList } from '../../src/components/Post/Read/List';
import { Fixed } from '../../src/components/Tools/Button/Fixed';

const AllPosts: NextPage = () => {
  const { data } = useSWR<IGetAllPosts>(`/api/user/all/posts`);
  return (
    <>
      <HeadTitle title="모든 포스트" />
      <PostCont>
        <Title kind="Posts" svg={{ type: 'post', size: '2rem' }} />
        <PostList from={12} size={4} posts={data?.posts!} />
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
