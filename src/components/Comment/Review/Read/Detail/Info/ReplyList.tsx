import useSWR from 'swr';
import styled from '@emotion/styled';
import { CommentInfo } from '..';
import { IReview } from '../../../../../../types/review';
import { IGetReplies } from '../../../../../../types/comments';

interface IReviewReplyList extends IReview {
  comment_id: number;
}
export const ReplyList = ({ review, comment_id }: IReviewReplyList) => {
  const { data } = useSWR<IGetReplies>(
    review &&
      `/api/user/${review?.UserID}/review/${review?.id}/comment/${comment_id}/replies`
  );
  return (
    <Cont>
      {data?.replies?.map((reply) => (
        <CommentInfo key={reply.id} review={review!} comment_id={reply.id} />
      ))}
    </Cont>
  );
};
const Cont = styled.article`
  margin-left: 30px;
`;
