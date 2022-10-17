import useSWR from 'swr';
import { PostCont } from '.';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import useUser from '../../src/libs/client/useUser';
import { HeadTitle } from '../../src/Tools/head_title';

const MyPosts: NextPage<{ theme: boolean }> = ({ theme }) => {
  const { loggedInUser } = useUser();

  return (
    <>
      <HeadTitle title="모든 포스트" />
      <Cont>
        {/* <Title type="post" postType="my" />
        <PostList from={20} size={4} postsArray={data?.posts!} />
        <Fixed type="post" /> */}
      </Cont>
    </>
  );
};
export default MyPosts;

const Cont = styled(PostCont)``;
