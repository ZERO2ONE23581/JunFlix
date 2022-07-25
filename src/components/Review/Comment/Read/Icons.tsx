import styled from '@emotion/styled';
import { IReview } from '../../../../types/review';
import { LikeIcon } from '../../../Style/Icon/Likes/Review';
import { CommentIcon } from '../../../Style/Icon/Comment/Review';

export const Icons = ({ review }: IReview) => {
  return (
    <Cont className="icons-wrap">
      <LikeIcon reviewId={review?.id!} userId={review?.UserID!} />
      <CommentIcon reviewId={review?.id} userId={review?.UserID} />
    </Cont>
  );
};
const Cont = styled.article`
  border-top: 1px dotted #ecf0f1;
  padding: 25px;
  gap: 50px;
  display: flex;
  align-items: center;
  .counts {
    top: -5px;
    right: -10px;
    position: absolute;
    font-weight: 400;
    font-size: 1.2rem;
    color: ${(p) => p.theme.color.logo};
  }
`;
