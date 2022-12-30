import type { NextPage } from 'next';
import { IPage } from '../../../_app';
import { useRouter } from 'next/router';
import { PostPage } from '../../../../styles/post';
import { PageTitle } from '../../../../src/Tools/Title/Page';
import { useGetPosts } from '../../../../src/libs/client/usePosts';
import { PostSchema } from '../../../../src/components/Post/Schema';
import { useResponsive } from '../../../../src/libs/client/useTools';
import { useLogin, useValidHost } from '../../../../src/libs/client/useLogin';
import styled from '@emotion/styled';

const MyPostsPage: NextPage<IPage> = ({ theme }) => {
  useLogin();
  useValidHost('posts');
  const router = useRouter();
  const { isDesk } = useResponsive();
  const host_id = Number(router.query.user_id!);
  const { posts } = useGetPosts({ board_id: 0, host_id });
  return (
    <Cont isDesk={isDesk}>
      <PageTitle type={'user_posts'} theme={theme} />
      <PostSchema _data={{ theme, posts, grid: 5 }} />
    </Cont>
  );
};
export default MyPostsPage;

const Cont = styled(PostPage)``;
