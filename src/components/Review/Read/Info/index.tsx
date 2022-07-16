import { BtnWrap } from './BtnWrap';
import styled from '@emotion/styled';
import { IReview } from '../../../../types/review';
import { Stars } from '../../Create/Save/Score/Stars';
import { CapFirstLetter, ReadDate } from '../../../Tools';
import { Genre } from '../../../Board/Read/Page/Board/Info/Genre';

export const Info = ({ review }: IReview) => {
  return (
    <Cont>
      <Wrap>
        <BtnWrap />
        <div className="flex">
          <Title>
            <Movie>'{review?.movieTitle.toUpperCase()}'</Movie>
            <Review>
              <span>'s Review:</span>
              <span className="title">"{CapFirstLetter(review?.title!)}"</span>
            </Review>
          </Title>
          <div className="genre">
            <Genre size="3.3rem" genre={review?.genre} />
          </div>
        </div>
        <OneLine>"{review?.oneline}"</OneLine>
        <StarInfo>
          <span>Stars to the movie</span>
          <span>"{review?.movieTitle.toUpperCase()}"</span>
          <Stars score={review?.score!} />
          <span>by</span>
          <span>@{review?.user.username}</span>
        </StarInfo>
        <ReadDate CREATEDAT={review?.createdAt} UPDATEDAT={review?.updatedAt} />
      </Wrap>
    </Cont>
  );
};
const Cont = styled.article`
  padding: 5% 20% 3% 20%;
`;

const Wrap = styled.div`
  border: 2px solid red;
  position: relative;
  min-width: 700px;
  gap: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  .flex {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
`;
const Title = styled.div`
  line-height: 40px;
`;
const Movie = styled.span`
  font-size: 3rem;
  margin-right: 5px;
`;
const Review = styled.span`
  font-size: 2rem;
  font-style: italic;
  span {
    margin-right: 5px;
  }
  .title {
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
