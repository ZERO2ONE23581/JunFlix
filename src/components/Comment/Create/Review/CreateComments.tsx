import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Svg } from '../../../Style/Svg/Svg';
import { Btn } from '../../../Style/Button';
import { useForm } from 'react-hook-form';
import { IComment } from '../../ReadComment';
import { useEffect, useState } from 'react';
import { ErrorMsg } from '../../../Style/ErrMsg';
import { TextArea } from '../../../Style/Input/TextArea';
import useMutation from '../../../../libs/client/useMutation';
import { ICommentRes, ICreateCommentsForm } from '../../../../types/comments';

interface ICreateCommentsProps extends IComment {
  replyID: number;
}
export const CreateReviewComments = ({
  USERID,
  BOARDID,
  POSTID,
  REVIEWID,
  replyID,
}: ICreateCommentsProps) => {
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
    watch,
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
  // useEffect(() => {
  //   if (CommentData?.ok || ReplyData?.ok) router.reload();
  // }, [router, CommentData, ReplyData]);

  const [TextAreaHeight, setTextAreaHeight] = useState(40);
  useEffect(() => {
    const content = watch('content');
    setTextAreaHeight(content?.length!);
    if (CommentData?.ok || ReplyData?.ok) router.reload();
  }, [watch('content'), setTextAreaHeight, router, CommentData, ReplyData]);
  //
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <Cont>
          <Flex TextAreaHeight={TextAreaHeight}>
            <Svg type="smile" size="1.6rem" />
            <TextArea
              {...register('content', { required: '댓글을 입력해주세요.' })}
              id="content"
              name="content"
              placeholder="댓글 달기..."
            />
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
  padding: 12px 20px;
  border-top: ${(p) => p.theme.border.thin};
  .submit-btn {
    width: 10%;
    height: 100%;
    color: inherit;
    background-color: inherit;
  }
`;
const Flex = styled.div<{ TextAreaHeight: number }>`
  gap: 10px;
  display: flex;
  align-items: center;
  textarea {
    padding: 10px;
    min-height: 40px;
    max-height: 100px;
    height: ${(p) => p.TextAreaHeight && `${p.TextAreaHeight}px`};
  }
`;
