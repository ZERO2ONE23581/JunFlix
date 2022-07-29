import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { PostListPage } from '../../all/posts';
import { IGetAllPosts } from '../../../../src/types/post';
import useUser from '../../../../src/libs/client/useUser';
import { PostList } from '../../../../src/components/Post/Read/List';
import { HeadTitle } from '../../../../src/components/Title/Head';
import { Title } from '../../../../src/components/Title';

const MyPosts: NextPage = () => {
  const { loggedInUser } = useUser();
  const { data } = useSWR<IGetAllPosts>(`/api/user/my/posts`);
  return (
    <>
      <HeadTitle title={`${loggedInUser?.username}'s Posts`} />
      <PostListPage>
        <Title
          kind="Posts"
          name={loggedInUser?.username!}
          svg={{ type: 'post', size: '2rem' }}
        />
        <PostList posts={data?.posts!} />
      </PostListPage>
    </>
  );
};
export default MyPosts;

const Cont = styled(PostListPage)``;
