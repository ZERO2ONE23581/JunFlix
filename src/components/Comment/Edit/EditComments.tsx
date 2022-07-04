import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../Style/Button';
import { useForm } from 'react-hook-form';
import { ErrorMsg } from '../../Style/ErrMsg';
import { IComment } from '../ReadComment';
import useMutation from '../../../libs/client/useMutation';
import { ICommentRes, IEditCommentForm } from '../../../types/comments';
import { TextArea } from '../../Style/Input/TextArea';
import { ProfileAvatar } from '../../Avatar/Profile';
import { StartWithCapLetter } from '../../Tools';

interface IEditComments extends IComment {
  disabled: boolean;
  USERAVATAR: string;
  parentId?: number | null;
  CONTENT?: string | null;
}

export const EditComments = ({
  disabled,
  USERAVATAR,
  USERID,
  BOARDID,
  POSTID,
  REVIEWID,
  parentId,
  CONTENT,
}: IEditComments) => {
  const router = useRouter();
  const [EditComment, { loading, data }] = useMutation<ICommentRes>(
    BOARDID && POSTID
      ? `/api/user/${USERID}/board/${BOARDID}/post/${POSTID}/comment/${parentId}/edit`
      : REVIEWID
      ? `/api/user/${USERID}/review/${REVIEWID}/comment/${parentId}/edit`
      : ''
  );
  const {
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
    if (CONTENT) setValue('content', StartWithCapLetter(CONTENT));
    if (data?.ok) router.reload();
  }, [router, setValue, CONTENT, data]);
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Cont>
        <Flex disabled={disabled}>
          <ProfileAvatar url={USERAVATAR} size="5rem" />
          <TextArea
            {...register('content', { required: '댓글을 입력해주세요.' })}
            rows={4}
            disabled={disabled}
            id="content"
            name="content"
            placeholder="Add a comment..."
          />
        </Flex>
        {!disabled && (
          <div className="edit-btn">
            <Btn loading={loading} type="submit" name="댓글 수정하기" />
          </div>
        )}
      </Cont>
      {errors.content && <ErrorMsg error={errors.content.message} />}
    </form>
  );
};
const Cont = styled.div`
  .edit-btn {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: end;
  }
`;
const Flex = styled.div<{ disabled: boolean }>`
  gap: 20px;
  display: flex;
  .profile-avatar {
    margin-top: 10px;
  }
  textarea {
    padding: 10px;
    font-size: 1.2rem;
    color: ${(p) => !p.disabled && p.theme.color.logo};
    border: 2px solid ${(p) => (!p.disabled ? p.theme.color.logo : 'none')};
    :focus {
      border: 2px solid ${(p) => !p.disabled && p.theme.color.logo};
    }
  }
`;
