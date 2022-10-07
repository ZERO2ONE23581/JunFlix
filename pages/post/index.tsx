import useSWR from 'swr';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import { IGetAllPosts } from '../../src/types/post';
import { Title } from '../../src/Tools/Title';
import { HeadTitle } from '../../src/components/Head';
import { PostList } from '../../src/components/Post/Read/List';
import { Fixed } from '../../src/Tools/Button/Fixed';

const AllPosts: NextPage<{ theme: boolean }> = ({ theme }) => {
  const { data } = useSWR<IGetAllPosts>(`/api/posts`);
  return (
    <>
      <HeadTitle title="모든 포스트" />
      <PostCont>
        <Title type="post" postType="all" />
        <PostList from={20} size={4} postsArray={data?.posts!} />
        <Fixed type="post" />
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
