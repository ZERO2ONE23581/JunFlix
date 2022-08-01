import useSWR from 'swr';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../../styles/global';
import { IGetAllPosts } from '../../../src/types/post';
import { Title } from '../../../src/components/Tools/Title';
import { HeadTitle } from '../../../src/components/Layout/Head';

import { PostList } from '../../../src/components/Post/Read/List';
import { Fixed } from '../../../src/components/Tools/Modal/Fixed';

const AllPosts: NextPage = () => {
  const { data } = useSWR<IGetAllPosts>(`/api/user/all/posts`);
  return (
    <>
      <HeadTitle title="모든 포스트" />
      <Cont>
        <Title kind="Posts" svg={{ type: 'post', size: '2rem' }} />
        <PostList size={4} posts={data?.posts!} />
        <Fixed type={{ isBoard: false, isPost: true }} />
      </Cont>
    </>
  );
};
export default AllPosts;

const Cont = styled(Page)``;
