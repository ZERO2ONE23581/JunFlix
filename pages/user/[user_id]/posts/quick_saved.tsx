import type { NextPage } from 'next';
import { IPage } from '../../../_app';
import { useRouter } from 'next/router';
import { PostPage } from '../../../post/all';
import { useLogin } from '../../../../src/libs/client/useLogin';
import { useGetPosts } from '../../../../src/libs/client/usePosts';
import { PostSchema } from '../../../../src/components/Post/Schema';

const QuckSavedPosts: NextPage<IPage> = ({ theme, setFixed }) => {
  useLogin();
  const router = useRouter();
  const host_id = Number(router.query.user_id);
  const { posts } = useGetPosts({ host_id, board_id: 0, isQs: true });
  return (
    <PostPage>
      <PostSchema setFixed={setFixed} _data={{ theme, posts, grid: 5 }} />
    </PostPage>
  );
};
export default QuckSavedPosts;
