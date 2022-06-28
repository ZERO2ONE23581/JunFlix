import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../../Style/Button';
import { useForm } from 'react-hook-form';
import { Errors } from '../../../../../styles/global';
import useMutation from '../../../../libs/client/useMutation';
import { ICommentRes, IEditCommentForm } from '../../../../types/comments';

interface IEditComments {
  type: string | null;
  parentId?: number | null;
  ogContent?: string | null;
}

export const EditComments = ({ type, parentId, ogContent }: IEditComments) => {
  const router = useRouter();
  const { user_id, board_id, post_id, review_id } = router.query;
  const [EditPostComments, { loading: PostLoading, data: PostData }] =
    useMutation<ICommentRes>(
      `/api/user/${user_id}/board/${board_id}/post/${post_id}/comment/${parentId}/edit`
    );
  const [EditReviewComments, { loading: ReviewLoading, data: ReviewData }] =
    useMutation<ICommentRes>(
      `/api/user/${user_id}/review/${review_id}/comment/${parentId}/edit`
    );
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditCommentForm>({ mode: 'onSubmit' });
  const onValid = ({ content }: IEditCommentForm) => {
    if (type === 'post') {
      if (PostLoading) return;
      EditPostComments({ content });
    }
    if (type === 'review') {
      if (ReviewLoading) return;
      EditReviewComments({ content });
    }
  };
  const IsDataOk = Boolean(PostData?.ok || ReviewData?.ok);
  useEffect(() => {
    if (ogContent) setValue('content', ogContent);
    if (IsDataOk) {
      router.reload();
    }
  }, [router, setValue, ogContent, IsDataOk]);
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Textarea
        {...register('content', { required: '댓글을 입력해주세요.' })}
        id="content"
        name="content"
        placeholder="Add a comment..."
      />
      {PostData?.error && <Errors>{PostData?.error}</Errors>}
      {errors.content && <Errors>{errors.content?.message}</Errors>}

      {type === 'post' && (
        <Btn name="Edit" loading={PostLoading} type="submit" />
      )}
      {type === 'review' && (
        <Btn name="Edit" loading={ReviewLoading} type="submit" />
      )}
    </Form>
  );
};
const Form = styled.form`
  gap: 10px;
  display: flex;
  align-items: center;
`;
const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 20px;
  font-size: 1.1rem;
  border-radius: 5px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
`;
