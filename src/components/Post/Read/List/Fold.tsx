import styled from '@emotion/styled';
import { Svg } from '../../../../Tools/Svg';
import { Dispatch, SetStateAction } from 'react';

interface IFold {
  from: number;
  length: number;
  postLength: number;
  setLength: Dispatch<SetStateAction<number>>;
}
export const Fold = ({ from, postLength, setLength, length }: IFold) => {
  const noFold = Boolean(from >= postLength);
  const unFold = Boolean(length < postLength);
  const Fold = Boolean(length === postLength);
  return (
    <>
      {!noFold && (
        <Cont>
          {unFold && (
            <Svg
              size="2rem"
              type="ellipsis"
              onClick={() => setLength(postLength)}
            />
          )}
          {Fold && (
            <Svg size="2rem" type="caret" onClick={() => setLength(from)} />
          )}
        </Cont>
      )}
    </>
  );
};
const Cont = styled.div`
  position: relative;
  padding: 0 10px;
  /* border: 1px solid red; */
  display: flex;
  align-items: flex-end;
  justify-content: end;
  svg {
    cursor: pointer;
    margin-bottom: 20px;
  }
`;
