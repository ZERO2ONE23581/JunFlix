import {
  ICmtRes,
  CommentWithUser,
  IEditCommentForm,
} from '../../../../types/comments';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { Svg } from '../../../Tools/Svg';
import { ErrorMsg } from '../../../Tools/Errors';
import { IQuery } from '../../../../types/global';
import { IconBtn } from '../../../Tools/Button/Icon';
import { TextArea } from '../../../Tools/Input/TextArea';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useMutation from '../../../../libs/client/useMutation';
import { useCapLetter } from '../../../../libs/client/useTools';

interface IEditComments extends IQuery {
  chosenId: number;
  comment: CommentWithUser;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setChosenId: Dispatch<SetStateAction<number>>;
}
export const EditComment = ({
  query,
  comment,
  setEdit,
  setChosenId,
}: IEditComments) => {
  const [Edit, { loading, data }] = useMutation<ICmtRes>(
    `/api/user/${query.userId}/board/${query.boardId}/post/${query.postId}/comment/${comment?.id}/edit`
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
    if (comment?.content) setValue('content', useCapLetter(comment.content));
  }, [setValue, comment]);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const content = watch('content');
    setHeight(content?.length!);
  }, [setHeight, watch('content')]);

  useEffect(() => {
    if (data?.ok) {
      alert('댓글을 수정했습니다.');
      setChosenId(0);
      setEdit(false);
    }
  }, [data, setEdit, setChosenId]);
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <EditCont>
        <TextArea
          {...register('content', { required: '댓글을 입력해주세요.' })}
          id="content"
          name="content"
          height={height}
          placeholder="댓글 달기..."
        />
        {!loading && (
          <IconBtn size="1.5rem" type="submit" svgType="paper-plane" />
        )}
        {loading && <Svg size="2rem" type="loading" />}
      </EditCont>
      {errors.content && <ErrorMsg error={errors.content.message} />}
    </form>
  );
};
export const EditCont = styled.article`
  gap: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  textarea {
    padding: 5px 10px;
    min-height: 33px;
    max-height: 100px;
    font-size: 1.1rem;
    border-radius: 2px;
    border: 1px dotted red;
    ::placeholder {
      font-size: 1rem;
    }
    :focus {
      border: none;
      outline: ${(p) => `3px double ${p.theme.color.logo}`};
    }
  }
`;
