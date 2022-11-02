import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { PostPage } from '../../all/posts';
import { useGetUser } from '../../../src/libs/client/useUser';
import { useGetPosts } from '../../../src/libs/client/usePosts';
import { PostSchema } from '../../../src/components/Post/Read/Schema';
import styled from '@emotion/styled';
import { useCapLetters } from '../../../src/libs/client/useTools';
import { motion } from 'framer-motion';
import { color, redColor } from '../../../styles/variants';

const MyPostsPage: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const { user_id } = router.query;
  const [create, setCreate] = useState(false);
  const { posts } = useGetPosts(Number(user_id), 0);
  const { username } = useGetUser(Number(user_id));
  const onClick = () => router.push(`/user/${user_id}/my_page`);
  return (
    <Page>
      <UserName
        animate="animate"
        whileHover="hover"
        className="username"
        custom={theme}
        onClick={onClick}
        variants={nameVar}
      >
        {useCapLetters(username)}'s posts
      </UserName>
      <PostSchema _data={{ theme, posts, create, setCreate, max_grid: 5 }} />
    </Page>
  );
};
export default MyPostsPage;
const Page = styled(PostPage)`
  .username {
    top: 1rem;
    left: 50%;
    cursor: pointer;
    position: absolute;
    width: fit-content;
    font-size: 1.8rem;
  }
`;
const UserName = styled(motion.h1)``;

const nameVar = {
  animate: (theme: boolean) => ({
    x: '-50%',
    color: color(theme),
  }),
  hover: { color: redColor },
};
