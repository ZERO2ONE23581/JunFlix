import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { IconBtn } from './Icon';

export interface IBtns {
  isLight: boolean;
  setTheme: Dispatch<SetStateAction<boolean>>;
}
export const ThemeBtn = ({ setTheme, isLight }: IBtns) => {
  return (
    <Cont>
      {!isLight && (
        <IconBtn
          type="button"
          size="2.5rem"
          svgType="moon"
          onClick={() => setTheme(true)}
        />
      )}
      {isLight && (
        <IconBtn
          type="button"
          size="2.5rem"
          svgType="sun"
          onClick={() => setTheme(false)}
        />
      )}
    </Cont>
  );
};
const Cont = styled.div`
  top: 100px;
  right: 40px;
  z-index: 999;
  position: fixed;
  .sun {
    fill: whitesmoke;
  }
`;
