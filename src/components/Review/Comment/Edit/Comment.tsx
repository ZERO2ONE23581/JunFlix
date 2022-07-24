import {
  ICmtRes,
  CommentWithUser,
  IEditCommentForm,
} from '../../../../types/comments';
import { ReviewText } from './Text';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { Svg } from '../../../Style/Svg/Svg';
import { Creator } from '../../../../../Creator';
import { ErrorMsg } from '../../../Style/ErrMsg';
import { IReview } from '../../../../types/review';
import { IconBtn } from '../../../Style/Button/IconBtn';
import { TextArea } from '../../../Style/Input/TextArea';
import useMutation from '../../../../libs/client/useMutation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CapFirstLetter, Length, ReadDate } from '../../../Tools';

interface IEditComments extends IReview {
  editCmt: boolean;
  comment: CommentWithUser;
  setEditCmt: Dispatch<SetStateAction<boolean>>;
  setSelectId: Dispatch<SetStateAction<number>>;
}
export const EditComment = ({
  review,
  comment,
  editCmt,
  setEditCmt,
  setSelectId,
}: IEditComments) => {
  const [EditComment, { loading, data }] = useMutation<ICmtRes>(
    `/api/user/${review?.UserID}/review/${review?.id}/comment/${comment?.id}/edit`
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
    EditComment({ content });
  };
  //
  useEffect(() => {
    if (comment?.content) setValue('content', CapFirstLetter(comment.content));
  }, [setValue, comment]);
  const minHeight = 20;
  const maxHeight = 100;
  const [height, setHeight] = useState(minHeight);
  useEffect(() => {
    const length = Length({ watch: watch, type: 'content' });
    if (length) setHeight(minHeight + length);
  }, [watch('content'), setHeight, Length]);

  useEffect(() => {
    if (data?.ok) {
      alert('edit comment');
      setSelectId(0);
      setEditCmt(false);
    }
  }, [data, setEditCmt, setSelectId]);
  //
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Cont disabled={editCmt}>
        <Creator avatar={comment?.user.avatar!} size="3rem" />
        <ReadDate CREATEDAT={review?.createdAt} isList />
        {editCmt && (
          <ReviewText
            Content={comment?.content!}
            CreatedAt={comment?.createdAt}
            Username={comment?.user?.username!}
          />
        )}
        {!editCmt && (
          <>
            <EditTextArea
              {...register('content', { required: '댓글을 입력해주세요.' })}
              id="content"
              name="content"
              height={height}
              minHeight={minHeight}
              maxHeight={maxHeight}
              disabled={editCmt}
              placeholder="Add a comment..."
            />
            <SubmitBtn>
              {loading && <Svg type="loading" size="2rem" />}
              {!loading && <IconBtn type="submit" svgType="pen" size="2rem" />}
            </SubmitBtn>
          </>
        )}
      </Cont>
      {errors.content && <ErrorMsg error={errors.content.message} />}
    </form>
  );
};
const Cont = styled.article<{ disabled: boolean }>`
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .READ-DATE {
    opacity: 0.8;
    min-width: 150px;
  }
`;
const EditTextArea = styled(TextArea)`
  border: 1px dotted ${(p) => (!p.disabled ? p.theme.color.logo : 'none')};
  :disabled {
    cursor: default;
  }
  :focus {
    border: 1px solid ${(p) => !p.disabled && p.theme.color.logo};
  }
`;
const SubmitBtn = styled.div`
  margin-top: 10px;
  .solid-check,
  .pen {
    button {
      svg {
        width: 20px;
        height: 20px;
        :hover {
          fill: ${(p) => p.theme.color.logo};
        }
      }
    }
  }
`;
