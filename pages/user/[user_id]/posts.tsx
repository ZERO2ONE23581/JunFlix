import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { PostPage } from '../../all/posts';
import { useGetUser } from '../../../src/libs/client/useUser';
import { useGetMyPosts } from '../../../src/libs/client/usePosts';
import { Title } from '../../../src/components/Post/Read/Grid/Title';
import { PostSchema } from '../../../src/components/Post/Read/Schema';

const MyPostsPage: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const { user_id } = router.query;
  const [create, setCreate] = useState(false);
  const { posts } = useGetMyPosts(Number(user_id));
  const { isMyAcct, username } = useGetUser(Number(user_id));
  const onClick = () => router.push(`/user/${user_id}/my_page`);
  return (
    <PostPage>
      <Title _data={{ theme, onClick, isMyAcct, setCreate, username }} />
      <PostSchema _data={{ theme, posts, create, setCreate, max_grid: 5 }} />
    </PostPage>
  );
};
export default MyPostsPage;
