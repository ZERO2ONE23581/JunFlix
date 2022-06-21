import useSWR from 'swr';
import Link from 'next/link';
import styled from '@emotion/styled';
import useUser from '../../../libs/client/useUser';
import { ThumnailAvatar } from '../Avatar/Thumnail';
import { PostIconWrap } from './PostIconWrap';
import { IGetAllPosts, IPostListProps } from '../../../types/post';
import { Grid, ListCont, ThumnAvatarCont } from '../../../../styles/global';

export const PostList = ({
  findLikes,
  isMyPosts,
  isAllPosts,
}: IPostListProps) => {
  const { isLoggedIn, loggedInUser } = useUser();
  const typeSelect = (type: string) => {
    if (type === 'data') {
      if (isAllPosts) return `/api/user/all/posts`;
      if (isLoggedIn && isMyPosts) return `/api/user/my/posts`;
      if (isLoggedIn && findLikes) return `/api/user/my/posts`;
    }
    if (type === 'title') {
      if (isAllPosts) return `All Boards`;
      if (isLoggedIn && isMyPosts) return `${loggedInUser}'s Boards`;
    }
  };
  const { data } = useSWR<IGetAllPosts>(typeSelect('data'));
  const PostArray = data?.posts;
  const PostLink = (userId: number, boardId: number, postId: number) => {
    return `/user/${userId}/board/${boardId}/post/${postId}`;
  };
  const LikesArray = data?.postlikes;
  return (
    <Cont>
      <h1>{isAllPosts ? 'All Posts' : isMyPosts ? 'Posts' : null}</h1>
      <Grid>
        {PostArray?.map((post) => (
          <Post key={post.id}>
            <Link href={`${PostLink(post.UserID, post.BoardID, post.id)}`}>
              <a>
                <ThumnailAvatar url={post.avatar} />
              </a>
            </Link>
            <PostIconWrap
              post_id={post.id}
              user_id={post.UserID}
              board_id={post.BoardID}
            />
          </Post>
        ))}
        {LikesArray?.map((like) => (
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
    </Cont>
  );
};
const Cont = styled(ListCont)``;
const Post = styled(ThumnAvatarCont)`
  position: relative;
`;
