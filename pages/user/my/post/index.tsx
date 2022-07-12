import useSWR from 'swr';
import type { NextPage } from 'next';
import { Page } from '../../../../styles/global';
import { IGetAllPosts } from '../../../../src/types/post';
import useUser from '../../../../src/libs/client/useUser';
import { Title, TitleSign } from '../../../../src/components/Layout/Title';
import { PostList } from '../../../../src/components/Post/Read/List';
import styled from '@emotion/styled';

const MyPosts: NextPage = () => {
  const { loggedInUser } = useUser();
  const { data } = useSWR<IGetAllPosts>(`/api/user/my/posts`);
  return (
    <>
      <Title title={`${loggedInUser?.username}'s Posts`} />
      <Cont>
        <TitleSign type="포스트" name={loggedInUser?.username!} />
        <PostList posts={data?.posts!} />
      </Cont>
    </>
  );
};
export default MyPosts;

const Cont = styled(Page)`
  padding: 0 20%;
  padding-bottom: 5%;
`;
