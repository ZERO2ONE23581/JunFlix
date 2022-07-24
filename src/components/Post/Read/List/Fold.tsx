import styled from '@emotion/styled';
import { Btn } from '../../../Style/Button';
import { Dispatch, SetStateAction } from 'react';

interface IFold {
  Max: number;
  length: number;
  postLength: number;
  setLength: Dispatch<SetStateAction<number>>;
}
export const Fold = ({ Max, postLength, setLength, length }: IFold) => {
  const noFold = Boolean(postLength < length);
  const unFold = Boolean(length !== postLength);
  const Fold = Boolean(length === postLength);
  return (
    <>
      {!noFold && (
        <Cont className="post-fold">
          {unFold && (
            <Btn
              type="button"
              name="펼치기"
              onClick={() => setLength(postLength)}
            />
          )}
          {Fold && (
            <Btn type="button" name="접기" onClick={() => setLength(Max)} />
          )}
        </Cont>
      )}
    </>
  );
};
const Cont = styled.div`
  margin-top: 20px;
  display: flex;
  align-content: center;
  justify-content: end;
  button {
    width: 80px;
    color: ${(p) => p.theme.color.font};
    background-color: ${(p) => p.theme.color.bg};
  }
`;
