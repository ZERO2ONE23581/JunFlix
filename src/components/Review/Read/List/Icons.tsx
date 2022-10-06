import styled from '@emotion/styled';
import { Svg } from '../../../../Tools/Svg';

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
              <Svg type="solid-heart" size="1.7rem" fill="#d63031" />
              <span className="counts">{likesCount}</span>
            </>
          ) : (
            <Svg type="unsolid-heart" size="1.8rem" />
          )}
        </>
      )}
      {isCmt && (
        <>
          {CmtsCount > 0 ? (
            <>
              <Svg type="solid-comment" size="1.7rem" />
              <span className="counts">{CmtsCount}</span>
            </>
          ) : (
            <Svg type="unsolid-comment" size="1.8rem" />
          )}
        </>
      )}
    </Cont>
  );
};
const Cont = styled.div`
  position: relative;
  .counts {
    top: -10%;
    right: -30%;
    position: absolute;
    color: red;
    font-size: 0.9rem;
    font-weight: 600;
  }
`;
