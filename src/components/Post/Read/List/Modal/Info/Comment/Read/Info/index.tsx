import useSWR from 'swr';
import { useState } from 'react';
import { Content } from './Content';
import styled from '@emotion/styled';
import { ReplyList } from './Reply/List';
import { EditComment } from '../../Edit';
import { BtnWrap } from '../../Edit/BtnWrap';
import { CreateReply } from '../../Create/Reply';
import { DeleteComment } from '../../Delete/Modal';
import useUser from '../../../../../../../../../libs/client/useUser';
import { IPostCmtQuery } from '../../../../../../../../../types/post';
import { IGetCommentInfo } from '../../../../../../../../../types/comments';

interface ICommentInfo extends IPostCmtQuery {
  commentId: number;
  isInReply?: boolean;
}
export const CommentInfo = ({
  isInReply,
  userId,
  boardId,
  postId,
  commentId,
}: ICommentInfo) => {
  const { data } = useSWR<IGetCommentInfo>(
    `/api/user/${userId}/board/${boardId}/post/${postId}/comment/${commentId}`
  );
  const { loggedInUser } = useUser();
  const [edit, setEdit] = useState(false);
  const [reply, setReply] = useState(false);
  const [chosenId, setChosenId] = useState(0);
  const [deleteComment, setDelete] = useState(false);
  const QueryIds = postId && userId && boardId;
  const replyList = QueryIds && data?.comment?.id;
  const createReply = Boolean(chosenId === data?.comment?.id && reply);
  const isMyComment = Boolean(data?.comment?.UserID === loggedInUser?.id);

  return (
    <>
      <Cont>
        {!edit && (
          <Content
            isInReply={isInReply!}
            type={{ isComment: true }}
            content={data?.comment?.content!}
            createdAt={data?.comment?.createdAt!}
            username={data?.comment?.user?.username!}
            userAvatar={data?.comment?.user?.avatar!}
          />
        )}
        {edit && (
          <EditComment
            postId={postId}
            userId={userId}
            boardId={boardId}
            setEdit={setEdit}
            chosenId={chosenId}
            comment={data?.comment!}
            setChosenId={setChosenId}
          />
        )}
        <BtnWrap
          setEdit={setEdit}
          setReply={setReply}
          chosenId={chosenId}
          setDelete={setDelete}
          isMyComment={isMyComment}
          setChosenId={setChosenId}
          comment_id={data?.comment?.id!}
        />
      </Cont>
      {createReply && (
        <CreateReply
          postId={postId}
          userId={userId}
          boardId={boardId}
          setReply={setReply}
          comment_id={chosenId}
          setChosenId={setChosenId}
        />
      )}
      {replyList && (
        <ReplyList
          postId={postId}
          userId={userId}
          boardId={boardId}
          comment_id={data?.comment?.id!}
        />
      )}
      {deleteComment && (
        <DeleteComment
          postId={postId}
          userId={userId}
          boardId={boardId}
          setDelete={setDelete}
          chosenId={chosenId}
          setChosenId={setChosenId}
        />
      )}
    </>
  );
};
const Cont = styled.article`
  border: none;
  position: relative;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: ${(p) => p.theme.boxShadow.input};
  .comment-content {
    padding-bottom: 0;
  }
`;
