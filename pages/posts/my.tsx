import useSWR from 'swr';
import { PostCont } from '.';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { IGetAllPosts } from '../../src/types/post';
import useUser from '../../src/libs/client/useUser';
import { Title } from '../../src/Tools/Title';
import { PostList } from '../../src/components/Post/Read/List';
import { Fixed } from '../../src/Tools/Button/Fixed';
import { HeadTitle } from '../../src/components/Head';

const MyPosts: NextPage = () => {
  const { loggedInUser } = useUser();
  const { data } = useSWR<IGetAllPosts>(`/api/user/${loggedInUser?.id}/posts`);
  return (
    <>
      <HeadTitle title="모든 포스트" />
      <Cont>
        <Title type="post" postType="my" />
        <PostList from={20} size={4} postsArray={data?.posts!} />
        <Fixed type="post" />
      </Cont>
    </>
  );
};
export default MyPosts;

const Cont = styled(PostCont)``;