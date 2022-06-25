import useSWR from 'swr';
import { Dispatch, SetStateAction, useState } from 'react';
import styled from '@emotion/styled';
import { PostIcons } from './PostIcons';
import { Svg } from '../../Style/Svg/Svg';
import { Grid, ListCont } from '../../../../styles/global';
import { Post } from '@prisma/client';
import { IGetAllPosts } from '../../../types/post';
import { WithAvatar } from './Create/AvatarInput';
import { ReadPost } from './ReadPost';

interface IPostListProps {
  isHost: boolean;
  USERID: number;
  BOARDID: number;
  posts?: Post[];
  isAllPosts?: boolean;
  isAllMyPosts?: boolean;
  isLikedPosts?: boolean;
}
export const PostList = ({
  USERID,
  BOARDID,
  isAllPosts,
  isAllMyPosts,
  isLikedPosts,
}: IPostListProps) => {
  const { data } = useSWR<IGetAllPosts>(
    `/api/user/${USERID}/board/${BOARDID}/post`
  );
  const { data: AllPosts } = useSWR<IGetAllPosts>(`/api/user/all/posts`);
  const { data: MyPosts } = useSWR<IGetAllPosts>(`/api/user/my/posts`);
  //
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
    </>
  );
};
const Cont = styled(ListCont)`
  .post-grid {
    margin-top: 20px;
  }
`;
const Post = styled(WithAvatar)`
  display: flex;
  height: 300px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;
