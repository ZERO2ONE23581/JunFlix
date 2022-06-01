import styled from '@emotion/styled';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '../../../styles/default';
import useMutation from '../../libs/client/useMutation';
import { CommentsWithUser, IPostCommentsForm } from '../../types/comments';
import { Btn } from '../Button';
import { Input } from '../Input';

interface ICommentsListProps {
  comments?: CommentsWithUser[];
}
export const CommentList = ({ comments }: ICommentsListProps) => {
  return (
    <>
      <>
        <CommentsWrap>
          {comments &&
            comments.map((info) => (
              <article key={info.id} className="wrap">
                <p>{info.content}</p>
                <span className="span-wrap">
                  <span>written by</span>
                  <span className="username">{info.user.username}</span>
                </span>
              </article>
            ))}
        </CommentsWrap>
      </>
    </>
  );
};
export const CreateCommentForm = ({ userId, boardId, postId }: any) => {
  const [createComments, { loading, data: response }] = useMutation(
    `/api/user/${userId}/board/${boardId}/post/${postId}/create/comments`
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostCommentsForm>({ mode: 'onSubmit' });
  const onValid = ({ comments }: IPostCommentsForm) => {
    if (loading) return;
    createComments({ comments });
  };
  return (
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
  );
};
export const CommentsWrap = styled.article`
  border: 2px solid blueviolet;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  .wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .span-wrap {
      border: 2px solid red;
      font-style: italic;
      .username {
        font-weight: 700;
        margin-left: 5px;
      }
    }
  }
`;
