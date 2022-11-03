import { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { PostPage } from '../../../all/posts';
import { color, redColor } from '../../../../styles/variants';
import { useGetUser } from '../../../../src/libs/client/useUser';
import { useGetPosts } from '../../../../src/libs/client/usePosts';
import { PostSchema } from '../../../../src/components/Post/Read/Schema';
import { Flex } from '../../../../styles/global';

const QSPostsPage: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const { user_id } = router.query;
  const [create, setCreate] = useState(false);
  const { posts } = useGetPosts(Number(user_id), 0);
  const { userId } = useGetUser(Number(user_id));
  const onClick = () => router.push(`/user/${user_id}/my_page`);
  return (
    <Page>
      <Flex
        animate="animate"
        whileHover="hover"
        className="page-title"
        custom={theme}
        onClick={onClick}
        variants={nameVar}
      >
        <span>Quick Saved</span>
        <span className="userId">@{userId}</span>
      </Flex>
      <PostSchema _data={{ theme, posts, create, setCreate, max_grid: 5 }} />
    </Page>
  );
};
export default QSPostsPage;

const Page = styled(PostPage)`
  .page-title {
    gap: 1rem;
    top: 1rem;
    left: 5rem;
    cursor: pointer;
    position: absolute;
    align-items: flex-end;
    width: fit-content;
    font-size: 1.8rem;
    //border: 2px solid red;
    .userId {
      opacity: 0.9;
      font-size: 1.3rem;
      font-style: italic;
    }
  }
`;
const nameVar = {
  animate: (theme: boolean) => ({
    color: color(theme),
  }),
  hover: { color: redColor },
};
