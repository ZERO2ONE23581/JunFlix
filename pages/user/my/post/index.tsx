import useSWR from 'swr';
import type { NextPage } from 'next';
import { Page } from '../../../../styles/global';
import { IGetAllPosts } from '../../../../src/types/post';
import useUser from '../../../../src/libs/client/useUser';
import { Title } from '../../../../src/components/Layout/Title';
import { PostList } from '../../../../src/components/Post/Read/PostList';

const MyPosts: NextPage = () => {
  const { loggedInUser } = useUser();
  const { data } = useSWR<IGetAllPosts>(`/api/user/my/posts`);
  return (
    <>
      <Title title={`${loggedInUser?.username}'s Posts`} />
      <Page>
        <h1>{loggedInUser?.username}님의 포스트</h1>
        <PostList posts={data?.posts!} />
      </Page>
    </>
  );
};
export default MyPosts;
