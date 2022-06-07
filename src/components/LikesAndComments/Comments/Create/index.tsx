import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ErrMsg } from '../../../../../styles/default';
import useMutation from '../../../../libs/client/useMutation';
import { ICreateCommentsRes } from '../../../../types/comments';

interface IPostCommentsForm {
  content?: string;
}
export const CreateComment = ({ parentId }: any) => {
  const router = useRouter();
  const { user_id, board_id, post_id } = router.query;

  //create comment
  const [createComments, { loading, data }] = useMutation<ICreateCommentsRes>(
    `/api/user/${user_id}/board/${board_id}/post/${post_id}/comment/create`
  );
  //create reply
  const [createReply, { loading: replyLoading, data: replyResponse }] =
    useMutation(
      `/api/user/${user_id}/board/${board_id}/post/${post_id}/comment/${parentId}/create`
    );
  //
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostCommentsForm>({ mode: 'onSubmit' });

  const onValid = ({ content }: IPostCommentsForm) => {
    if (parentId) {
      if (replyLoading) return;
      return createReply({ content });
    } else {
      if (loading) return;
      return createComments({ content });
    }
  };
  useEffect(() => {
    if (data?.ok || replyResponse?.ok) {
      router.reload();
    }
  }, [router, data, replyResponse]);
  //
  return (
    <Cont>
      <h1>Create Comment</h1>
      <form onSubmit={handleSubmit(onValid)}>
        {errors.content && <ErrMsg>{errors.content?.message}</ErrMsg>}
        <Textarea
          {...register('content', { required: '댓글을 입력해주세요.' })}
          id="content"
          name="content"
          placeholder="Add a comment..."
        />
        <Button type="submit">
          {loading ? 'Loading...' : replyLoading ? 'Loading...' : 'Post'}
        </Button>
      </form>
    </Cont>
  );
};
const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 20px;
  font-size: 1.1rem;
  border-radius: 5px;
  outline: ${(p) => p.theme.color.font};
  border: 2px solid ${(p) => p.theme.color.font};
`;
const Button = styled.button`
  width: 120px;
  height: 40px;
  font-size: 1rem;
`;
const Cont = styled.article`
  padding: 20px;
  border-radius: 5px;
  border: 3px solid #16a085;
  h1 {
    color: #16a085;
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 4px;
  }
`;
