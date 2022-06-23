import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import { ReadPost } from './ReadPost';
import { useRouter } from 'next/router';
import { PostIcons } from './PostIcons';
import { Svg } from '../../Style/Svg/Svg';
import { Background } from '../Avatar/Avatar';
import useUser from '../../../libs/client/useUser';
import { IGetAllPosts, IPostListProps } from '../../../types/post';
import { Grid, ListCont, ModalClose } from '../../../../styles/global';

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
      <Cont>
        <Grid className="post-grid" size={3}>
          {data?.posts?.map((post) => (
            <Post
              key={post.id}
              avatar={post.avatar}
              onClick={() => clickPost(post.id)}
            >
              {!post.avatar && <Svg type="no-image" />}
              <PostIcons
                post_id={post.id}
                user_id={post.UserID}
                board_id={post.BoardID}
              />
            </Post>
          ))}
        </Grid>
      </Cont>
      {readPost && <ReadPost post_id={postId} setReadPost={setReadPost} />}
      {readPost && <ModalClose onClick={() => setReadPost(false)} />}
    </>
  );
};
const Cont = styled(ListCont)`
  .post-grid {
    margin-top: 20px;
  }
`;
const Post = styled(Background)`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
