import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { PostPage } from '../../../all/posts';
import { color, redColor } from '../../../../styles/variants';
import { useGetPosts } from '../../../../src/libs/client/usePosts';
import { PostSchema } from '../../../../src/components/Post/Read/Schema';

const QSPostsPage: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const host_id = Number(router.query.user_id);
  const { posts } = useGetPosts({ host_id, board_id: 0, isQs: true });
  return (
    <Page>
      <PostSchema _data={{ theme, posts, grid: 5 }} />
    </Page>
  );
};
export default QSPostsPage;

const Page = styled(PostPage)`
  .icon_layer {
    padding: 0 1rem;
    margin: 1rem auto 0.8rem;
    //border: 1px solid yellow;
  }
`;
