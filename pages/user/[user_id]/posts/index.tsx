import type { NextPage } from 'next';
import { IPage } from '../../../_app';
import { useRouter } from 'next/router';
import { PostPage } from '../../../post/all';
import { useLogin } from '../../../../src/libs/client/useLogin';
import { useGetPosts } from '../../../../src/libs/client/usePosts';
import { PostSchema } from '../../../../src/components/Post/Schema';

const MyPostsPage: NextPage<IPage> = ({ theme, setFixed }) => {
  useLogin();
  const router = useRouter();
  const { user_id } = router.query;
  const { posts } = useGetPosts({ board_id: 0, host_id: user_id?.toString()! });
  return (
    <PostPage>
      <PostSchema setFixed={setFixed} _data={{ theme, posts, grid: 4 }} />
    </PostPage>
  );
};
export default MyPostsPage;
