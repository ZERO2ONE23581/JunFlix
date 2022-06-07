import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrMsg } from '../../../../../styles/default';
import useMutation from '../../../../libs/client/useMutation';
import { Input } from '../../../Input';

export interface IEditPostCommentsForm {
  content?: string;
  comment_id?: string;
}
export interface IEditPostCommentsRes {
  ok: boolean;
  error?: string;
}
export const EditComments = ({
  userId,
  boardId,
  postId,
  comment_id,
  openEditForm,
  content,
}: any) => {
  const router = useRouter();
  const [editComments, { data, loading }] = useMutation<IEditPostCommentsRes>(
    `/api/user/${userId}/board/${boardId}/post/${postId}/comments/edit`
  );
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditPostCommentsForm>({ mode: 'onSubmit' });
  const onValid = ({ comment_id, content }: IEditPostCommentsForm) => {
    if (data) return;
    editComments({ comment_id, content });
  };
  useEffect(() => {
    if (content) setValue('content', content);
    if (data?.ok) {
      router.reload();
    }
  }, [router, data, setValue, content]);
  return (
    <>
      {errors.content && <ErrMsg>{errors.content?.message}</ErrMsg>}
      {openEditForm && (
        <Form onSubmit={handleSubmit(onValid)}>
          <input
            className="hidden"
            value={comment_id}
            {...register('comment_id')}
          />
          <Textarea
            {...register('content', { required: 'Edit a comment...' })}
            rows={5}
            id="content"
            name="content"
            placeholder="Edit a comment..."
          />
          <Button type="submit">{loading ? 'Loading...' : 'Post'}</Button>
        </Form>
      )}
    </>
  );
};
export const Textarea = styled.textarea`
  border: 3px solid blue;
  padding: 20px;
  font-size: 1.1rem;
  width: 100%;
`;
export const Button = styled.button`
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
