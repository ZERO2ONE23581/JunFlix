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
    </>
  );
};
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
const BgDisabled = styled.article`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;
const Form = styled.form`
  .hidden {
    display: none;
  }
`;
