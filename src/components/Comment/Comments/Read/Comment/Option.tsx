import styled from '@emotion/styled';
import { IClickSvg } from './Content';
import { Svg } from '../../../../../Tools/Svg';
import { Modal } from '../../../../../../styles/global';
import { AnimatePresence, motion } from 'framer-motion';
import { OverlayBg } from '../../../../../Tools/OverlayBg';
import { TheComment } from '../../../../../libs/client/useComment';
import { cmtModalVar, hoverBgColor } from '../../../../../../styles/variants';
import { MobModal } from '../../../../../../styles/mobile';
import { useResponsive } from '../../../../../libs/client/useTools';

interface IOption {
  _data: {
    theme: boolean;
    modal: boolean;
    comment: TheComment;
    closeModal: () => void;
    clickSvg: ({ type, comment }: IClickSvg) => void;
  };
}
export const Option = ({ _data }: IOption) => {
  const { theme, clickSvg, comment, modal, closeModal } = _data;
  const { isDesk } = useResponsive();
  const size = isDesk ? '2rem' : '4rem';
  return (
    <AnimatePresence>
      {modal && (
        <Cont isDesk={isDesk}>
          <Modal
            exit="exit"
            layoutId="option"
            initial="initial"
            animate="animate"
            className="modal"
            custom={theme}
            variants={cmtModalVar}
          >
            <Svg
              type="close"
              theme={theme}
              item={{ size }}
              onClick={closeModal}
            />
            <Btn
              whileHover="hover"
              variants={hoverBgColor}
              onClick={() => clickSvg({ type: 'edit', comment })}
            >
              Edit
            </Btn>
            <Btn
              whileHover="hover"
              variants={hoverBgColor}
              onClick={() => clickSvg({ type: 'delete', comment })}
            >
              Delete
            </Btn>
          </Modal>
          <OverlayBg closeModal={closeModal} />
        </Cont>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(MobModal)`
  .modal {
    top: 50%;
    z-index: 100;
    font-size: ${(p) => (p.isDesk ? '1.3rem' : '3rem')};
  }
`;
const Btn = styled(motion.div)`
  width: 100%;
  padding: 5px;
  cursor: pointer;
  text-align: center;
  border-radius: 10px;
  padding: 0.5rem 1rem;
`;
