import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../../../styles/btn';
import { ErrMsg } from '../../../../../styles/default';
import useMutation from '../../../../libs/client/useMutation';
import { ICommentRes, IEditCommentForm } from '../../../../types/comments';

export const ReviewEditComment = ({ parentId, ogContent }: any) => {
  const router = useRouter();
  const { user_id, review_id } = router.query;
  const [editComment, { loading, data }] = useMutation<ICommentRes>(
    `/api/user/${user_id}/review/${review_id}/comment/${parentId}/edit`
  );
  //
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditCommentForm>({ mode: 'onSubmit' });
  const onValid = ({ content }: IEditCommentForm) => {
    if (loading) return;
    editComment({ content });
  };
  //
  useEffect(() => {
    if (ogContent) setValue('content', ogContent);
    if (data?.ok) {
      router.reload();
    }
  }, [router, data, setValue, ogContent]);
  //
  return (
    <>
      <Form onSubmit={handleSubmit(onValid)}>
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
        <Button type="submit">{loading ? 'Loading...' : 'Edit'}</Button>
      </Form>
    </>
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
const Button = styled(Btn)`
  width: 80px;
  height: 100px;
  font-size: 15px;
`;
