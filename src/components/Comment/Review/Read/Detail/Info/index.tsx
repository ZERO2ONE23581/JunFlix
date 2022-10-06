import {
  ICmtRes,
  CommentWithUser,
  IEditCommentForm,
} from '../../../../../../types/comments';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { Creator } from '../../../../../../../Creator';
import { ErrorMsg } from '../../../../../../Tools/Errors';
import { IReview } from '../../../../../../types/review';
import useMutation from '../../../../../../libs/client/useMutation';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { ReadDate } from '../../../../../../Tools/Date';
import { Text } from './Text';
import { EditCmt } from '../../../Edit/EditCmt';
import { useCapLetter } from '../../../../../../libs/client/useTools';

interface IEditComments extends IReview {
  edit: boolean;
  comment: CommentWithUser;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setSelectId: Dispatch<SetStateAction<number>>;
}
export const Info = ({
  review,
  comment,
  edit,
  setEdit,
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
  useEffect(() => {
    if (comment?.content) setValue('content', useCapLetter(comment.content));
  }, [setValue, comment]);

  useEffect(() => {
    if (data?.ok) {
      setSelectId(0);
      setEdit(false);
      alert('댓글을 수정했습니다.');
    }
  }, [data, setEdit, setSelectId]);

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Cont>
        <Creator userAvatar={comment?.user.avatar!} size="3rem" />
        <ReadDate
          isList
          CREATEDAT={review?.createdAt}
          UPDATEDAT={review?.updatedAt}
        />
        {!edit && (
          <Text
            content={comment?.content!}
            username={comment?.user?.username!}
          />
        )}
        {edit && (
          <EditCmt watch={watch} loading={loading} register={register} />
        )}
      </Cont>
      {errors.content && <ErrorMsg error={errors.content.message} />}
    </form>
  );
};
const Cont = styled.article`
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .read-date {
    min-width: 130px;
  }
`;
