import styled from '@emotion/styled';
import { Svg } from '../../Style/Svg/Svg';

interface IStars {
  score: number;
}
export const Stars = ({ score }: IStars) => {
  return (
    <Cont>
      {[1, 2, 3, 4, 5].map((num) => (
        <span key={num}>
          {score >= num ? (
            <Star isStar>
              <Svg type="star" />
            </Star>
          ) : (
            <Star isStar={false}>
              <Svg type="star" />
            </Star>
          )}
        </span>
      ))}
    </Cont>
  );
};

const Cont = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Star = styled.span<{ isStar: boolean }>`
  div {
    svg {
      opacity: ${(p) => !p.isStar && '0.6'};
      fill: ${(p) => (p.isStar ? p.theme.color.logo : p.theme.color.font)};
    }
  }
`;
