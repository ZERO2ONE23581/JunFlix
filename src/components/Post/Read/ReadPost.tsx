import useSWR from 'swr';
import { Main } from './Main';
import styled from '@emotion/styled';
import { IconWrap } from './IconWrap';
import { TopLayer } from './TopLayer';
import { EditPost } from '../Edit/EditPost';
import { ReadComments } from './ReadComments';
import { IGetPost } from '../../../types/post';
import { DeletePost } from '../Delete/DeletePost';
import useUser from '../../../libs/client/useUser';
import { ThumnailAvatar } from '../../Avatar/Thumnail';
import { Dispatch, SetStateAction, useState } from 'react';
import { Modal, DimBackground } from '../../../../styles/global';
import { LikesBtn } from '../../Style/Icon/Likes/LikesBtn';

interface ICreatePostModalProps {
  USERID: number;
  BOARDID: number;
  POSTID: number;
  setReadPost: Dispatch<SetStateAction<boolean>>;
}
export const ReadPost = ({
  USERID,
  BOARDID,
  POSTID,
  setReadPost,
}: ICreatePostModalProps) => {
  const { loggedInUser } = useUser();
  const { data } = useSWR<IGetPost>(
    `/api/user/${USERID}/board/${BOARDID}/post/${POSTID}`
  );
  const post = data?.post;
  const isPostHost = Boolean(loggedInUser?.id === post?.UserID);
  const [editPost, setEditPost] = useState(false);
  const [deletePost, setDeletePost] = useState(false);
  return (
    <>
      <Cont>
        <ThumnailAvatar url={post?.avatar} />
        <About>
          <TopLayer
            Board={post?.board!}
            isPostHost={isPostHost}
            setReadPost={setReadPost}
            setEditPost={setEditPost}
            setDeletePost={setDeletePost}
          />
          <Main
            POST_TITLE={post?.title.toUpperCase()!}
            POST_CONTENT={post?.content!}
            CREATOR_AVATAR={post?.user?.avatar!}
            CREATOR_USERNAME={post?.user?.username!}
          />
          <IconWrap
            REVIEWID={0}
            POSTID={post?.id!}
            USERID={post?.UserID!}
            BOARDID={post?.BoardID!}
          />
          <ReadComments isPost isReview={false} />
        </About>
      </Cont>
      <DimBackground zIndex={101} onClick={() => setReadPost(false)} />

      {editPost && (
        <EditPost
          POSTID={post?.id!}
          USERID={post?.UserID!}
          BOARDID={post?.BoardID!}
          setEditPost={setEditPost}
        />
      )}
      {deletePost && (
        <DeletePost
          POSTID={post?.id!}
          USERID={post?.UserID!}
          BOARDID={post?.BoardID!}
          openModal={setDeletePost}
        />
      )}
    </>
  );
};
const Cont = styled(Modal)`
  padding: 0;
  width: 70vw;
  height: 75vh;
  min-width: 900px;
  overflow: hidden;
  //
  z-index: 102;
  gap: 0;
  flex-direction: row;
  .thumnail-avatar {
    width: 60%;
    height: 100%;
  }
  border: none;
`;
const About = styled.article`
  width: 40%;
  height: 100%;
  overflow: hidden;
  border-radius: 8px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  color: ${(p) => p.theme.color.font};
  border: ${(p) => p.theme.border.thin};
  background-color: ${(p) => p.theme.color.bg};
`;
