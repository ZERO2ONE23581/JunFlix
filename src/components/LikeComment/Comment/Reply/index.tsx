import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ErrMsg } from '../../../../../styles/default';
import useMutation from '../../../../libs/client/useMutation';

export const ReplyForm = ({ replyTo }: any) => {
  const router = useRouter();
  const { user_id, board_id, post_id } = router.query;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });
  const [createReply, { loading, data }] = useMutation(
    `/api/user/${user_id}/board/${board_id}/post/${post_id}/comment/${replyTo}/create`
  );
  const onValid = ({ content }: any) => {
    if (loading) return;
    createReply({ content });
  };
  useEffect(() => {
    if (data?.ok) {
      router.reload();
    }
  }, [router, data]);
  //
  return (
    <>
      <Cont>
        <Form onSubmit={handleSubmit(onValid)}>
          {errors.content && <ErrMsg>{errors.content?.message}</ErrMsg>}
          <Textarea
            {...register('content', { required: '댓글을 입력해주세요.' })}
            id="content"
            name="content"
            placeholder="Add a comment..."
          />
          <Button type="submit">{loading ? 'Loading...' : 'Post'}</Button>
        </Form>
      </Cont>
    </>
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
const Form = styled.form`
  .hidden {
    display: none;
  }
`;
const Cont = styled.section`
  border: 2px solid red;
  padding: 20px;
`;
