import useSWR from 'swr';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { IGetAllPosts } from '../../src/types/post';
import { HeadTitle } from '../../src/Tools/head_title';

const AllPosts: NextPage<{ theme: boolean }> = ({ theme }) => {
  const { data } = useSWR<IGetAllPosts>(`/api/post`);
  return (
    <>
      <HeadTitle title="모든 포스트" />
      <PostCont>
        <PostList from={20} size={4} postsArray={data?.posts!} />
      </PostCont>
    </>
  );
};
export default AllPosts;

export const PostCont = styled(Page)`
  padding: 8% 6%;
  .post-list {
    .post-box {
      min-height: 330px;
      min-width: 330px;
    }
  }
`;
