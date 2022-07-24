import styled from '@emotion/styled';
import { CapFirstLetter } from '../../../Tools';
import { Genre } from '../../../Board/Read/Board/Info/Genre';

interface ITtitle {
  title: string;
  genre: string;
  reivewTitle: string;
}
export const Title = ({ genre, title, reivewTitle }: ITtitle) => {
  const MovieTitle = title?.toUpperCase();
  const ReivewTitle = CapFirstLetter(reivewTitle);
  return (
    <Cont>
      <Wrap>
        <span className="movie">{MovieTitle}</span>
        <span className="review">
          <span>'s Review:</span>
          <span className="review-title">"{ReivewTitle}"</span>
        </span>
      </Wrap>

      {/* <Genre size="3rem" genre={'Action'} /> */}
    </Cont>
  );
};
const Cont = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 40px;
  .mask {
    /* width: 5rem;
    height: 5rem; */
  }
`;
const Wrap = styled.div`
  .movie {
    font-size: 4rem;
  }
  .review {
    font-size: 2.5rem;
    font-style: italic;
    span {
      margin-right: 10px;
    }
    .review-title {
      color: ${(p) => p.theme.color.logo};
    }
  }
`;
