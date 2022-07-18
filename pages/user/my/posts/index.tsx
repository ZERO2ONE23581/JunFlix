import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { PostListPage } from '../../all/posts';
import { IGetAllPosts } from '../../../../src/types/post';
import useUser from '../../../../src/libs/client/useUser';
import { PostList } from '../../../../src/components/Post/Read/List';
import { Title, TitleSign } from '../../../../src/components/Layout/Title';

const MyPosts: NextPage = () => {
  const { loggedInUser } = useUser();
  const { data } = useSWR<IGetAllPosts>(`/api/user/my/posts`);
  return (
    <>
      <Title title={`${loggedInUser?.username}'s Posts`} />
      <PostListPage>
        <TitleSign
          svg="post"
          type="포스트"
          width="280px"
          svgSize="2rem"
          name={loggedInUser?.username!}
        />
        <PostList posts={data?.posts!} />
      </PostListPage>
    </>
  );
};
export default MyPosts;

const Cont = styled(PostListPage)``;
