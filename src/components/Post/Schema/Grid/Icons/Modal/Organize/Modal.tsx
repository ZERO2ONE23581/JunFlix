import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { OverlayBg } from '../../../../../../../Tools/OverlayBg';
import { List } from '../../../../../../User/Read/MyPage/List';
import { MiniModal } from '../../../../../../../../styles/global';
import { smallModalVar } from '../../../../../../Board/Read/Each/Title/Setting_Modal';

interface IOptionModal {
  _data: {
    open: boolean;
    theme: boolean;
    closeModal: () => void;
    setModal: Dispatch<SetStateAction<string>>;
    setFixed: Dispatch<SetStateAction<boolean>>;
  };
}
export const OptionModal = ({ _data }: IOptionModal) => {
  const { open, theme, setModal, closeModal, setFixed } = _data;
  const onClick = () => {
    closeModal();
    setFixed(true);
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
                  name: { eng: 'Organize Posts', kor: '포스트 정리' },
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
  min-width: 16rem;
`;
