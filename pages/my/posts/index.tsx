import type { NextPage } from 'next';
import useSWR from 'swr';
import { Title } from '../../../src/components/Layout/Title';
import { PostList } from '../../../src/components/Post/PostList';
import useUser from '../../../src/libs/client/useUser';
import { IGetAllPosts } from '../../../src/types/post';

const MyPosts: NextPage = () => {
  const { isloggedIn } = useUser();
  const { data } = useSWR<IGetAllPosts>(isloggedIn && `/api/my/posts`);
  return (
    <>
      <Title title="나의 포스트" />
      <PostList isMyPosts={true} posts={data?.posts} />
    </>
  );
};
export default MyPosts;
