import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ICreateCommentsRes } from '..';
import useMutation from '../../../../libs/client/useMutation';
import { IPostCommentsForm } from '../../../../types/comments';
import { Btn } from '../../../Button';
import { Input } from '../../../Input';

interface IDeletePostCommentsProps {
  userId?: string | string[];
  boardId?: string | string[];
  postId?: string | string[];
  commentId: any;
  openDelModal: any;
}

export const EditPostComments = ({
  userId,
  boardId,
  postId,
  commentId,
  openEdit,
}: any) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostCommentsForm>({ mode: 'onSubmit' });
  const [editComments, { data, loading }] = useMutation<ICreateCommentsRes>(
    `/api/user/${userId}/board/${boardId}/post/${postId}/comments/edit`
  );
  const onValid = ({ comment_id, newComments }: IPostCommentsForm) => {
    if (data) return;
    editComments({ comment_id, newComments });
  };
  useEffect(() => {
    if (data?.ok) {
      router.reload();
    }
  }, [router, data]);
  return (
    <>
      {openEdit && (
        <Form onSubmit={handleSubmit(onValid)}>
          <input
            className="hidden"
            value={commentId}
            {...register('comment_id')}
          />
          <Input
            register={register('newComments')}
            type="text"
            disabled={false}
            name="newComments"
            placeholder="Edit a comment..."
            errMsg={errors.comments?.message}
          />
          <BTN type="submit">{loading ? 'Loading...' : 'Post'}</BTN>
        </Form>
      )}
    </>
  );
};
const BTN = styled.button`
  width: 100%;
`;
const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
  .hidden {
    display: none;
  }
`;
