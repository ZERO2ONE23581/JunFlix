import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import { BtnWrap } from '../Edit/BtnWrap';
import { ReviewReplyList } from './ReplyList';
import { EditReviewCmt } from '../Edit/Comment';
import { IReview } from '../../../../types/review';
import { DeleteReviewCmt } from '../Delete/Comment';
import { CreateReviewReply } from '../Create/Reply';
import useUser from '../../../../libs/client/useUser';
import { IGetCommentInfo } from '../../../../types/comments';

interface ICommentInfo extends IReview {
  comment_id: number;
}
export const ReadReviewCmtInfo = ({ review, comment_id }: ICommentInfo) => {
  const { loggedInUser } = useUser();
  const { data } = useSWR<IGetCommentInfo>(
    `/api/user/${review?.UserID}/review/${review?.id}/comment/${comment_id}`
  );
  const Comment = data?.comment;
  const [selectId, setSelectId] = useState(0);
  const [editCmt, setEditCmt] = useState(false);
  const [replyCmt, setReplyCmt] = useState(false);
  const [deleteCmt, setDeleteCmt] = useState(false);
  const isReply = Boolean(selectId === Comment?.id && replyCmt);
  const isMyComment = Boolean(Comment?.UserID === loggedInUser?.id);
  return (
    <>
      <Cont>
        <BtnWrap
          selectId={selectId}
          commentId={Comment?.id!}
          isMyComment={isMyComment}
          setSelectId={setSelectId}
          setEditCmt={setEditCmt}
          setReplyCmt={setReplyCmt}
          setDeleteCmt={setDeleteCmt}
        />
        <EditReviewCmt
          review={review!}
          comment={Comment!}
          editCmt={!editCmt}
          setEditCmt={setEditCmt}
          setSelectId={setSelectId}
        />
      </Cont>
      {isReply && (
        <CreateReviewReply
          review={review!}
          comment_id={selectId}
          setSelectId={setSelectId}
          setReplyCmt={setReplyCmt}
        />
      )}
      <ReviewReplyList review={review!} comment_id={Comment?.id!} />
      {deleteCmt && (
        <DeleteReviewCmt
          review={review!}
          comment_id={selectId}
          setSelectId={setSelectId}
          setDeleteCmt={setDeleteCmt}
        />
      )}
    </>
  );
};
const Cont = styled.article`
  padding: 10px 20px;
  border: none;
  font-size: 0.9rem;
  border-bottom: ${(p) => p.theme.border.thin};
  .edit-comment-btns {
    gap: 10px;
    svg {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
`;
