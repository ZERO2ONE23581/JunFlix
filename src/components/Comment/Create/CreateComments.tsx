import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Btn } from '../../Style/Button';
import { ErrorMsg } from '../../Style/ErrMsg';
import useUser from '../../../libs/client/useUser';
import { ProfileAvatar } from '../../Avatar/Profile';
import { Form, FormCont } from '../../../../styles/global';
import useMutation from '../../../libs/client/useMutation';
import { ICommentRes, ICreateCommentsForm } from '../../../types/comments';

interface ICreateCommentsProps {
  parentId?: number | null;
  type: string | null;
}

export const CreateComments = ({ parentId, type }: ICreateCommentsProps) => {
  const { loggedInUser } = useUser();
  const router = useRouter();
  const { user_id, board_id, post_id, review_id } = router.query;

  const [createPostComments, { loading: PostCmtLoading, data: PostCmtData }] =
    useMutation<ICommentRes>(
      `/api/user/${user_id}/board/${board_id}/post/${post_id}/comment/create`
    );
  const [
    createReviewComments,
    { loading: ReviewCmtLoading, data: ReviewCmtData },
  ] = useMutation<ICommentRes>(
    `/api/user/${user_id}/review/${review_id}/comment/create`
  );

  const [
    createPostReplies,
    { loading: PostReplyLoading, data: PostReplyData },
  ] = useMutation<ICommentRes>(
    `/api/user/${user_id}/board/${board_id}/post/${post_id}/comment/${parentId}/create`
  );
  const [
    createReviewReplies,
    { loading: ReviewReplyLoading, data: ReviewReplyData },
  ] = useMutation<ICommentRes>(
    `/api/user/${user_id}/review/${review_id}/comment/${parentId}/create`
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateCommentsForm>({ mode: 'onSubmit' });
  const onValid = ({ content }: ICreateCommentsForm) => {
    if (type === 'post') {
      if (parentId) {
        if (PostReplyLoading) return;
        return createPostReplies({ content });
      } else {
        if (PostCmtLoading) return;
        return createPostComments({ content });
      }
    }
    if (type === 'review') {
      if (parentId) {
        if (ReviewReplyLoading) return;
        return createReviewReplies({ content });
      } else {
        if (ReviewCmtLoading) return;
        return createReviewComments({ content });
      }
    }
  };
  const IsDataOk = Boolean(
    PostCmtData?.ok ||
      PostReplyData?.ok ||
      ReviewCmtData?.ok ||
      ReviewReplyData?.ok
  );
  useEffect(() => {
    if (IsDataOk) {
      router.reload();
    }
  }, [router, IsDataOk]);
  //
  return (
    <Cont>
      <FormCont>
        <ProfileAvatar url={loggedInUser?.avatar} />
        <Form onSubmit={handleSubmit(onValid)}>
          <Textarea
            {...register('content', { required: '댓글을 입력해주세요.' })}
            id="content"
            name="content"
            placeholder="Add a comment..."
          />
          {errors.content && <ErrorMsg error={errors.content?.message} />}
          {PostCmtData?.error && <ErrorMsg error={PostCmtData.error} />}
          {PostReplyData?.error && <ErrorMsg error={PostReplyData.error} />}

          {type === 'post' && (
            <Btn
              name="Post"
              type="submit"
              loading={PostCmtLoading ? PostCmtLoading : PostReplyLoading}
            />
          )}
          {type === 'review' && (
            <>
              <Btn
                name="Post"
                type="submit"
                loading={
                  ReviewCmtLoading ? ReviewCmtLoading : ReviewReplyLoading
                }
              />
            </>
          )}
        </Form>
      </FormCont>
    </Cont>
  );
};
const Cont = styled.article`
  padding: 20px;
  border-radius: 5px;
  .avatar-form-wrap {
    gap: 15px;
    display: flex;
    form {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }
`;

const Textarea = styled.textarea`
  margin-bottom: 15px;
  width: 100%;
  height: 100px;
  padding: 20px;
  font-size: 1.1rem;
  border-radius: 5px;
  outline: none;
  border: ${(p) => p.theme.border};
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
`;
