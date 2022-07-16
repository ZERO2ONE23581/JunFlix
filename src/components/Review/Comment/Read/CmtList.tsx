import useSWR from 'swr';
import styled from '@emotion/styled';
import { CommentInfo } from './\bCmtInfo';
import { IReview } from '../../../../types/review';
import { IGetAllComments } from '../../../../types/comments';

export const CommentList = ({ review }: IReview) => {
  const { data } = useSWR<IGetAllComments>(
    review && `/api/user/${review?.UserID}/review/${review?.id}/comment`
  );
  return (
    <Cont>
      {data?.allComments
        ?.filter((comment) => !comment.ReplyID)
        .map((comment) => (
          <CommentInfo
            review={review!}
            key={comment.id}
            comment_id={comment.id}
          />
        ))}
    </Cont>
  );
};
const Cont = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
