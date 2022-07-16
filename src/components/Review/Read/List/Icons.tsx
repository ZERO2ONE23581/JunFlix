import styled from '@emotion/styled';
import { Svg } from '../../../Style/Svg/Svg';

interface IIconCount {
  isLike?: boolean;
  isCmt?: boolean;
  likesCount: number;
  CmtsCount: number;
}
export const Icons = ({ isLike, isCmt, likesCount, CmtsCount }: IIconCount) => {
  return (
    <Cont>
      {isLike && (
        <>
          {likesCount > 0 ? (
            <>
              <Svg type="solid-heart" size="1rem" />
              <span className="counts">{likesCount}</span>
            </>
          ) : (
            <Svg type="unsolid-heart" size="1rem" />
          )}
        </>
      )}
      {isCmt && (
        <>
          {CmtsCount > 0 ? (
            <>
              <Svg type="solid-comment" size="1rem" />
              <span className="counts">{CmtsCount}</span>
            </>
          ) : (
            <Svg type="unsolid-comment" size="1rem" />
          )}
        </>
      )}
    </Cont>
  );
};
const Cont = styled.div`
  position: relative;
  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
  .counts {
    top: -20%;
    right: -40%;
    position: absolute;
    color: red;
    font-size: 1.2rem;
    font-weight: 600;
  }
`;
