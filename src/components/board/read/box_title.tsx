import { useState } from 'react';
import styled from '@emotion/styled';
import { Svg } from '../../../Tools/Svg';
import { ITheme } from '../../../../styles/theme';
import { SettingModal } from '../../../Tools/Modal/setting_modal';
import { useCapLetters } from '../../../libs/client/useTools';

interface IBoardTitle extends ITheme {
  data: {
    title: string;
    board_id: number;
    host_id: number;
  };
  onClick: (type: string) => void;
}
export const BoardTitle = ({ theme, data, onClick }: IBoardTitle) => {
  const title = useCapLetters(data.title);
  const [modal, setModal] = useState(false);
  const item = { modal, theme, onClick, setModal };
  const id = { host: data.host_id, board: data.board_id };
  return (
    <Container className="board-title">
      <h1>{title}</h1>
      <Svg
        type="more"
        size="1.5rem"
        theme={theme}
        isClicked={modal}
        onClick={() => setModal((p) => !p)}
      />
      <SettingModal
        item={{ ...item }}
        host_id={data.host_id}
        board_id={data.board_id}
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
