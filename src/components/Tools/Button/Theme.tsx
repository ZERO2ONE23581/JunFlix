import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { Svg } from '../Svg';

export interface IBtns {
  isLight: boolean;
  setTheme: Dispatch<SetStateAction<boolean>>;
}
export const ThemeBtn = ({ setTheme, isLight }: IBtns) => {
  return (
    <Cont>
      {!isLight && (
        <Svg size="2.5rem" type="moon" onClick={() => setTheme(true)} />
      )}
      {isLight && (
        <Svg size="2.5rem" type="sun" onClick={() => setTheme(false)} />
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
