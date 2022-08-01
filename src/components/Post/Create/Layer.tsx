import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { IconBtn } from '../../Style/Button/IconBtn';

interface IBtnWrapProps {
  next: boolean;
  cancel: boolean;
  setNext: Dispatch<SetStateAction<boolean>>;
  setCancel: Dispatch<SetStateAction<boolean>>;
}
export const Layer = ({ next, setNext, cancel, setCancel }: IBtnWrapProps) => {
  return (
    <>
      {!next && (
        <Cont>
          <Flex>
            <IconBtn
              type="button"
              size="1.5rem"
              svgType="close"
              isClicked={cancel}
              onClick={() => setCancel(true)}
            />
            <h1>새 포스트 만들기</h1>
            <IconBtn
              type="button"
              size="1.5rem"
              svgType="right-arrow"
              onClick={() => setNext(true)}
            />
          </Flex>
        </Cont>
      )}
      {next && (
        <Cont>
          <Flex>
            <IconBtn
              type="button"
              size="1.3rem"
              svgType="left-arrow"
              onClick={() => setNext(false)}
            />
            <h1>새 포스트 만들기</h1>
            <IconBtn
              type="button"
              size="1.3rem"
              svgType="close"
              onClick={() => setCancel(true)}
            />
          </Flex>
        </Cont>
      )}
    </>
  );
};
const Cont = styled.div`
  color: ${(p) => p.theme.color.bg};
  border-bottom: ${(p) => p.theme.border.thin};
  background-color: ${(p) => p.theme.color.font};
  svg {
    fill: ${(p) => p.theme.color.bg};
  }
`;
const Flex = styled.div`
  width: 100%;
  height: 5vh;
  max-height: 37px;
  padding: 0 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-weight: 500;
  }
`;
