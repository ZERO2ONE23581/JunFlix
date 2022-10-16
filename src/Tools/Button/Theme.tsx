import { Svg } from '../Svg';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { ITheme } from '../../../styles/theme';
import { AnimatePresence, motion } from 'framer-motion';
import { TweenTrans } from '../../../styles/variants';

export interface IBtns {
  theme: boolean;
  setTheme: Dispatch<SetStateAction<boolean>>;
}
export const ThemeBtn = ({ setTheme, theme }: IBtns) => {
  const isDark = !theme;
  const isLight = theme;
  const onClick = () => setTheme((p) => !p);
  return (
    <Cont>
      <Svg
        type="moon"
        theme={theme}
        onClick={onClick}
        item={{ size: '3rem', isHide: isLight }}
      />
      <Svg
        type="sun"
        theme={theme}
        onClick={onClick}
        item={{ size: '3rem', isHide: isDark }}
      />
    </Cont>
  );
};
const Cont = styled.div`
  width: 3rem;
  height: 3rem;
  top: 8em;
  right: 3em;
  z-index: 9999;
  position: fixed;
  svg {
    position: absolute;
  }
`;
