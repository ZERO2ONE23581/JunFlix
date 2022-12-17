import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { PostPage } from '../../../post/all';
import { useGetPosts } from '../../../../src/libs/client/usePosts';
import { PostSchema } from '../../../../src/components/Post/Schema';
import { IPage } from '../../../_app';

const QSPostsPage: NextPage<IPage> = ({ theme, setFixed }) => {
  const router = useRouter();
  const host_id = Number(router.query.user_id);
  const { posts } = useGetPosts({ host_id, board_id: 0, isQs: true });
  return (
    <Page>
      <PostSchema setFixed={setFixed} _data={{ theme, posts, grid: 5 }} />
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
