import type { NextPage } from 'next';
import { Page } from '../../../../styles/global';
import useUser from '../../../../src/libs/client/useUser';
import { Title } from '../../../../src/components/Layout/Title';
import { PostList } from '../../../../src/components/User/Post/postlist';

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
