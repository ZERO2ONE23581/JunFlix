import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { Svg } from '../../../Tools/Svg';

interface IFold {
  from: number;
  length: number;
  postLength: number;
  setLength: Dispatch<SetStateAction<number>>;
}
export const Fold = ({ theme, from, postLength, setLength, length }: any) => {
  const noFold = Boolean(from >= postLength);
  const unFold = Boolean(length < postLength);
  const Fold = Boolean(length === postLength);
  return (
    <>
      {!noFold && (
        <Cont>
          {unFold && (
            <Svg
              theme={theme}
              type="ellipsis"
              onClick={() => setLength(postLength)}
            />
          )}
          {Fold && (
            <Svg theme={theme} type="caret" onClick={() => setLength(from)} />
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
