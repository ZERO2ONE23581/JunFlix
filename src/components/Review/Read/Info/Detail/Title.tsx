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
      <Movie>
        <Svg size="2.5rem" type={genre} />
        <span>{MovieTitle}</span>
      </Movie>
      <Review>
        <span>'s Review:</span>
        <span className="review-title">"{ReivewTitle}"</span>
      </Review>
    </Cont>
  );
};
const Cont = styled.div`
  width: 100%;
  display: block;
  line-height: 44px;
  overflow-wrap: break-word;
  text-align: center;
`;
const Movie = styled.span`
  font-size: 3.6rem;
  position: relative;
  svg {
    top: 55%;
    left: -60px;
    transform: translateY(-50%);
    position: absolute;
  }
`;
const Review = styled.span`
  font-size: 2.4rem;
  font-style: italic;
  .review-title {
    margin-left: 10px;
    color: ${(p) => p.theme.color.logo};
  }
`;
