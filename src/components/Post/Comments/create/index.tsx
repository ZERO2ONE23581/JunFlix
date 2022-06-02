import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
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

export const CreatePostComments = ({
  userId,
  boardId,
  postId,
  openCreate,
}: any) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostCommentsForm>({ mode: 'onSubmit' });
  const [createComments, { loading, data }] = useMutation<ICreateCommentsRes>(
    `/api/user/${userId}/board/${boardId}/post/${postId}/comments/create`
  );
  const onValid = ({ comments }: IPostCommentsForm) => {
    if (loading) return;
    createComments({ comments });
  };
  useEffect(() => {
    if (data?.ok) {
      router.reload();
    }
  }, [router, data]);
  return (
    <>
      {openCreate && (
        <form onSubmit={handleSubmit(onValid)}>
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
          <BTN type="submit">{loading ? 'Loading...' : 'Post'}</BTN>
        </form>
      )}
    </>
  );
};
const BTN = styled.button`
  width: 100%;
`;
