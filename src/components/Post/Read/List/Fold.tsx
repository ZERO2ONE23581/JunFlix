import styled from '@emotion/styled';
import { Btn } from '../../../Tools/Button';
import { Dispatch, SetStateAction } from 'react';
import { IconBtn } from '../../../Tools/Button/IconBtn';

interface IFold {
  max: number;
  length: number;
  postLength: number;
  setLength: Dispatch<SetStateAction<number>>;
}
export const Fold = ({ max, postLength, setLength, length }: IFold) => {
  const noFold = Boolean(postLength < length);
  const unFold = Boolean(length !== postLength);
  const Fold = Boolean(length === postLength);
  return (
    <>
      {!noFold && (
        <Cont className="post-fold">
          {unFold && (
            <IconBtn
              size="2.5rem"
              type="button"
              svgType="ellipsis"
              onClick={() => setLength(postLength)}
            />
          )}
          {Fold && (
            <IconBtn
              size="2rem"
              type="button"
              svgType="caret"
              onClick={() => setLength(max)}
            />
          )}
        </Cont>
      )}
    </>
  );
};
const Cont = styled.div`
  display: flex;
  margin-top: 20px;
  align-content: center;
  justify-content: end;
`;
