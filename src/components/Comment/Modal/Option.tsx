import styled from '@emotion/styled';
import { cmtModalVar } from './Update';
import { Svg } from '../../../Tools/Svg';
import { IClickSvg } from '../Comments/Comment';
import { Modal } from '../../../../styles/global';
import { OverlayBg } from '../../../Tools/overlay';
import { AnimatePresence, motion } from 'framer-motion';
import { hoverBgColor } from '../../../../styles/variants';
import { TheComment } from '../../../libs/client/useComment';

interface IOption {
  _data: {
    theme: boolean;
    isOption: boolean;
    comment: TheComment;
    closeModal: () => void;
    clickSvg: ({ type, comment }: IClickSvg) => void;
  };
}
export const Option = ({ _data }: IOption) => {
  const { theme, clickSvg, comment, isOption, closeModal } = _data;
  return (
    <AnimatePresence>
      {isOption && (
        <>
          <Cont
            exit="exit"
            layoutId="option"
            initial="initial"
            animate="animate"
            className="modal"
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
  min-width: 500px;
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
