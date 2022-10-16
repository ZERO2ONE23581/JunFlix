import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { Overlay } from '../../../../styles/global';
import useFollow from '../../../libs/client/useFollowingBoards';
import { AnimatePresence, motion } from 'framer-motion';
import { color, hoverBgColor, TransBorder } from '../../../../styles/variants';

interface ISettingModal {
  item: {
    modal: boolean;
    theme: boolean;
    isMyBoard: boolean;
    setType: Dispatch<SetStateAction<string>>;
    setModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const SettingModal = ({ item }: ISettingModal) => {
  const modal = item?.modal!;
  const theme = item?.theme!;
  const setType = item?.setType!;
  const setModal = item?.setModal!;
  const isMyBoard = item?.isMyBoard!;
  //
  const router = useRouter();
  const { board_id } = router.query;
  const { isFollowing, follow } = useFollow(board_id);

  const onClick = (type: string) => {
    if (type === 'all') router.push(`/board/all`);
    if (!isMyBoard) return alert('not allowed.');
    if (isMyBoard) {
      if (type === 'update') setType('update-board');
      if (type === 'delete') setType('delete-board');
      if (type === 'my_board') router.push(`/board/my`);
    }
    return;
  };
  //
  return (
    <AnimatePresence>
      {modal && (
        <>
          <Cont
            exit="exit"
            initial="initial"
            animate="animate"
            custom={theme}
            variants={variants}
          >
            <ul>
              <List className="small">Board Options</List>
              <List
                variants={hoverBgColor}
                whileHover={'hover'}
                onClick={() => onClick('all')}
              >
                All Boards
              </List>
              <List
                whileHover={'hover'}
                variants={hoverBgColor}
                onClick={() => onClick('my_board')}
              >
                My Boards
              </List>
              <List
                onClick={follow}
                hidden={isMyBoard}
                whileHover={'hover'}
                variants={hoverBgColor}
              >
                {!isFollowing && 'Save Board'}
                {isFollowing && 'Unsave Board'}
              </List>
              <List
                whileHover={'hover'}
                hidden={!isMyBoard}
                variants={hoverBgColor}
                onClick={() => onClick('update')}
              >
                Edit Board
              </List>
              <List
                variants={hoverBgColor}
                whileHover={'hover'}
                hidden={!isMyBoard}
                onClick={() => onClick('delete')}
              >
                Delete Board
              </List>
            </ul>
          </Cont>
          <Overlay
            zindex={1}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setModal(false)}
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
  .small {
    font-size: 1rem;
  }
`;
const List = styled(motion.li)<{ hidden?: boolean }>`
  padding: 5px;
  cursor: pointer;
  min-width: 150px;
  display: ${(p) => p.hidden && 'none'};
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
