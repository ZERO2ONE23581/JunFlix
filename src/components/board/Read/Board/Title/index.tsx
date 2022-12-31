import styled from '@emotion/styled';
import { SettingModal } from './Setting';
import { Svg } from '../../../../../Tools/Svg';
import { Dispatch, SetStateAction, useState } from 'react';
import { Circle, Mob } from '../../../../../../styles/global';
import { hoverBgVars } from '../../../../../../styles/variants';
import { useCapLetters } from '../../../../../libs/client/useTools';

interface IBoardTitle {
  _data: {
    title: string;
    theme: boolean;
    isDesk: boolean;
    isMyBoard: boolean;
    setType: Dispatch<SetStateAction<string>>;
  };
}
export const Title = ({ _data }: IBoardTitle) => {
  const [modal, setModal] = useState(false);
  const onClick = () => setModal((p) => !p);
  const { isDesk, title, theme, setType, isMyBoard } = _data;
  const size = isDesk ? '2rem' : '2.5rem';
  return (
    <Cont isDesk={isDesk}>
      <h1 className="board_title">{useCapLetters(title)}</h1>
      {isMyBoard && (
        <>
          <Setting
            custom={!theme}
            animate="animate"
            onClick={onClick}
            whileHover="hover"
            className="setting"
            variants={hoverBgVars}
          >
            <Svg type="more" theme={!theme} item={{ isClicked: modal, size }} />
          </Setting>
          <SettingModal
            _data={{ modal, theme, isMyBoard, setType, setModal }}
          />
        </>
      )}
    </Cont>
  );
};
const Cont = styled(Mob)`
  gap: 10px;
  display: flex;
  position: relative;
  align-items: flex-end;
  .board_title {
    font-size: ${(p) => (p.isDesk ? '3.3rem' : '4rem')};
  }
  .setting {
    width: ${(p) => (p.isDesk ? '2rem' : '3rem')};
    height: ${(p) => (p.isDesk ? '2rem' : '3rem')};
    top: ${(p) => (p.isDesk ? '0.6rem' : '-2rem')};
    right: ${(p) => (p.isDesk ? '-3.5rem' : '0rem')};
  }
  .setting-modal {
    top: ${(p) => (p.isDesk ? '3.3rem' : '2.2rem')};
    right: ${(p) => (p.isDesk ? '-10rem' : '0rem')};
    font-size: ${(p) => (p.isDesk ? '1rem' : '2rem')};
    width: fit-content;
    padding: ${(p) => (p.isDesk ? '0.5rem 1rem' : '0.8rem 1.5rem')};
    li {
      padding: ${(p) => (p.isDesk ? '0.5rem' : '0.8rem')};
    }
    .small {
      font-size: ${(p) => (p.isDesk ? '1rem' : '2rem')};
    }
  }
`;

const Setting = styled(Circle)`
  cursor: pointer;
  position: absolute;
  svg {
    pointer-events: none;
  }
`;
