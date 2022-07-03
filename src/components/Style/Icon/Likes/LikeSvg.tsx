import styled from '@emotion/styled';
import { Svg } from '../../Svg/Svg';

interface ILikeSvg {
  isLike: boolean;
}
export const LikeSvg = ({ isLike }: ILikeSvg) => {
  return (
    <Cont>
      {isLike ? <Svg type="solid-heart" /> : <Svg type="unsolid-heart" />}
    </Cont>
  );
};
const Cont = styled.div`
  .solid-heart {
    svg {
      fill: #e74c3c;
    }
  }
  .unsolid-heart {
    :hover {
      svg {
        fill: #e74c3c;
      }
    }
  }
`;
