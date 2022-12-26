import type { NextPage } from 'next';
import { IPage } from '../../../_app';
import { useRouter } from 'next/router';
import { PostPage } from '../../../post/all';
import { PageTitle } from '../../../../src/Tools/Title/Page';
import { useGetPosts } from '../../../../src/libs/client/usePosts';
import { PostSchema } from '../../../../src/components/Post/Schema';
import { useLogin, useValidHost } from '../../../../src/libs/client/useLogin';

const QuckSavedPosts: NextPage<IPage> = ({ theme }) => {
  useLogin();
  const router = useRouter();
  useValidHost('posts_quick');
  const host_id = Number(router.query.user_id);
  const { posts } = useGetPosts({ host_id, board_id: 0, isQs: true });
  return (
    <PostPage>
      <PageTitle theme={theme} type={'qs'} />
      <PostSchema _data={{ theme, posts, grid: 5 }} />
    </PostPage>
  );
};
export default QuckSavedPosts;
