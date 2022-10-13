import styled from '@emotion/styled';
import { IModal } from '../../types/global';
import useUser from '../../libs/client/useUser';
import { Overlay } from '../../../styles/global';
import useFollow from '../../libs/client/useFollowingBoards';
import { AnimatePresence, motion } from 'framer-motion';
import { hoverBgColor, variants } from '../../../styles/variants';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';

interface ISettingModal {
  item: {
    modal: boolean;
    theme: boolean;
    isMyBoard: boolean;
  };
  onClick: (text: string) => void;
  setModal: Dispatch<SetStateAction<boolean>>;
}
export const SettingModal = ({ onClick, setModal, item }: ISettingModal) => {
  const theme = item?.theme;
  const modal = item?.modal;
  const router = useRouter();
  const isMyBoard = item?.isMyBoard;
  const { board_id } = router.query;
  const { isFollowing, follow } = useFollow(board_id);
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
                onClick={follow}
                whileHover={'hover'}
                variants={hoverBgColor}
              >
                {!isFollowing && 'Follow Board'}
                {isFollowing && 'Unfollow Board'}
              </List>
              <List
                whileHover={'hover'}
                disabled={!isMyBoard}
                variants={hoverBgColor}
                onClick={() => onClick('update')}
              >
                Edit Board
              </List>
              <List
                variants={hoverBgColor}
                whileHover={'hover'}
                disabled={!isMyBoard}
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
const List = styled(motion.li)<{ disabled?: boolean }>`
  padding: 5px;
  cursor: pointer;
  min-width: 150px;
  display: ${(p) => p.disabled && 'none'};
`;
