import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { Svg } from '../../../Tools/Svg';

interface IBtnWrapProps {
  next: boolean;
  cancel: boolean;
  setNext: Dispatch<SetStateAction<boolean>>;
  setCancel: Dispatch<SetStateAction<boolean>>;
}
export const Layer = ({ next, setNext, cancel, setCancel }: IBtnWrapProps) => {
  return (
    <Cont>
      {!next && (
        <>
          <Svg size="1.5rem" type="close" onClick={() => setCancel(true)} />
          <h1>새 포스트 만들기</h1>
          <Svg size="1.5rem" type="right-arrow" onClick={() => setNext(true)} />
        </>
      )}
      {next && (
        <>
          <Svg size="1.5rem" type="left-arrow" onClick={() => setNext(false)} />
          <h1>새 포스트 만들기</h1>
          <Svg size="1.5rem" type="close" onClick={() => setCancel(true)} />
        </>
      )}
    </Cont>
  );
};
const Cont = styled.div`
  width: 100%;
  height: 36px;
  min-height: 36px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(p) => p.theme.color.bg};
  border-bottom: ${(p) => p.theme.border.thin};
  background-color: ${(p) => p.theme.color.font};
  h1 {
    font-weight: 500;
    font-size: 1.3rem;
  }
  svg {
    fill: ${(p) => p.theme.color.bg};
  }
`;
