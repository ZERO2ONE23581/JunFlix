import useSWR from 'swr';
import Link from 'next/link';
import styled from '@emotion/styled';
import { Post } from '@prisma/client';
import { useRouter } from 'next/router';
import { ThumnailAvatar } from '../Avatar/Thumnail';
import { PostListIconWrap } from './PostIconWrap';

interface IGetBoardPost {
  posts: Post[];
}
export const BoardPostList = () => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const queryId = user_id && board_id;
  const { data } = useSWR<IGetBoardPost>(
    queryId && `/api/user/${user_id}/board/${board_id}/post`
  );
  const posts = data?.posts;
  return (
    <Cont>
      <h1>Posts</h1>
      <Grid>
        {posts?.map((post) => (
          <Link
            key={post.id}
            href={`/user/${post.UserID}/board/${post.BoardID}/post/${post.id}`}
          >
            <a>
              <ThumnailAvatar url={post.avatar} />
              <PostListIconWrap
                user_id={post.UserID}
                board_id={post.BoardID}
                post_id={post.id}
              />
            </a>
          </Link>
        ))}
      </Grid>
    </Cont>
  );
};
const Cont = styled.section`
  h1 {
    font-weight: 600;
    font-size: 1.4rem;
    margin: 20px;
    text-align: center;
  }
`;
const Grid = styled.article`
  gap: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  a {
    position: relative;
  }
`;
