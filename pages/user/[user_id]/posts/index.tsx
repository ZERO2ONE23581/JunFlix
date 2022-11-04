import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { PostPage } from '../../../all/posts';
import { useGetPosts } from '../../../../src/libs/client/usePosts';
import { PostSchema } from '../../../../src/components/Post/Read/Schema';

const MyPostsPage: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const { user_id } = router.query;
  const { posts } = useGetPosts({ board_id: 0, host_id: user_id?.toString()! });
  return (
    <Page>
      <PostSchema _data={{ theme, posts, grid: 4 }} />
    </Page>
  );
};
export default MyPostsPage;
const Page = styled(PostPage)`
  .icon_layer {
    padding: 0 1rem;
    margin: 1rem auto 0.8rem;
    //border: 1px solid yellow;
  }
`;
