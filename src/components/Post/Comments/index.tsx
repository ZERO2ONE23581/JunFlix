import useSWR from 'swr';
import { useState } from 'react';
import { Input } from '../../Input';
import { CommentIcon } from './icon';
import styled from '@emotion/styled';
import { User } from '@prisma/client';
import { EditPostComments } from './edit';
import { CreatePostComments } from './create';
import { DeletePostComments } from './delete';
import { LikesIcon } from '../../Button/Likes/post';
import { CommentsWithUser, IGetPostInfo } from '../../../types/comments';

export interface ICreateCommentsRes {
  ok: boolean;
  error?: string;
  comment: CommentsWithUser;
}
export interface IUpdateCommentsRes {
  ok: boolean;
  error?: string;
}
interface ICreatePostCommentProps {
  userId?: string | string[];
  boardId?: string | string[];
  postId?: string | string[];
  loggedInUser?: User;
}

export const LikesAndComments = ({
  userId,
  boardId,
  postId,
  loggedInUser,
}: ICreatePostCommentProps) => {
  const isQueryId = Boolean(userId && boardId && postId);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [commentId, setCommentId] = useState(0);
  const [keepCont, setKeepCont] = useState(false);
  const handleClick = (id: number, type: string) => {
    if (type === 'edit') {
      setCommentId(id);
      setOpenEdit(true);
    }
    if (type === 'delete') {
      setCommentId(id);
      setOpenDelete(true);
      setKeepCont(true);
    }
    if (type === 'cancel') {
      setCommentId(0);
      setOpenEdit(false);
    }
  };
  const { data } = useSWR<IGetPostInfo>(
    isQueryId && `/api/user/${userId}/board/${boardId}/post/${postId}`
  );
  const commentsCount = data?.post?._count.comments;
  //
  return (
    <>
      <DeletePostComments
        userId={userId}
        boardId={boardId}
        postId={postId}
        commentId={commentId}
        setCommentId={setCommentId}
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        setKeepCont={setKeepCont}
      />
      {openDelete && <BgDisabled />}
      <Cont>
        <IconWrap>
          <LikesIcon userId={userId} boardId={boardId} postId={postId} />
          <CommentIcon
            isComments={data?.isComments}
            setOpenCreate={setOpenCreate}
            commentsCount={commentsCount}
          />
        </IconWrap>
        {openCreate && (
          <CreatePostComments
            userId={userId}
            boardId={boardId}
            postId={postId}
            openCreate={openCreate}
          />
        )}
        <CommentList>
          {data?.post?.comments?.map((info) => (
            <Map key={info.id}>
              <Wrap>
                <Author>{info.user.username}</Author>
                <BtnWrap>
                  {openEdit && commentId === info.id && (
                    <Btn onClick={() => handleClick(info.id, 'cancel')}>
                      Cancel
                    </Btn>
                  )}
                  {loggedInUser?.id === info.UserID && !openEdit && (
                    <>
                      <Btn
                        disabled={openDelete}
                        onClick={() => handleClick(info.id, 'edit')}
                      >
                        Edit
                      </Btn>
                      <Btn
                        disabled={openDelete}
                        onClick={() => handleClick(info.id, 'delete')}
                      >
                        Delete
                      </Btn>
                    </>
                  )}
                </BtnWrap>
              </Wrap>
              <Detail>
                {loggedInUser?.id === info.UserID &&
                commentId === info.id &&
                !keepCont ? (
                  <EditPostComments
                    userId={userId}
                    boardId={boardId}
                    postId={postId}
                    commentId={commentId}
                    openEdit={openEdit}
                    setOpenEdit={setOpenEdit}
                  />
                ) : (
                  <input disabled={true} value={info.content} />
                )}
              </Detail>
            </Map>
          ))}
        </CommentList>
      </Cont>
    </>
  );
};
const IconWrap = styled.article`
  gap: 10px;
  display: flex;
  align-items: center;
`;
const Author = styled.div`
  color: blue;
  font-style: italic;
  font-weight: 700;
`;
const Detail = styled.article`
  input {
    margin-top: 5px;
    border-radius: 5px;
    padding: 10px;
    width: 100%;
    background-color: bisque;
    color: ${(p) => p.theme.color.font};
    border: ${(p) => p.theme.border};
    box-shadow: ${(p) => p.theme.boxShadow.input};
  }
`;
const Map = styled.article`
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow};
`;
const BtnWrap = styled.article`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Wrap = styled.article`
  gap: 5px;
  display: flex;
  padding: 8px 14px;
  align-items: center;
  justify-content: space-between;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.input};
`;
const CommentList = styled.article`
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Cont = styled.article`
  gap: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
`;
const Btn = styled.button`
  padding: 3px 10px;
`;
const BgDisabled = styled.article`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;
