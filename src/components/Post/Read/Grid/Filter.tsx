import styled from '@emotion/styled';
import { Svg } from '../../../../Tools/Svg';
import { AnimatePresence, motion } from 'framer-motion';
import { OverlayBg } from '../../../../Tools/overlay';
import { List } from '../../../User/Read/MyPage/List';
import { variants } from '../../../../../styles/variants';
import { Dispatch, SetStateAction, useState } from 'react';
import { Circle, Modal, ModalBtn } from '../../../../../styles/global';
import { smallModalVar } from '../../../Board/Read/Each/Title/Setting_Modal';

interface IFilterPostBox {
  _data: {
    theme: boolean;
    setMax: Dispatch<SetStateAction<number>>;
  };
}
export const Filter = ({ _data }: IFilterPostBox) => {
  const theme = _data?.theme!;
  const setMax = _data?.setMax!;
  const [modal, setModal] = useState(false);
  return (
    <>
      <Icon>
        <Svg type="filter" theme={theme} onClick={() => setModal((p) => !p)} />
      </Icon>
      <AnimatePresence>
        {modal && (
          <>
            <FilterModal
              custom={theme}
              variants={smallModalVar}
              exit="exit"
              initial="initial"
              animate="animate"
              className="filter-modal"
            >
              <ul>
                <li className="small">Grid Size</li>
                <List
                  theme={theme}
                  name={'Max (최대)'}
                  onClick={() => setMax(6)}
                />
                <List
                  theme={theme}
                  name={'Big (크게)'}
                  onClick={() => setMax(5)}
                />
                <List
                  theme={theme}
                  name={'Medium (보통)'}
                  onClick={() => setMax(4)}
                />
                <List
                  theme={theme}
                  name={'Small (작게)'}
                  onClick={() => setMax(3)}
                />
                <List
                  theme={theme}
                  name={'Min (최소)'}
                  onClick={() => setMax(2)}
                />
              </ul>
            </FilterModal>
            <OverlayBg closeModal={() => setModal(false)} />
          </>
        )}
      </AnimatePresence>
    </>
  );
};
const FilterModal = styled(ModalBtn)`
  ul {
    li {
    }
  }
`;

const Icon = styled(Circle)`
  top: -3rem;
  right: 1.5rem;
  position: absolute;
`;
