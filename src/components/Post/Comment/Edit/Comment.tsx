import {
  ICommentRes,
  IPostComment,
  CommentWithUser,
  IEditCommentForm,
} from '../../../../types/comments';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { PostText } from '../../Read/Text';
import { Svg } from '../../../Style/Svg/Svg';
import { Creator } from '../../../../../Creator';
import { ErrorMsg } from '../../../Style/ErrMsg';
import { PostModel } from '../../../../types/post';
import { IconBtn } from '../../../Style/Button/IconBtn';
import { TextAreaWrap } from '../../../Style/Input/TextArea';
import useMutation from '../../../../libs/client/useMutation';
import { CapFirstLetter, ComputeLength } from '../../../Tools';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IEditComments extends IPostComment {
  editCmt: boolean;
  post: PostModel;
  comment: CommentWithUser;
  setEditCmt: Dispatch<SetStateAction<boolean>>;
  setSelectId: Dispatch<SetStateAction<number>>;
}
export const EditPostCmt = ({
  post,
  comment,
  editCmt,
  setEditCmt,
  setSelectId,
}: IEditComments) => {
  const [EditComment, { loading, data }] = useMutation<ICommentRes>(
    `/api/user/${post?.UserID}/board/${post?.BoardID}/post/${post?.id}/comment/${comment?.id}/edit`
  );
  const {
    watch,
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditCommentForm>({ mode: 'onSubmit' });
  const onValid = ({ content }: IEditCommentForm) => {
    if (loading) return;
    EditComment({ content });
  };
  useEffect(() => {
    if (comment?.content) setValue('content', CapFirstLetter(comment.content));
  }, [setValue, comment]);
  //
  const minHeight = 50;
  const maxHeight = 100;
  const [height, setHeight] = useState(minHeight);
  useEffect(() => {
    const length = ComputeLength({ watch: watch, type: 'content' });
    if (length) setHeight(minHeight + length);
  }, [watch('content'), setHeight, ComputeLength]);
  //
  useEffect(() => {
    if (data?.ok) {
      alert('댓글을 수정했습니다.');
      setSelectId(0);
      setEditCmt(false);
    }
  }, [data, setEditCmt, setSelectId]);
  //
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Cont disabled={editCmt}>
        <Creator avatar={comment?.user.avatar!} size="2.2em" />
        {editCmt && (
          <PostText
            Content={comment?.content!}
            CreatedAt={comment?.createdAt}
            Username={comment?.user?.username!}
          />
        )}
        {!editCmt && (
          <>
            <TextAreaWrap
              id="content"
              height={height}
              minHeight={minHeight}
              maxHeight={maxHeight}
              disabled={editCmt}
              placeholder="Add a comment..."
              register={register('content', {
                required: '댓글을 입력해주세요.',
              })}
            />
            <SubmitBtn>
              {loading && <Svg size="2rem" type="loading" />}
              {!loading && <IconBtn size="1rem" type="submit" svgType="save" />}
            </SubmitBtn>
          </>
        )}
      </Cont>
      {errors.content && <ErrorMsg error={errors.content.message} />}
    </form>
  );
};
const Cont = styled.article<{ disabled: boolean }>`
  gap: 20px;
  display: flex;
  align-items: flex-start;
  textarea {
    max-height: 200px;
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
