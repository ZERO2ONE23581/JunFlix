import type { NextPage } from 'next';
import { Page } from '../../../../../../../styles/global';
import { PostDetail } from '../../../../../../../src/components/User/Post/PostDetail';
import { Title } from '../../../../../../../src/components/Layout/Title';
import useSWR from 'swr';
import { IGetPost } from '../../../../../../../src/types/post';
import { useRouter } from 'next/router';

const PostInfo: NextPage = () => {
  const router = useRouter();
  const { user_id, board_id, post_id } = router.query;
  const isQueryId = Boolean(user_id && board_id && post_id);
  const { data } = useSWR<IGetPost>(
    isQueryId && `/api/user/${user_id}/board/${board_id}/post/${post_id}`
  );
  const PostTitle = data?.post.title;
  //
  return (
    <>
      <Title title={PostTitle!} />
      <Page>
        <PostDetail post={data?.post} />
      </Page>
    </>
  );
};
export default PostInfo;
