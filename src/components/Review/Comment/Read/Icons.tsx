import styled from '@emotion/styled';
import { IReview } from '../../../../types/review';
import { LikeIcon } from '../../../Style/Icon/Likes/Review';
import { CmtIcon } from '../../../Style/Icon/Comment/Review';

export const Icons = ({ review }: IReview) => {
  return (
    <Cont className="icons-wrap">
      <LikeIcon reviewId={review?.id!} userId={review?.UserID!} />
      <CmtIcon reviewId={review?.id} userId={review?.UserID} />
    </Cont>
  );
};
const Cont = styled.article`
  padding: 2rem;
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
