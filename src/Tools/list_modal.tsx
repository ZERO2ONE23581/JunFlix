import styled from '@emotion/styled';
import { Overlay } from '../../styles/global';
import { Dispatch, SetStateAction } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { color, TransBorder } from '../../styles/variants';
import { List } from '../components/user/read/dash/btn_modal_list';

interface IBtnModal {
  item: {
    names: [string];
    theme: boolean;
    modal: boolean;
    setModal: Dispatch<SetStateAction<boolean>>;
  };
  onClick: (type: any) => void;
}
export const ListModal = ({ item, onClick }: IBtnModal) => {
  const names = item.names;
  const theme = item.theme;
  const modal = item.modal;
  const setModal = item.setModal;

  //
  return (
    <>
      <>
        {modal && (
          <>
            <Cont
              className="list-modal"
              exit="exit"
              initial="initial"
              animate="animate"
              custom={theme}
              variants={variants}
            >
              {names.map((element) => (
                <ul key={names.indexOf(element)}>
                  <List name={element} onClick={onClick} theme={theme} />
                </ul>
              ))}
            </Cont>

            <Overlay
              zindex={1}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setModal(false)}
            />
          </>
        )}
      </>
    </>
  );
};

const Cont = styled(motion.div)`
  z-index: 111;
  top: 0;
  right: 0;
  position: absolute;
  padding: 5px;
  font-size: 1.2em;
  overflow: hidden;
  width: fit-content;
  border-radius: 5px;
  ul {
    li {
      padding: 5px;
      cursor: pointer;
      width: 130px;
    }
  }
`;
const variants = {
  initial: (theme: boolean) => ({
    opacity: 0,
    color: color(theme),
    border: TransBorder(!theme),
    backgroundColor: color(!theme),
  }),
  animate: (theme: boolean) => ({
    opacity: 1,
    color: color(theme),
    border: TransBorder(!theme),
    backgroundColor: color(!theme),
    transition: { duration: 0.3 },
  }),
  exit: (theme: boolean) => ({
    opacity: 0,
    transition: { duration: 0.3 },
  }),
};
