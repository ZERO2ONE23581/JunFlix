import styled from '@emotion/styled';
import { Svg } from '../../Style/Svg/Svg';

interface IIconCount {
  isLike?: boolean;
  isCmt?: boolean;
  likesCount: number;
  CmtsCount: number;
}
export const IconCount = ({
  isLike,
  isCmt,
  likesCount,
  CmtsCount,
}: IIconCount) => {
  console.log(CmtsCount);
  return (
    <Cont>
      {isLike && (
        <>
          {likesCount > 0 ? (
            <>
              <Svg type="solid-heart" />
              <span className="counts">{likesCount}</span>
            </>
          ) : (
            <Svg type="unsolid-heart" />
          )}
        </>
      )}
      {isCmt && (
        <>
          {CmtsCount > 0 ? (
            <>
              <Svg type="solid-comment" />
              <span className="counts">{CmtsCount}</span>
            </>
          ) : (
            <Svg type="unsolid-comment" />
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
