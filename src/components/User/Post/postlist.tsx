import useSWR from 'swr';
import Link from 'next/link';
import styled from '@emotion/styled';
import { PostListIconWrap } from './PostListIconWrap';
import { IGetLikes } from '../../../types/likes';
import { ThumnailAvatar } from '../Avatar/Thumnail';
import { IGetAllPosts, IPostListProps } from '../../../types/post';

export const PostList = ({
  isAllPosts,
  isMyPosts,
  findLikes,
}: IPostListProps) => {
  const { data } = useSWR<IGetAllPosts>(
    isAllPosts ? `/api/user/all/posts` : isMyPosts && `/api/user/my/posts`
  );
  const { data: LikeData } = useSWR<IGetLikes>(
    findLikes && `/api/user/my/likes`
  );
  const posts = data?.posts;
  const likes = LikeData?.postlikes;
  console.log(posts);
  return (
    <>
      <h1>{isAllPosts ? 'All Posts' : isMyPosts ? 'My Posts' : null}</h1>
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
        {likes?.map((like) => (
          <Link
            key={like.id}
            href={`/user/${like.post.UserID}/board/${like.post.BoardID}/post/${like.post.id}`}
          >
            <a>
              <ThumnailAvatar url={like.post.avatar} />
            </a>
          </Link>
        ))}
      </Grid>
    </>
  );
};
const Grid = styled.article`
  gap: 20px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  a {
    position: relative;
  }
`;
