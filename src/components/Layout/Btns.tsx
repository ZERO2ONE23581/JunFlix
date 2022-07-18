import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { IconBtn } from '../Style/Button/IconBtn';

export interface IBtns {
  isLight: boolean;
  setTheme: Dispatch<SetStateAction<boolean>>;
}
export const Btns = ({ setTheme, isLight }: IBtns) => {
  return (
    <Cont>
      {!isLight && (
        <IconBtn
          type="button"
          size="3rem"
          svgType="moon"
          onClick={() => setTheme(true)}
        />
      )}
      {isLight && (
        <IconBtn
          type="button"
          size="3rem"
          svgType="sun"
          onClick={() => setTheme(false)}
        />
      )}
    </Cont>
  );
};
const Cont = styled.div`
  top: 30%;
  left: 3%;
  position: fixed;
  z-index: 999;
`;
