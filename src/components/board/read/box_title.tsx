import { useState } from 'react';
import styled from '@emotion/styled';
import { Svg } from '../../../Tools/Svg';
import { ITheme } from '../../../../styles/theme';
import { SettingModal } from './board_setting_btn_modal';
import { useCapLetters } from '../../../libs/client/useTools';

interface IBoardTitle extends ITheme {
  item: {
    title: string;
    host_id: number;
    board_id: number;
  };
  clickModal: (type: string) => void;
}
export const BoardTitle = ({ theme, item, clickModal }: IBoardTitle) => {
  const title = useCapLetters(item.title);
  const [modal, setModal] = useState(false);
  const setting_item = { modal, theme, onClick: clickModal, setModal };
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
        host_id={item.host_id}
        board_id={item.board_id}
        item={{ ...setting_item }}
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
