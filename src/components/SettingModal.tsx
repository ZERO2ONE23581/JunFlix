import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { OverlayBg } from '../Tools/OverlayBg';
import { Dispatch, SetStateAction } from 'react';
import { useUser } from '../libs/client/useUser';
import { AnimatePresence, motion } from 'framer-motion';
import { color, hoverBgColor, TransBorder } from '../../styles/variants';

interface ISettingModal {
  _data: {
    modal: boolean;
    theme: boolean;
    isMyBoard: boolean;
    setType: Dispatch<SetStateAction<string>>;
    setModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const SettingModal = ({ _data }: ISettingModal) => {
  const router = useRouter();
  const { user_id } = useUser();
  const { modal, theme, setType, setModal, isMyBoard } = _data;
  const onClick = (type: string) => {
    if (!isMyBoard) return alert('not allowed.');
    if (isMyBoard) {
      if (type === 'my') router.push(`/user/${user_id}/boards`);
      if (type === 'create') router.push(`/board/create`);
      if (type === 'update') setType('update-board');
      if (type === 'delete') setType('delete-board');
      if (type === 'my_board') router.push(`/board/my`);
    }
    return setModal(false);
  };
  //
  return (
    <AnimatePresence>
      {modal && (
        <>
          <Cont
            custom={theme}
            variants={smallModalVar}
            exit="exit"
            initial="initial"
            animate="animate"
            className="setting-modal"
          >
            <ul>
              <List className="small">Options</List>
              <List
                whileHover={'hover'}
                variants={hoverBgColor}
                onClick={() => onClick('my')}
              >
                My Boards
              </List>
              <List
                whileHover={'hover'}
                variants={hoverBgColor}
                onClick={() => onClick('create')}
              >
                Create
              </List>
              <List
                hidden={!isMyBoard}
                whileHover={'hover'}
                variants={hoverBgColor}
                onClick={() => onClick('update')}
              >
                Edit
              </List>
              <List
                hidden={!isMyBoard}
                whileHover={'hover'}
                variants={hoverBgColor}
                onClick={() => onClick('delete')}
              >
                Delete
              </List>
            </ul>
          </Cont>
          <OverlayBg zIndex={1} closeModal={() => setModal(false)} />
        </>
      )}
    </AnimatePresence>
  );
};

const Cont = styled(motion.div)`
  z-index: 2;
  font-size: 1.2em;
  overflow: hidden;
  position: absolute;
  border-radius: 20px;
  ul {
    width: fit-content;
    li {
      //text-align: center;
    }
  }
`;
const List = styled(motion.li)<{ hidden?: boolean }>`
  padding: 5px;
  cursor: pointer;
  display: ${(p) => p.hidden && 'none'};
`;
export const smallModalVar = {
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
