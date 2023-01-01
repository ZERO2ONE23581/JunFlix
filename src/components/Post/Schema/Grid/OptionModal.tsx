import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { OverlayBg } from '../../../../Tools/OverlayBg';
import { List } from '../../../List';
import { MiniModal } from '../../../../../styles/global';
import { smallModalVar } from '../../../SettingModal';

interface IOptionModal {
  _data: {
    open: boolean;
    theme: boolean;
    closeModal: () => void;
    setModal: Dispatch<SetStateAction<string>>;
  };
}
export const OptionModal = ({ _data }: IOptionModal) => {
  const { open, theme, setModal, closeModal } = _data;
  const onClick = () => {
    closeModal();
    setModal('posts');
  };
  return (
    <AnimatePresence>
      {open && (
        <>
          <Cont
            exit="exit"
            custom={theme}
            initial="initial"
            animate="animate"
            className="org_modal"
            variants={smallModalVar}
          >
            <ul>
              <li className="small">Options</li>
              <List
                _data={{
                  theme,
                  onClick,
                  name: { eng: 'Organize', kor: '포스트 정리' },
                }}
              />
            </ul>
          </Cont>
          <OverlayBg closeModal={closeModal} />
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(MiniModal)`
  top: 2rem;
  right: -5rem;
  .small {
    padding: 0;
    padding-bottom: 1rem;
  }
  min-width: 340px;
  padding: 1rem 2rem;
`;
