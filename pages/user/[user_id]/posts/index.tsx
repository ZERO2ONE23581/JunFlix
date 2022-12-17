import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { IPage } from '../../../_app';
import { useRouter } from 'next/router';
import { PostPage } from '../../../post/all';
import { useGetPosts } from '../../../../src/libs/client/usePosts';
import { PostSchema } from '../../../../src/components/Post/Schema';

const MyPostsPage: NextPage<IPage> = ({ theme, setFixed }) => {
  const router = useRouter();
  const { user_id } = router.query;
  const { posts } = useGetPosts({ board_id: 0, host_id: user_id?.toString()! });
  return (
    <Page>
      <PostSchema setFixed={setFixed} _data={{ theme, posts, grid: 4 }} />
    </Page>
  );
};
export default MyPostsPage;
const Page = styled(PostPage)`
  .icon_layer {
    padding: 0 1rem;
    margin: 1rem auto 0.8rem;
  }
`;
