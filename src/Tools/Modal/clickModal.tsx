import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ITheme } from '../../../styles/theme';
import { IBoardType } from '../../types/board';
import { Overlay } from '../../../styles/global';
import { AnimatePresence, motion } from 'framer-motion';
import { hoverVar, modalVar, variants } from '../../../styles/variants';
import { Dispatch, SetStateAction } from 'react';

interface IClickModal extends ITheme {
  type: string;
  show: {
    modal: boolean;
    setModal: Dispatch<SetStateAction<boolean>>;
  };
  onClick: (text: string) => void;
}
export const ClickModal = ({ type, onClick, theme, show }: IClickModal) => {
  //
  return (
    <AnimatePresence>
      {show.modal && (
        <>
          <Cont
            exit="exit"
            initial="initial"
            animate="animate"
            custom={theme}
            variants={modalVar}
          >
            {type === 'board' && (
              <ul>
                <motion.li className="small">Board Options</motion.li>
                <motion.li
                  variants={hoverVar}
                  whileHover={'hover'}
                  onClick={() => onClick('all')}
                >
                  All Board
                </motion.li>
                <motion.li
                  variants={hoverVar}
                  whileHover={'hover'}
                  onClick={() => onClick('update')}
                >
                  Edit Board
                </motion.li>
                <motion.li
                  variants={hoverVar}
                  whileHover={'hover'}
                  onClick={() => onClick('delete')}
                >
                  Delete Board
                </motion.li>
              </ul>
            )}
          </Cont>
          <Overlay
            zindex={1}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => show.setModal(false)}
          />
        </>
      )}
    </AnimatePresence>
  );
};

const Cont = styled(motion.div)`
  z-index: 2;
  top: 100%;
  right: -20%;
  position: absolute;
  padding: 5px;
  font-size: 1.2em;
  overflow: hidden;
  width: fit-content;
  border-radius: 5px;
  ul {
    li {
      min-width: 150px;
      cursor: pointer;
      ////border: 1px solid yellowgreen;
      padding: 5px;
    }
    .small {
      font-size: 0.6em;
    }
  }
`;
