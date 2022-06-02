import styled from '@emotion/styled';
import { Comments, Post, User } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { Btn } from '../../Button';
import { Form } from '../../../../styles/default';
import { Icons } from '../../../../styles/svg';
import useMutation from '../../../libs/client/useMutation';
import { Input } from '../../Input';
import { Cont, Counts, IconBtn, Wrap } from '../../Button/Likes/post';
import {
  CommentsWithUser,
  IGetPostInfo,
  IPostCommentsForm,
} from '../../../types/comments';
import { Router, useRouter } from 'next/router';
import { ModalClose } from '../../../../styles/modal';
import { DeletePostCmtModal } from '../../Modal/Post/Comment/Delete';
import { DeletePostComments } from './delete';
import { EditPostComments } from './edit';
import { CreatePostComments } from './create';

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

export const PostComment = ({
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
  const handleClick = (id: number, type: string) => {
    if (type === 'edit') {
      setCommentId(id);
      setOpenEdit(true);
    }
    if (type === 'delete') {
      setCommentId(id);
      setOpenDelete(true);
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
    <Container>
      <DeletePostComments
        userId={userId}
        boardId={boardId}
        postId={postId}
        commentId={commentId}
        setCommentId={setCommentId}
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
      />
      <Wrap>
        <IconBtn onClick={() => setOpenCreate((p) => !p)}>
          {data?.isComments ? (
            <Icons name="comments" type="solid" />
          ) : (
            <Icons name="comments" type="empty" />
          )}
        </IconBtn>
        <Counts>
          <span>{commentsCount ? commentsCount : '0'}</span>
          <span>Comments</span>
        </Counts>
        {openCreate && (
          <CreatePostComments
            userId={userId}
            boardId={boardId}
            postId={postId}
            openCreate={openCreate}
          />
        )}
        <CommentsWrap>
          {data?.post?.comments?.map((info) => (
            <CommentsItemWrap key={info.id}>
              {loggedInUser?.id === info.UserID && commentId === info.id ? (
                <EditPostComments
                  userId={userId}
                  boardId={boardId}
                  postId={postId}
                  commentId={commentId}
                  openEdit={openEdit}
                  setOpenEdit={setOpenEdit}
                />
              ) : (
                <CommentsInfo>
                  <span>{info.content}</span>
                  <WrittenBy>
                    <span>written by</span>
                    <span className="username">{info.user.username}</span>
                  </WrittenBy>
                </CommentsInfo>
              )}
              {loggedInUser?.id === info.UserID && (
                <>
                  {!openEdit ? (
                    <BtnWrap>
                      <button
                        type="button"
                        onClick={() => handleClick(info.id, 'edit')}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleClick(info.id, 'delete')}
                      >
                        delete
                      </button>
                    </BtnWrap>
                  ) : (
                    commentId === info.id && (
                      <button
                        type="button"
                        onClick={() => handleClick(info.id, 'cancel')}
                      >
                        back
                      </button>
                    )
                  )}
                </>
              )}
            </CommentsItemWrap>
          ))}
        </CommentsWrap>
      </Wrap>
    </Container>
  );
};
const WrittenBy = styled.span`
  color: blue;
  font-style: italic;
  .username {
    font-weight: 700;
  }
`;
const CommentsItemWrap = styled.article`
  display: flex;
  align-items: center;
  border: 2px solid red;
  padding: 10px;
`;
const BtnWrap = styled.article``;
const CommentsInfo = styled.article`
  span {
    margin-right: 5px;
  }
`;
const CommentsWrap = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const Container = styled.article`
  border: 5px solid cornflowerblue;
  width: 100%;
  position: relative;
`;
