import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { IconBtn } from '../../Style/Button/IconBtn';

interface IBtnWrapProps {
  next: boolean;
  cancel: boolean;
  setNext: Dispatch<SetStateAction<boolean>>;
  setCancel: Dispatch<SetStateAction<boolean>>;
}
export const Top = ({ next, setNext, cancel, setCancel }: IBtnWrapProps) => {
  return (
    <>
      {!next && (
        <Cont>
          <IconBtn
            size="1.3rem"
            type="button"
            isClicked={cancel}
            svgType="left-arrow"
            onClick={() => setCancel(true)}
          />
          <h1>새 게시물 만들기</h1>
          <IconBtn
            size="1.3rem"
            type="button"
            svgType="right-arrow"
            onClick={() => setNext(true)}
          />
        </Cont>
      )}
      {next && (
        <Cont>
          <IconBtn
            size="1.3rem"
            type="button"
            svgType="left-arrow"
            onClick={() => setNext(false)}
          />
          <h1>새 게시물 만들기</h1>
          <div />
        </Cont>
      )}
    </>
  );
};
const Cont = styled.div`
  width: 100%;
  display: flex;
  padding: 10px 20px;
  align-items: center;
  justify-content: space-between;
  color: ${(p) => p.theme.color.bg};
  svg {
    fill: ${(p) => p.theme.color.bg};
  }
  background-color: ${(p) => p.theme.color.font};
  border-bottom: ${(p) => p.theme.border.thin};
`;
