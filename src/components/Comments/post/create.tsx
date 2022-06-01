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
import { CommentList, CommentsWrap } from '..';

interface ICreateCommentsRes {
  ok: boolean;
  error?: string;
  comment: CommentsWithUser;
}

export const PostComments = ({ userId, boardId, postId }: any) => {
  const [openForm, setOpenForm] = useState(false);
  const isQueryId = Boolean(userId && boardId && postId);
  const { data, mutate } = useSWR<IGetPostInfo>(
    isQueryId && `/api/user/${userId}/board/${boardId}/post/${postId}`
  );
  const [createComments, { loading, data: response }] =
    useMutation<ICreateCommentsRes>(
      `/api/user/${userId}/board/${boardId}/post/${postId}/create/comments`
    );
  const commentsCount = data?.post?._count.comments;
  const handleClick = async () => {
    setOpenForm((p) => !p);
    if (!data) return;
  };
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

  //
  return (
    <>
      <Cont>
        <Wrap>
          <IconBtn onClick={handleClick}>
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
            {/* <CommentList comments={data?.post?.comments} /> */}
            {data?.post?.comments?.map((info) => (
              <article key={info.id} className="wrap">
                <p>{info.content}</p>
                <span className="span-wrap">
                  <span>written by</span>
                  <span className="username">{info.user.username}</span>
                </span>
              </article>
            ))}
          </CommentsWrap>
          {/* <CommnetsList comments={data?.post.comments} /> */}
        </Wrap>
      </Cont>
    </>
  );
};
