import styled from '@emotion/styled';
import { IReview } from '../../../../types/review';
import { CommentIcon } from '../../../Style/Icon/Comment/CommentIcon';
import { ReviewLikes } from '../../../Style/Icon/Likes/ReviewLikes';

export const ReviewLikesNCmts = ({ review }: IReview) => {
  return (
    <Cont>
      <ReviewLikes REVIEWID={review?.id!} USERID={review?.UserID!} />
      <CommentIcon
        POSTID={0}
        BOARDID={0}
        REVIEWID={review?.id}
        USERID={review?.UserID}
      />
    </Cont>
  );
};
const Cont = styled.article`
  padding: 10px 20px;
  gap: 30px;
  display: flex;
  align-items: center;
  .counts {
    top: -8px;
    right: -10px;
    position: absolute;
    font-size: 15px;
    font-weight: 550;
    color: ${(p) => p.theme.color.logo};
  }
  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;
