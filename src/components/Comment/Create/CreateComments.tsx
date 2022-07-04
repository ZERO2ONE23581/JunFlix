import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../Style/Button';
import { useForm } from 'react-hook-form';
import { IComment } from '../ReadComment';
import { ErrorMsg } from '../../Style/ErrMsg';
import useUser from '../../../libs/client/useUser';
import { ProfileAvatar } from '../../Avatar/Profile';
import { TextArea } from '../../Style/Input/TextArea';
import useMutation from '../../../libs/client/useMutation';
import { ICommentRes, ICreateCommentsForm } from '../../../types/comments';

interface ICreateCommentsProps extends IComment {
  replyID: number;
}
export const CreateComments = ({
  USERID,
  BOARDID,
  POSTID,
  REVIEWID,
  replyID,
}: ICreateCommentsProps) => {
  const { loggedInUser } = useUser();
  const router = useRouter();
  const [CreateComment, { loading: CommentLoading, data: CommentData }] =
    useMutation<ICommentRes>(
      BOARDID && POSTID
        ? `/api/user/${USERID}/board/${BOARDID}/post/${POSTID}/comment/create`
        : REVIEWID
        ? `/api/user/${USERID}/review/${REVIEWID}/comment/create`
        : ''
    );
  const [CreateReply, { loading: ReplyLoading, data: ReplyData }] =
    useMutation<ICommentRes>(
      BOARDID && POSTID
        ? `/api/user/${USERID}/board/${BOARDID}/post/${POSTID}/comment/${replyID}/create`
        : REVIEWID
        ? `/api/user/${USERID}/review/${REVIEWID}/comment/${replyID}/create`
        : ''
    );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateCommentsForm>({ mode: 'onSubmit' });
  const onValid = ({ content }: ICreateCommentsForm) => {
    if (replyID) {
      if (ReplyLoading) return;
      return CreateReply({ content });
    } else {
      if (CommentLoading) return;
      return CreateComment({ content });
    }
  };
  useEffect(() => {
    if (CommentData?.ok || ReplyData?.ok) router.reload();
  }, [router, CommentData, ReplyData]);
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <Cont>
          <span>@{loggedInUser?.userId}</span>
          <Flex>
            <ProfileAvatar url={loggedInUser?.avatar} size="5rem" />
            <TextArea
              {...register('content', { required: '댓글을 입력해주세요.' })}
              rows={5}
              id="content"
              name="content"
              placeholder="Add a comment..."
            />
          </Flex>
          <div className="submit-btn">
            <Btn
              type="submit"
              name="댓글 달기"
              loading={CommentLoading ? CommentLoading : ReplyLoading}
            />
          </div>
        </Cont>
      </form>
      {errors.content && <ErrorMsg error={errors.content?.message} />}
      {CommentData?.error && <ErrorMsg error={CommentData.error} />}
      {ReplyData?.error && <ErrorMsg error={ReplyData.error} />}
    </>
  );
};

const Cont = styled.div`
  margin-top: 20px;
  margin-left: 40px;
  padding: 12px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 8px;
  border: ${(p) => p.theme.border.thick};
  border: 5px solid ${(p) => p.theme.color.logo};
  .submit-btn {
    display: flex;
    align-items: center;
    justify-content: end;
  }
`;
const Flex = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  gap: 20px;
  display: flex;
  .profile-avatar {
    margin-top: 10px;
  }
  textarea {
    padding: 10px;
    font-size: 1.2rem;
    color: ${(p) => p.theme.color.logo};
    border: 2px dotted #d63031;
    :focus {
      border: 3px solid ${(p) => p.theme.color.logo};
    }
  }
`;
