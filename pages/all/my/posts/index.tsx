import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../../../styles/global';
import { IGetAllPosts } from '../../../../src/types/post';
import useUser from '../../../../src/libs/client/useUser';
import { Title } from '../../../../src/components/Title';
import { HeadTitle } from '../../../../src/components/Title/Head';
import { Fixed } from '../../../../src/components/Board/Read/Fixed';
import { PostList } from '../../../../src/components/Post/Read/List';

const MyPosts: NextPage = () => {
  const { loggedInUser } = useUser();
  const { data } = useSWR<IGetAllPosts>(`/api/user/my/posts`);
  return (
    <>
      <HeadTitle title={`${loggedInUser?.username}'s Posts`} />
      <Cont>
        <Title
          kind="Posts"
          name={loggedInUser?.username!}
          svg={{ type: 'post', size: '2rem' }}
        />
        <PostList size={4} posts={data?.posts!} />
        <Fixed type={{ isBoard: false, isPost: true }} />
      </Cont>
    </>
  );
};
export default MyPosts;

const Cont = styled(Page)``;
