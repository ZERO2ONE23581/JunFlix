import styled from '@emotion/styled';
import { IReview } from '../../../types/review';
import { CreateReviewCmt } from '../Comment/Create/Comment';
import { ReadReviewCmtList } from '../Comment/Read/CmtList';
import { ReviewLikesNCmts } from '../Comment/Read/LikesNCmts';

export const Content = ({ review }: IReview) => {
  return (
    <>
      <Cont>
        <p>{review?.content}</p>
        <ReviewLikesNCmts review={review} />
        <CreateReviewCmt review={review} />
        <ReadReviewCmtList review={review} />
      </Cont>
    </>
  );
};
const Cont = styled.article`
  border: none;
  padding: 2% 20%;
  overflow-wrap: break-word;
  p {
    font-size: 1.6rem;
    font-weight: 300;
    line-height: 30px;
  }
`;
