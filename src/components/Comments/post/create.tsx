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

export const CreatePostComment = ({
  loggedInUser,
  userId,
  boardId,
  postId,
}: ICreatePostCommentProps) => {
  const router = useRouter();
  const [openForm, setOpenForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const isQueryId = Boolean(userId && boardId && postId);
  //create
  const [createComments, { loading, data: response }] =
    useMutation<ICreateCommentsRes>(
      `/api/user/${userId}/board/${boardId}/post/${postId}/comments/create`
    );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostCommentsForm>({ mode: 'onSubmit' });
  const onValid = ({ comments }: IPostCommentsForm) => {
    setOpenForm((p) => !p);
    if (loading) return;
    createComments({ comments });
  };
  //update
  const [editComments, { loading: editLoading, data: editResponse }] =
    useMutation<ICreateCommentsRes>(
      `/api/user/${userId}/board/${boardId}/post/${postId}/comments/edit`
    );
  const [commentId, setCommentId] = useState(0);
  const handleSelect = (commentId: any) => {
    setCommentId(Number(commentId));
    setOpenEditForm(true);
  };
  const cancelSelect = () => {
    setCommentId(0);
    setOpenEditForm(false);
  };
  const onEditValid = ({ comment_id, newComments }: IPostCommentsForm) => {
    if (editResponse) return;
    editComments({ comment_id, newComments });
    setOpenEditForm(false);
  };
  //delete
  const [delCommentId, setDelCommentId] = useState(0);
  const [openDelModal, setOpenDelModal] = useState(false);
  const [deleteComment, { loading: delLoading, data: delResponse }] =
    useMutation<ICreateCommentsRes>(
      `/api/user/${userId}/board/${boardId}/post/${postId}/comments/delete`
    );
  const clickDeleteBtn = (commentId: any) => {
    setOpenDelModal(true);
    setDelCommentId(Number(commentId));
  };
  const cancelDelete = () => {
    setCommentId(0);
    setOpenDelModal(false);
  };
  const postDelete = () => {
    setOpenDelModal(false);
    deleteComment(delCommentId);
  };
  //read
  const { data } = useSWR<IGetPostInfo>(
    isQueryId && `/api/user/${userId}/board/${boardId}/post/${postId}`
  );
  const commentsCount = data?.post?._count.comments;
  useEffect(() => {
    if (response?.ok || editResponse?.ok) {
      router.reload();
    }
  }, [response, editResponse, router]);
  //
  return (
    <Container>
      {openDelModal && (
        <>
          <DelModal>
            <div>정말로 삭제하시겠습니까?</div>
            <div>
              <button onClick={postDelete}>Yes</button>
              <button onClick={cancelDelete}>No</button>
            </div>
          </DelModal>
          <BgDisabled />
        </>
      )}
      <Wrap>
        <IconBtn onClick={() => setOpenForm((p) => !p)}>
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
        {openForm && (
          <Form onSubmit={handleSubmit(onValid)}>
            <Input
              register={register('comments', {
                required: '댓글을 입력해주세요.',
              })}
              type="text"
              disabled={false}
              label="Comments"
              name="comments"
              placeholder="Add a comment..."
              errMsg={errors.comments?.message}
            />
            <Btn type="submit" btnName="POST" loading={loading} />
          </Form>
        )}
        <CommentsWrap>
          {openEditForm && (
            <EditForm onSubmit={handleSubmit(onEditValid)}>
              <input
                className="hidden"
                value={commentId}
                {...register('comment_id')}
              />
              <Input
                register={register('newComments')}
                type="text"
                disabled={false}
                label="newComments"
                name="newComments"
                placeholder="Add a comment..."
                errMsg={errors.comments?.message}
              />
              <Btn type="submit" btnName="Post" loading={editLoading} />
            </EditForm>
          )}
          {data?.post?.comments?.map((info) => (
            <article key={info.id} className="wrap">
              <span>{info.id}</span>
              {loggedInUser?.id === info.UserID &&
              commentId === info.id ? null : (
                <CommentsInfo>
                  <span>{info.content}</span>
                  <span className="user-span">
                    <span>written by</span>
                    <span className="username">{info.UserID}</span>
                    <span className="username">{info.user.username}</span>
                  </span>
                </CommentsInfo>
              )}
              {loggedInUser?.id === info.UserID && (
                <>
                  {!openEditForm ? (
                    <>
                      <SelectCommentBtn
                        type="button"
                        onClick={() => handleSelect(info.id)}
                      >
                        Edit
                      </SelectCommentBtn>
                      <button onClick={() => clickDeleteBtn(info.id)}>
                        delete
                      </button>
                    </>
                  ) : (
                    commentId === info.id && (
                      <button onClick={cancelSelect}>Cancel</button>
                    )
                  )}
                </>
              )}
            </article>
          ))}
        </CommentsWrap>
      </Wrap>
    </Container>
  );
};
const CommentsInfo = styled.article`
  border: 2px solid blueviolet;
  span {
    margin-right: 5px;
  }
`;
const EditForm = styled.form`
  .hidden {
    display: none;
  }
`;

const SelectCommentBtn = styled.button`
  background-color: cornflowerblue;
  text-align: center;
  color: white;
  border: none;
  padding: 5px;
`;
const EditInput = styled.input`
  border: 2px solid blueviolet;
  padding: 5px;
`;
const CommentsWrap = styled.article`
  border: 2px solid blueviolet;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  .wrap {
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    border: 2px solid red;
    .user-span {
      color: blue;
      font-style: italic;
      .username {
        font-weight: 700;
        margin-left: 5px;
      }
    }
  }
`;
const DelModal = styled.article`
  border: 3px solid red;
  width: 300px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
`;
const Container = styled.article`
  border: 5px solid cornflowerblue;
  width: 100%;
  position: relative;
`;
const BgDisabled = styled.article`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;
