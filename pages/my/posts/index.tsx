import type { NextPage } from 'next';
import useSWR from 'swr';
import { Title } from '../../../src/components/Layout/Title';
import { PostList } from '../../../src/components/Post/List';
import useUser from '../../../src/libs/client/useUser';
import { IGetAllPosts } from '../../../src/types/post';
import { Page } from '../boards';

const MyPosts: NextPage = () => {
  const { loggedInUser } = useUser();
  return (
    <>
      <Title title="나의 포스트" />
      <Page>
        <h1>{loggedInUser?.username}'s Posts</h1>
        <PostList isMyPosts={Boolean(loggedInUser)} />
      </Page>
    </>
  );
};
export default MyPosts;
