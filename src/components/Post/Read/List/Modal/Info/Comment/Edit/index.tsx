import {
  ICommentRes,
  CommentWithUser,
  IEditCommentForm,
} from '../../../../../../../../types/comments';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { Svg } from '../../../../../../../Style/Svg/Svg';
import { CapFirstLetter } from '../../../../../../../Tools';
import { Creator } from '../../../../../../../../../Creator';
import { ErrorMsg } from '../../../../../../../Style/ErrMsg';
import { IPostCmtQuery } from '../../../../../../../../types/post';
import { IconBtn } from '../../../../../../../Style/Button/IconBtn';
import { TextArea } from '../../../../../../../Style/Input/TextArea';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useMutation from '../../../../../../../../libs/client/useMutation';

interface IEditComments extends IPostCmtQuery {
  chosenId: number;
  comment: CommentWithUser;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setChosenId: Dispatch<SetStateAction<number>>;
}
export const EditComment = ({
  userId,
  boardId,
  postId,
  comment,
  setEdit,
  setChosenId,
}: IEditComments) => {
  const [Edit, { loading, data }] = useMutation<ICommentRes>(
    `/api/user/${userId}/board/${boardId}/post/${postId}/comment/${comment?.id}/edit`
  );
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditCommentForm>({ mode: 'onSubmit' });
  const onValid = ({ content }: IEditCommentForm) => {
    if (loading) return;
    Edit({ content });
  };
  useEffect(() => {
    if (comment?.content) setValue('content', CapFirstLetter(comment.content));
  }, [setValue, comment]);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const content = watch('content');
    setHeight(content?.length!);
  }, [setHeight, watch('content')]);
  //
  useEffect(() => {
    if (data?.ok) {
      alert('댓글을 수정했습니다.');
      setChosenId(0);
      setEdit(false);
    }
  }, [data, setEdit, setChosenId]);
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Cont>
        <Creator userAvatar={comment?.user.avatar!} size="2.5rem" />
        <TextArea
          {...register('content', { required: '댓글을 입력해주세요.' })}
          id="content"
          name="content"
          height={height}
          placeholder="댓글 달기..."
        />
        {!loading && <IconBtn size="2rem" type="submit" svgType="save" />}
        {loading && <Svg size="2rem" type="loading" />}
      </Cont>
      {errors.content && <ErrorMsg error={errors.content.message} />}
    </form>
  );
};
const Cont = styled.article`
  padding-top: 10px;
  padding-left: 20px;
  padding-bottom: 0;
  gap: 15px;
  display: flex;
  align-items: flex-start;
  textarea {
    padding: 3px;
    min-height: 30px;
    font-size: 1.1rem;
    max-height: 100px;
  }
`;
