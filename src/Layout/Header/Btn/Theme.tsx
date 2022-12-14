import styled from '@emotion/styled';
import { Svg } from '../../../Tools/Svg';
import { Dispatch, SetStateAction } from 'react';
import { Flex } from '../../../../styles/global';

export interface IBtns {
  theme: boolean;
  setTheme: Dispatch<SetStateAction<boolean>>;
}
export const ThemeBtn = ({ setTheme, theme }: IBtns) => {
  const isDark = !theme;
  const isLight = theme;
  const onClick = () => setTheme((p) => !p);
  const size = '2rem';
  return (
    <Cont size={size}>
      <Svg
        type="moon"
        theme={theme}
        onClick={onClick}
        item={{ size, isHide: isLight }}
      />
      <Svg
        type="sun"
        theme={theme}
        onClick={onClick}
        item={{ size, isHide: isDark }}
      />
    </Cont>
  );
};
const Cont = styled(Flex)<{ size: string }>`
  z-index: 999;
  position: relative;
  width: ${(p) => p.size && p.size};
  width: ${(p) => p.size && p.size};
  svg {
    position: absolute;
  }
`;
