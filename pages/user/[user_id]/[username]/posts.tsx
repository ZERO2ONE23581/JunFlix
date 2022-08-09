import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { IGetAllPosts } from '../../../../src/types/post';
import useUser from '../../../../src/libs/client/useUser';
import { Title } from '../../../../src/components/Tools/Title';
import { HeadTitle } from '../../../../src/components/Layout/Head';
import { PostList } from '../../../../src/components/Post/Read/List';
import { Fixed } from '../../../../src/components/Tools/Button/Fixed';
import { useNeedLogin } from '../../../../src/libs/client/useTools';
import { PostCont } from '../../../posts';

const MyPosts: NextPage = () => {
  useNeedLogin();
  const { loggedInUser } = useUser();
  const { data } = useSWR<IGetAllPosts>(`/api/user/${loggedInUser?.id}/posts`);
  return (
    <>
      <HeadTitle title={`${loggedInUser?.username}'s Posts`} />
      <Cont>
        <Title
          kind="Posts"
          name={loggedInUser?.username!}
          svg={{ type: 'post', size: '2rem' }}
        />
        <PostList from={12} size={4} posts={data?.posts!} />
        <Fixed type="post" />
      </Cont>
    </>
  );
};
export default MyPosts;

const Cont = styled(PostCont)``;
