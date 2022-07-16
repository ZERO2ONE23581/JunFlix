import styled from '@emotion/styled';
import { Stars } from '../../Create/Save/Score/Stars';

interface IStarWrap {
  score: number;
  userId: string;
}
export const StarWrap = ({ userId, score }: IStarWrap) => {
  return (
    <Cont>
      <Info>
        <span>Stars given by</span>
        <span className="userID">@{userId}</span>
      </Info>
      <Stars score={score} />
    </Cont>
  );
};
const Cont = styled.article`
  position: relative;
  max-width: 500px;
  font-size: 1.3rem;
  font-style: italic;
  .Stars {
    left: 130%;
  }
`;
const Info = styled.span`
  span {
    opacity: 0.8;
    margin-right: 5px;
  }
  .userID {
    font-weight: 500;
    color: ${(p) => p.theme.color.logo};
  }
`;
