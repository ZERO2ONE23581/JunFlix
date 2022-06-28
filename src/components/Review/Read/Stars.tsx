import styled from '@emotion/styled';
import { User } from '@prisma/client';
import { Info } from '../../../../styles/global';
import { Svg } from '../../Style/Svg/Svg';
import { ProfileAvatar } from '../../Avatar/Profile';

interface IStarsProps {
  score: number;
  movieTitle: string;
  reviewer: string;
}
export const Stars = ({ score, movieTitle, reviewer }: IStarsProps) => {
  return (
    <Cont>
      <StarInfo>
        <div className="flex">
          <span>Stars to the movie</span>
          <span>"{movieTitle?.toUpperCase()}"</span>
        </div>
        <Wrap>
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
        </Wrap>
        <span>- {reviewer}</span>
      </StarInfo>
    </Cont>
  );
};
const StarInfo = styled(Info)`
  gap: 20px;
  display: flex;
  align-items: center;
  span {
    margin: 0;
  }
  .flex {
    gap: 10px;
    display: flex;
    opacity: 0.8;
  }
`;
const Cont = styled.article`
  gap: 20px;
  display: flex;
  align-items: center;
`;

const Wrap = styled.div`
  gap: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Star = styled.span<{ isStar: boolean }>`
  svg {
    width: 1.6rem;
    height: 1.6rem;
    fill: ${(p) => (p.isStar ? p.theme.color.logo : 'black')};
    :hover {
      fill: ${(p) => (p.isStar ? p.theme.color.logo : 'black')};
    }
  }
`;
