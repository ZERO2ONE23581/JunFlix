import type { NextPage } from 'next';
import { IPage } from '../../../_app';
import { useRouter } from 'next/router';
import { PostPage } from '../../../post/all';
import { PageTitle } from '../../../../src/Tools/Title/Page';
import { useGetPosts } from '../../../../src/libs/client/usePosts';
import { PostSchema } from '../../../../src/components/Post/Schema';
import { useLogin, useValidHost } from '../../../../src/libs/client/useLogin';

const MyPostsPage: NextPage<IPage> = ({ theme }) => {
  useLogin();
  useValidHost('posts');
  const router = useRouter();
  const host_id = Number(router.query.user_id!);
  const { posts } = useGetPosts({ board_id: 0, host_id });
  return (
    <PostPage>
      <PageTitle type={'user_posts'} theme={theme} />
      <PostSchema _data={{ theme, posts, grid: 5 }} />
    </PostPage>
  );
};
export default MyPostsPage;
