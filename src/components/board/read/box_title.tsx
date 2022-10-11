import { useState } from 'react';
import styled from '@emotion/styled';
import { Svg } from '../../../Tools/Svg';
import { ITheme } from '../../../../styles/theme';
import { ClickModal } from '../../../Tools/Modal/click';
import { useCapLetters } from '../../../libs/client/useTools';

interface IBoardTitle extends ITheme {
  title: string;
  onClick: (type: string) => void;
}
export const BoardTitle = ({ theme, title, onClick }: IBoardTitle) => {
  const [modal, setModal] = useState(false);
  return (
    <Container className="board-title">
      <h1>{useCapLetters(title)}</h1>
      <Svg
        type="more"
        size="1.5rem"
        theme={theme}
        isClicked={modal}
        onClick={() => setModal((p) => !p)}
      />
      <ClickModal
        type="board"
        theme={theme}
        onClick={onClick}
        show={{ modal, setModal }}
      />
    </Container>
  );
};
const Container = styled.div`
  position: relative;
  gap: 10px;
  display: flex;
  align-items: flex-end;
  h1 {
    font-size: 2.7rem;
  }
  .more {
    z-index: 2;
  }
`;
