import styled from '@emotion/styled';
import { Svg } from '../../../../../Tools/Svg';
import { SettingModal } from './Setting_Modal';
import { Circle } from '../../../../../../styles/global';
import { Dispatch, SetStateAction, useState } from 'react';
import { hoverBgVars } from '../../../../../../styles/variants';
import { useCapLetters } from '../../../../../libs/client/useTools';

interface IBoardTitle {
  _data: {
    title: string;
    theme: boolean;
    isMyBoard: boolean;
    setType: Dispatch<SetStateAction<string>>;
    setFixed: Dispatch<SetStateAction<boolean>>;
  };
}
export const Title = ({ _data }: IBoardTitle) => {
  const [modal, setModal] = useState(false);
  const { title, theme, setType, isMyBoard, setFixed } = _data;
  return (
    <Cont>
      <h1>{useCapLetters(title)}</h1>
      {isMyBoard && (
        <>
          <Setting
            custom={!theme}
            variants={hoverBgVars}
            onClick={() => setModal((p) => !p)}
            animate="animate"
            whileHover="hover"
            className="setting"
          >
            <Svg
              type="more"
              theme={!theme}
              item={{ isClicked: modal, size: '1.5rem' }}
            />
          </Setting>
          <SettingModal
            _data={{ modal, theme, isMyBoard, setType, setModal, setFixed }}
          />
        </>
      )}
    </Cont>
  );
};
const Cont = styled.div`
  max-width: 60vw;
  .setting-modal {
    top: 3.3rem;
    right: -10rem;
    position: absolute;
  }
  gap: 10px;
  display: flex;
  position: relative;
  align-items: flex-end;
  h1 {
    font-size: 2.7rem;
  }
`;

const Setting = styled(Circle)`
  top: 0.6rem;
  right: -3.5rem;
  cursor: pointer;
  position: absolute;
  svg {
    pointer-events: none;
  }
`;
