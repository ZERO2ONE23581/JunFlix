import { Stars } from './Stars';
import styled from '@emotion/styled';
import { IReview } from '../../../types/review';
import { CapFirstLetter, ReadDate } from '../../Tools';

export const Info = ({ review }: IReview) => {
  return (
    <Cont>
      <Genre>
        <span>장르:</span>
        <span>{review?.genre}</span>
      </Genre>
      <Title>
        <Movie>'{review?.movieTitle.toUpperCase()}'</Movie>
        <Review>
          <span>review:</span>
          <span>"{CapFirstLetter(review?.title!)}"</span>
        </Review>
      </Title>
      <OneLine>"{review?.oneline}"</OneLine>
      <StarInfo>
        <span>Stars to the movie</span>
        <span>"{review?.movieTitle.toUpperCase()}"</span>
        <Stars score={review?.score!} />
        <span>by</span>
        <span>@{review?.user.username}</span>
      </StarInfo>
      <ReadDate CREATEDAT={review?.createdAt} UPDATEDAT={review?.updatedAt} />
    </Cont>
  );
};
const Cont = styled.div`
  padding: 2% 20%;
  gap: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const Genre = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  color: #0984e3;
  span {
    margin-right: 10px;
  }
`;
const Title = styled.div`
  line-height: 50px;
`;
const Movie = styled.span`
  font-size: 4rem;
  margin-right: 5px;
`;
const Review = styled.span`
  font-size: 3rem;
  font-style: italic;
  span {
    margin-right: 5px;
    color: ${(p) => p.theme.color.logo};
  }
`;
const OneLine = styled.p`
  opacity: 0.8;
  font-size: 2rem;
  font-style: italic;
`;
const StarInfo = styled.article`
  width: 100%;
  gap: 10px;
  display: flex;
  align-items: center;
  font-style: italic;
  color: ${(p) => p.theme.color.logo};
`;
