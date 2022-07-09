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
import { Author } from '../../../../../Author';
import { CapFirstLetter } from '../../../Tools';
import { ErrorMsg } from '../../../Style/ErrMsg';
import { PostModel } from '../../../../types/post';
import { IconBtn } from '../../../Style/Button/IconBtn';
import { TextArea } from '../../../Style/Input/TextArea';
import useMutation from '../../../../libs/client/useMutation';
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
  const [height, setHeight] = useState('50px');

  useEffect(() => {
    const length = watch('content')?.length;
    if (length! > 56) setHeight(`${length!}px`);
  }, [watch('content'), setHeight]);

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
        <Author AVATAR={comment?.user.avatar!} SIZE="2em" />
        {editCmt && (
          <PostText
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
              disabled={editCmt}
              placeholder="Add a comment..."
            />
            <SubmitBtn>
              {loading && <Svg type="loading" />}
              {!loading && <IconBtn type="submit" svgType={'pen'} />}
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
  justify-content: flex-start;
`;
const EditTextArea = styled(TextArea)<{ height: string }>`
  height: ${(p) => p.height && p.height};
  max-height: 120px;
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
