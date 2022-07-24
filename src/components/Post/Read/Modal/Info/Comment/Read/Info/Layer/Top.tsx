import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { CapFirstLetters } from '../../../../../../../../Tools';
import { IconBtn } from '../../../../../../../../Style/Button/IconBtn';

export interface ITop {
  title: string;
  setting: boolean;
  setReadPost: Dispatch<SetStateAction<boolean>>;
  setSetting: Dispatch<SetStateAction<boolean>>;
}
export const Top = ({ title, setting, setSetting, setReadPost }: ITop) => {
  return (
    <Cont>
      <IconBtn
        size="1.3rem"
        type="button"
        svgType="ellipsis"
        isClicked={setting}
        onClick={() => setSetting((p) => !p)}
      />
      <h1>{CapFirstLetters(title)}</h1>
      <IconBtn
        size="1.5rem"
        type="button"
        svgType="close"
        onClick={() => setReadPost(false)}
      />
    </Cont>
  );
};
const Cont = styled.div`
  display: flex;
  padding: 7px 20px;
  align-items: center;
  justify-content: space-between;
  color: ${(p) => p.theme.color.bg};
  background-color: ${(p) => p.theme.color.font};
  svg {
    fill: ${(p) => p.theme.color.bg};
  }
  h1 {
    font-weight: 500;
    font-size: 1.7rem;
    line-height: 1.2em;
  }
`;
