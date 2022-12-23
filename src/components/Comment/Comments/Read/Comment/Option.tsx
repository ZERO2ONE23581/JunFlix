import styled from '@emotion/styled';
import { IClickSvg } from './Content';
import { Svg } from '../../../../../Tools/Svg';
import { Modal } from '../../../../../../styles/global';
import { AnimatePresence, motion } from 'framer-motion';
import { OverlayBg } from '../../../../../Tools/OverlayBg';
import { TheComment } from '../../../../../libs/client/useComment';
import { cmtModalVar, hoverBgColor } from '../../../../../../styles/variants';

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
  return (
    <AnimatePresence>
      {modal && (
        <>
          <Cont
            exit="exit"
            layoutId="option"
            initial="initial"
            animate="animate"
            custom={theme}
            variants={cmtModalVar}
          >
            <Svg type="close" theme={theme} onClick={closeModal} />
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
          </Cont>
          <OverlayBg closeModal={closeModal} />
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Modal)`
  top: 50%;
  width: 40vw;
  z-index: 100;
  height: fit-content;
`;
const Btn = styled(motion.div)`
  width: 100%;
  padding: 5px;
  cursor: pointer;
  font-size: 1.5rem;
  text-align: center;
  border-radius: 10px;
  padding: 0.5rem 1rem;
`;
