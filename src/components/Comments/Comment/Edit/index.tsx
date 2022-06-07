import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../../../styles/btn';
import { ErrMsg } from '../../../../../styles/default';
import useMutation from '../../../../libs/client/useMutation';

import { IEditPostCommentsForm } from './index copy';

interface IEditCommentRes {
  ok: boolean;
  error?: string;
}

export const EditComment = ({ parentId }: any) => {
  const router = useRouter();
  const { user_id, board_id, post_id } = router.query;
  const [editComment, { loading, data }] = useMutation<IEditCommentRes>(
    `/api/user/${user_id}/board/${board_id}/post/${post_id}/comment/${parentId}/edit`
  );
  //
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditPostCommentsForm>({ mode: 'onSubmit' });
  const onValid = ({ content }: IEditPostCommentsForm) => {
    if (loading) return;
    editComment({ content });
  };
  //
  useEffect(() => {
    if (data?.ok) {
      router.reload();
    }
  }, [router, data]);
  //
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <>
          {data?.error && <ErrMsg>{data?.error}</ErrMsg>}
          {errors.content && <ErrMsg>{errors.content?.message}</ErrMsg>}
        </>
        <Textarea
          {...register('content', { required: '댓글을 입력해주세요.' })}
          id="content"
          name="content"
          placeholder="Add a comment..."
        />
        <CommentBtn type="submit">{loading ? 'Loading...' : 'Edit'}</CommentBtn>
      </form>
    </>
  );
};

const Textarea = styled.textarea`
  margin-bottom: 15px;
  width: 100%;
  height: 100px;
  padding: 20px;
  font-size: 1.1rem;
  border-radius: 5px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
`;
const CommentBtn = styled(Btn)`
  font-size: 1rem;
  padding: 10px 20px;
`;
