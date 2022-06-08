import type { NextPage } from 'next';
import useSWR from 'swr';
import { Title } from '../../../../../src/components/Layout/Title';
import { PostList } from '../../../../../src/components/Post/PostList';
import useUser from '../../../../../src/libs/client/useUser';
import { IGetAllPosts } from '../../../../../src/types/post';

const MyPosts: NextPage = () => {
  const { isloggedIn, loggedInUser } = useUser();
  const { data } = useSWR<IGetAllPosts>(
    loggedInUser && `/api//user/${loggedInUser.id}/post/my_posts`
  );
  return (
    <>
      <Title title="나의 포스트" />
      {isloggedIn && <PostList myPosts={true} posts={data?.posts} />}
    </>
  );
};
export default MyPosts;
