import styled from '@emotion/styled';
import { Star } from './Star';
import { Title } from './Title';
import { IReview } from '../../../../../types/review';
import { ReadDate } from '../../../../../Tools/Date';

export const Top = ({ review }: IReview) => {
  return (
    <Cont>
      <Title
        genre={review?.genre}
        reivewTitle={review?.title}
        movieTitle={review?.movieTitle}
      />
      {review?.oneline && <OneLine>"{review?.oneline}"</OneLine>}
      <Flex>
        <Star score={review?.score!} userId={review?.user?.userId!} />
        <ReadDate CREATEDAT={review?.createdAt} UPDATEDAT={review?.updatedAt} />
      </Flex>
    </Cont>
  );
};
const Cont = styled.article`
  min-width: 846px;
  pointer-events: none;
  .read-date {
    font-size: 1.1rem;
    span {
      opacity: 0.9;
    }
    .create {
      margin-right: 10px;
    }
  }
`;
const Flex = styled.div`
  display: flex;
  margin-top: 30px;
  margin-left: 30px;
  justify-content: space-between;
`;
const OneLine = styled.p`
  margin: 10px 0;
  opacity: 0.8;
  font-size: 2rem;
  font-style: italic;
`;
