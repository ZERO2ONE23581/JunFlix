import useSWR from 'swr';
import Link from 'next/link';
import styled from '@emotion/styled';
import { IGetAllPosts, IPostListProps } from '../../../types/post';
import { IGetLikes } from '../../../types/likes';
import { Avatar } from '../../Avatar';

export const PostList = ({
  isAllPosts,
  isMyPosts,
  findLikes,
}: IPostListProps) => {
  const { data } = useSWR<IGetAllPosts>(
    isAllPosts ? `/api/all/posts` : isMyPosts && `/api/my/posts`
  );
  const { data: LikeData } = useSWR<IGetLikes>(findLikes && `/api/my/likes`);
  const posts = data?.posts;
  const likes = LikeData?.postlikes;
  return (
    <Grid>
      {posts?.map((post) => (
        <Link
          key={post.id}
          href={`/user/${post.UserID}/board/${post.BoardID}/post/${post.id}`}
        >
          <a>
            <Avatar url={post.avatar} size={300} />
          </a>
        </Link>
      ))}
      {likes?.map((like) => (
        <Link
          key={like.id}
          href={`/user/${like.post.UserID}/board/${like.post.BoardID}/post/${like.post.id}`}
        >
          <a>
            <Avatar url={like.post.avatar} size={300} />
          </a>
        </Link>
      ))}
    </Grid>
  );
};
const Grid = styled.article`
  margin-top: 15px;
  gap: 15px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;
