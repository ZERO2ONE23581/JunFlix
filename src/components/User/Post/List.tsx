import useSWR from 'swr';
import Link from 'next/link';
import { useState } from 'react';
import styled from '@emotion/styled';
import { ReadPost } from './ReadPost';
import { useRouter } from 'next/router';
import { PostIconWrap } from './PostIconWrap';
import useUser from '../../../libs/client/useUser';
import { ThumnailAvatar } from '../Avatar/Thumnail';
import { IGetAllPosts, IPostListProps } from '../../../types/post';
import {
  Grid,
  ListCont,
  ModalClose,
  ThumnAvatarCont,
} from '../../../../styles/global';

export const PostList = ({
  isBoardPosts,
  isAllPosts,
  isAllMyPosts,
  isGetLikes,
}: IPostListProps) => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const { isLoggedIn, loggedInUser } = useUser();
  const SelectType = (type: string) => {
    if (type === 'api') {
      if (isBoardPosts && user_id && board_id)
        return (
          user_id && board_id && `/api/user/${user_id}/board/${board_id}/post`
        );
      if (isAllPosts) return `/api/user/all/posts`;
      if (isLoggedIn && (isAllMyPosts || isGetLikes))
        return `/api/user/my/posts`;
    }
    if (type === 'title') {
      if (isBoardPosts) return `게시물`;
      if (isAllPosts) return `All Boards`;
      if (isLoggedIn) {
        if (isAllMyPosts) return `${loggedInUser}'s Posts`;
        if (isGetLikes) return `${loggedInUser}님이 좋아하는 Posts`;
      }
    }
  };
  const { data } = useSWR<IGetAllPosts>(SelectType('api'));
  const [readPost, setReadPost] = useState(false);
  const [postId, setPostId] = useState(0);
  const clickPost = (id: number) => {
    setReadPost(true);
    if (id) setPostId(id);
  };
  return (
    <>
      {readPost && <ModalClose onClick={() => setReadPost(false)} />}
      {readPost && <ReadPost post_id={postId} openModal={setReadPost} />}
      <Cont>
        <Grid className="grid">
          {data?.posts?.map((post) => (
            <Post onClick={() => clickPost(post.id)} key={post.id}>
              <ThumnailAvatar url={post.avatar} />
              <PostIconWrap
                post_id={post.id}
                user_id={post.UserID}
                board_id={post.BoardID}
              />
            </Post>
          ))}
        </Grid>
      </Cont>

      {isGetLikes && (
        <Cont>
          <Grid className="grid">
            {data?.postlikes?.map((like) => (
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
      )}
    </>
  );
};
const Cont = styled(ListCont)`
  .grid {
    margin-top: 20px;
    grid-template-columns: repeat(3, 1fr);
  }
`;
const Post = styled(ThumnAvatarCont)`
  cursor: pointer;
  position: relative;
`;
