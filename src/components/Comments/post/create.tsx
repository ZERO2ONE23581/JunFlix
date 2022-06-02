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

export interface ICreateCommentsRes {
  ok: boolean;
  error?: string;
  comment: CommentsWithUser;
}

export const CreatePostComment = ({
  loggedInUser,
  userId,
  boardId,
  postId,
}: any) => {
  const router = useRouter();
  const [openForm, setOpenForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const isQueryId = Boolean(userId && boardId && postId);
  const { data } = useSWR<IGetPostInfo>(
    isQueryId && `/api/user/${userId}/board/${boardId}/post/${postId}`
  );
  const [createComments, { loading, data: response }] =
    useMutation<ICreateCommentsRes>(
      `/api/user/${userId}/board/${boardId}/post/${postId}/comments/create`
    );
  const [editComments, { loading: editLoading, data: editResponse }] =
    useMutation<ICreateCommentsRes>(
      `/api/user/${userId}/board/${boardId}/post/${postId}/comments/edit`
    );
  console.log(editResponse);
  const commentsCount = data?.post?._count.comments;
  const createCommentClick = () => {
    setOpenForm((p) => !p);
    if (!data) return;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostCommentsForm>({ mode: 'onSubmit' });
  //
  const onValid = ({ comments }: IPostCommentsForm) => {
    setOpenForm((p) => !p);
    if (loading) return;
    createComments({ comments });
  };
  //
  const [commentId, setCommentId] = useState('');
  const selectComment = (commentId: any) => {
    setEdit((p) => !p);
    setCommentId(commentId);
  };
  //
  const onValidEdit = ({ comment_id, newComments }: IPostCommentsForm) => {
    setOpenForm((p) => !p);
    if (editResponse) return;
    editComments({ comment_id, newComments });
  };
  useEffect(() => {
    if (editResponse?.ok) {
      router.reload();
    }
  }, [editResponse, router]);
  //
  return (
    <Cont>
      <Wrap>
        <IconBtn onClick={createCommentClick}>
          {data?.isComments || response?.ok ? (
            <Icons name="comments" type="solid" />
          ) : (
            <Icons name="comments" type="empty" />
          )}
        </IconBtn>
        <Counts>
          {response?.ok ? (
            <span>{commentsCount! + 1}</span>
          ) : (
            <span>{commentsCount ? commentsCount : '0'}</span>
          )}
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
          {response?.comment && (
            <article className="wrap">
              <p>{response?.comment.content}</p>
              <span className="span-wrap">
                <span>written by</span>
                <span className="username">
                  {response?.comment.user.username}
                </span>
              </span>
            </article>
          )}

          {/* 댓글수정 폼태그 */}
          {edit && (
            <EditForm onSubmit={handleSubmit(onValidEdit)}>
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
              {Number(commentId) !== info.id && (
                <>
                  <p>{info.content}</p>
                  <span className="span-wrap">
                    <span>written by</span>
                    <span className="username">{info.user.username}</span>
                  </span>
                </>
              )}
              <button type="button" onClick={() => selectComment(info.id)}>
                {edit ? 'back' : 'edit'}
              </button>
            </article>
          ))}
        </CommentsWrap>
      </Wrap>
    </Cont>
  );
};
const EditForm = styled.form`
  .hidden {
    display: none;
  }
`;

const EditBtn = styled.span`
  background-color: cornflowerblue;
  cursor: pointer;
  text-align: center;
  color: white;
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
    justify-content: space-between;
    border: 2px solid red;
    .span-wrap {
      font-style: italic;
      .username {
        font-weight: 700;
        margin-left: 5px;
      }
    }
  }
`;
