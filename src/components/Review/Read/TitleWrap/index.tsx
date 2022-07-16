import { Title } from './Title';
import { BtnWrap } from './BtnWrap';
import styled from '@emotion/styled';
import { StarWrap } from './StarsWrap';
import { ReadDate } from '../../../Tools';
import { IReview } from '../../../../types/review';
import { Genre } from '../../../Board/Read/Page/Board/Info/Genre';

export const TitleWrap = ({ review }: IReview) => {
  return (
    <Cont className="title-wrap">
      <div className="wrap">
        <BtnWrap />
        <div className="genre">
          <Genre size="4rem" genre={review?.genre} />
        </div>
        <Title
          genre={review?.genre}
          title={review?.movieTitle}
          reivewTitle={review?.title}
        />
        {review?.oneline && <OneLine>"{review?.oneline}"</OneLine>}
        <StarWrap score={review?.score!} userId={review?.user?.userId!} />
        <ReadDate CREATEDAT={review?.createdAt} UPDATEDAT={review?.updatedAt} />
      </div>
    </Cont>
  );
};
const Cont = styled.article`
  .wrap {
    min-width: 750px;
    position: relative;
    gap: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    .genre {
      width: 100%;
      text-align: end;
      pointer-events: none;
    }
    .READ-DATE {
      width: 100%;
      font-size: 1.2rem;
    }
  }
`;
const OneLine = styled.p`
  opacity: 0.8;
  font-size: 2rem;
  font-style: italic;
`;
