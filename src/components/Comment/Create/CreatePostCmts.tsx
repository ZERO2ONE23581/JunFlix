import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Svg } from '../../Style/Svg/Svg';
import { Btn } from '../../Style/Button';
import { useForm } from 'react-hook-form';
import { IComment } from '../ReadComment';
import { PostTextArea } from './PostTextArea';
import { ErrorMsg } from '../../Style/ErrMsg';
import useUser from '../../../libs/client/useUser';
import useMutation from '../../../libs/client/useMutation';
import { ICommentRes, ICreateCommentsForm } from '../../../types/comments';

interface ICreateCommentsProps extends IComment {
  replyID: number;
}
export const CreatePostCmts = ({
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
          <Flex>
            <Svg type="smile" size="1.6rem" />
            <PostTextArea register={register} />
            <Btn
              name="Post"
              type="submit"
              CLASSNAME="submit-btn"
              loading={CommentLoading ? CommentLoading : ReplyLoading}
            />
          </Flex>
        </Cont>
      </form>
      {errors.content && <ErrorMsg error={errors.content?.message} />}
      {CommentData?.error && <ErrorMsg error={CommentData.error} />}
      {ReplyData?.error && <ErrorMsg error={ReplyData.error} />}
    </>
  );
};

const Cont = styled.div`
  padding: 0;
  .submit-btn {
    width: 10%;
    height: 100%;
    color: inherit;
    background-color: inherit;
  }
`;
const Flex = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
`;
