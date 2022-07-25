import styled from '@emotion/styled';
import { Svg } from '../../../../Style/Svg/Svg';
import { CapFirstLetter, CapFirstLetters, ReadDate } from '../../../../Tools';

interface ITtitle {
  genre: string;
  movieTitle: string;
  reivewTitle: string;
}
export const Title = ({ genre, movieTitle, reivewTitle }: ITtitle) => {
  const MovieTitle = CapFirstLetters(movieTitle);
  const ReivewTitle = CapFirstLetter(reivewTitle);
  return (
    <Cont>
      <Movie>{MovieTitle}</Movie>
      <Review>
        <span>'s Review:</span>
        <span className="review-title">"{ReivewTitle}"</span>
      </Review>
      <Svg size="4rem" type={genre} />
    </Cont>
  );
};
const Cont = styled.div`
  width: 100%;
  display: block;
  line-height: 44px;
  position: relative;
  overflow-wrap: break-word;
  svg {
    top: 0;
    right: -100px;
    position: absolute;
  }
`;
const Movie = styled.span`
  font-size: 4rem;
`;
const Review = styled.span`
  font-size: 2.8rem;
  font-style: italic;
  .review-title {
    color: ${(p) => p.theme.color.logo};
  }
`;
