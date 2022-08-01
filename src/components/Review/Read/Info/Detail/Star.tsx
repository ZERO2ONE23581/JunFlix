import styled from '@emotion/styled';
import { Stars } from '../../../../Tools/Modal/review_create/Score/Stars';

interface IStarWrap {
  score: number;
  userId: string;
}
export const Star = ({ userId, score }: IStarWrap) => {
  return (
    <Cont className="star-wrap">
      <span>Stars by</span>
      <span className="userID">@{userId}</span>
      <Stars score={score} />
    </Cont>
  );
};
const Cont = styled.article`
  font-size: 1.3rem;
  position: relative;
  font-style: italic;
  .userID {
    font-weight: 500;
    margin-left: 10px;
    color: ${(p) => p.theme.color.logo};
  }
  .Stars {
    left: 280px;
  }
`;
