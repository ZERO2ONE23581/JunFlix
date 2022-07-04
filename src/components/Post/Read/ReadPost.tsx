import useSWR from 'swr';
import { Main } from './Main';
import styled from '@emotion/styled';
import { TopLayer } from './TopLayer';
import { EditPost } from '../Edit/EditPost';
import { IGetPost } from '../../../types/post';
import { PostIconWrap } from '../../PostIconWrap';
import { DeletePost } from '../Delete/DeletePost';
import useUser from '../../../libs/client/useUser';
import { ThumnailAvatar } from '../../Avatar/Thumnail';
import { Dispatch, SetStateAction, useState } from 'react';
import { Modal, DimBackground } from '../../../../styles/global';
import { CreateComments } from '../../Comment/Create/CreateComments';
import { ReadComment } from '../../Comment/ReadComment';
import { Avatar } from '../../Avatar/Avatar';
import { CreatePostCmts } from '../../Comment/Create/CreatePostCmts';

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
  const [createCmt, setCreateCmt] = useState(false);
  return (
    <>
      <Cont>
        <Avatar
          url={post?.avatar}
          disabled
          // size={{ width: '100%', height: '100%' }}
          size={{ width: '40vw', height: '80vh' }}
        />
        <About>
          <TopLayer
            Board={post?.board!}
            isPostHost={isPostHost}
            setReadPost={setReadPost}
            setEditPost={setEditPost}
            setDeletePost={setDeletePost}
          />
          <div className="flex">
            <Main
              POST_TITLE={post?.title.toUpperCase()!}
              POST_CONTENT={post?.content!}
              CREATOR_AVATAR={post?.user?.avatar!}
              CREATOR_USERNAME={post?.user?.username!}
            />
            <div className="cmt">
              <PostIconWrap
                REVIEWID={0}
                POSTID={post?.id!}
                USERID={post?.UserID!}
                BOARDID={post?.BoardID!}
                setCreateCmt={setCreateCmt}
              />
              {createCmt && (
                <CreatePostCmts
                  replyID={0}
                  REVIEWID={0}
                  POSTID={post?.id!}
                  USERID={post?.UserID!}
                  BOARDID={post?.BoardID!}
                />
              )}
            </div>
          </div>
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
  height: 80vh;
  min-width: 900px;
  min-height: 500px;
  overflow: hidden;
  z-index: 102;
  gap: 0;
  flex-direction: row;
  border: none;
  .thumnail-avatar {
    img {
      min-width: 500px;
      min-height: 500px;
    }
  }
`;
const About = styled.article`
  width: 30vw;
  min-width: 400px;
  height: 100%;
  overflow: hidden;
  border-radius: 8px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  color: ${(p) => p.theme.color.font};
  border: ${(p) => p.theme.border.thick};
  background-color: ${(p) => p.theme.color.bg};
  .flex {
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .cmt {
    padding: 20px;
    border-top: ${(p) => p.theme.border.thin};
  }
`;
