import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AvatarLogo } from '../../../../../styles/avatar';
import { Btn } from '../../../../../styles/btn';
import { ErrMsg } from '../../../../../styles/default';
import useAvatar from '../../../../libs/client/useAvatar';
import useMutation from '../../../../libs/client/useMutation';
import useUser from '../../../../libs/client/useUser';
import { ICreateCommentsRes } from '../../../../types/comments';

interface IPostCommentsForm {
  content?: string;
}
export const CreateComment = ({ parentId }: any) => {
  const { loggedInUser } = useUser();
  const router = useRouter();
  const { user_id, board_id, post_id } = router.query;
  //
  const [createComments, { loading, data }] = useMutation<ICreateCommentsRes>(
    `/api/user/${user_id}/board/${board_id}/post/${post_id}/comment/create`
  );
  const [createReply, { loading: replyLoading, data: replyResponse }] =
    useMutation(
      `/api/user/${user_id}/board/${board_id}/post/${post_id}/comment/${parentId}/create`
    );
  //
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostCommentsForm>({ mode: 'onSubmit' });
  const onValid = ({ content }: IPostCommentsForm) => {
    if (parentId) {
      if (replyLoading) return;
      return createReply({ content });
    } else {
      if (loading) return;
      return createComments({ content });
    }
  };
  //
  useEffect(() => {
    if (data?.ok || replyResponse?.ok) {
      router.reload();
    }
  }, [router, data, replyResponse]);
  //
  return (
    <Cont>
      <div className="avatar-form-wrap">
        <AvatarLogo>
          {loggedInUser?.avatar ? (
            <img
              src={`${useAvatar(loggedInUser?.avatar)}`}
              alt="프로필 이미지"
            />
          ) : (
            <img src="/img/profile.svg" alt="프로필 이미지" />
          )}
        </AvatarLogo>
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
          <CommentBtn type="submit">
            {loading
              ? 'Loading...'
              : replyLoading
              ? 'Loading...'
              : 'Post Comment'}
          </CommentBtn>
        </form>
      </div>
    </Cont>
  );
};
const Cont = styled.article`
  padding: 20px;
  border-radius: 5px;
  .avatar-form-wrap {
    gap: 15px;
    display: flex;
    form {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }
`;

const Textarea = styled.textarea`
  margin-bottom: 15px;
  width: 100%;
  height: 100px;
  padding: 20px;
  font-size: 1.1rem;
  border-radius: 5px;
  outline: none;
  border: ${(p) => p.theme.border};
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
`;
const CommentBtn = styled(Btn)`
  font-size: 1rem;
  padding: 10px 20px;
`;
