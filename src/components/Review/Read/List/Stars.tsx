import styled from '@emotion/styled';
import { Svg } from '../../../../Tools/Svg';

interface IStars {
  score: number;
}
export const Stars = ({ score }: IStars) => {
  return (
    <Cont>
      <Left>
        {[0, 1, 2, 3, 4].map((num) => (
          <Wrap key={num} isStar={score > num}>
            <Svg type="star-left" size="1.3rem" />
          </Wrap>
        ))}
      </Left>
      <Right>
        {[0.5, 1.5, 2.5, 3.5, 4.5].map((num) => (
          <Wrap key={num} isStar={score > num}>
            <Svg type="star-right" size="1.3rem" />
          </Wrap>
        ))}
      </Right>
    </Cont>
  );
};

const Cont = styled.div`
  position: relative;
  min-width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    pointer-events: none;
  }
  .star-right {
    transform: rotateY(180deg);
  }
`;
const Left = styled.div`
  margin: 0 auto;
`;
const Right = styled(Left)`
  top: 0px;
  right: 29px;
  position: absolute;
`;
const Wrap = styled.span<{ isStar: boolean }>`
  svg {
    fill: ${(p) => p.isStar && p.theme.color.logo};
  }
`;
