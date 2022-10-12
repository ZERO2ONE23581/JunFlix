import styled from '@emotion/styled';
import { IModal } from '../../types/global';
import useUser from '../../libs/client/useUser';
import { Overlay } from '../../../styles/global';
import useFollow from '../../libs/client/useFollow';
import { AnimatePresence, motion } from 'framer-motion';
import { hoverVar, modalVar } from '../../../styles/variants';

interface ISettingModal extends IModal {
  host_id: number;
  board_id: number;
}
export const SettingModal = ({ item, host_id, board_id }: ISettingModal) => {
  const modal = item.modal;
  const { loggedInUser } = useUser();
  const isMyBoard = Boolean(loggedInUser?.id === host_id);
  const [clickFollow, { isFollowing }] = useFollow(board_id);
  //
  return (
    <AnimatePresence>
      {modal && (
        <>
          <Cont
            exit="exit"
            initial="initial"
            animate="animate"
            custom={item.theme}
            variants={modalVar}
          >
            <ul>
              <List className="small">Board Options</List>
              <List
                variants={hoverVar}
                whileHover={'hover'}
                onClick={() => item.onClick('all')}
              >
                All Boards
              </List>
              <List
                variants={hoverVar}
                whileHover={'hover'}
                onClick={clickFollow}
              >
                {!isFollowing && 'Follow Board'}
                {isFollowing && 'Unfollow Board'}
              </List>
              <List
                variants={hoverVar}
                whileHover={'hover'}
                disabled={!isMyBoard}
                onClick={() => item.onClick('update')}
              >
                Edit Board
              </List>
              <List
                variants={hoverVar}
                whileHover={'hover'}
                disabled={!isMyBoard}
                onClick={() => item.onClick('delete')}
              >
                Delete Board
              </List>
            </ul>
          </Cont>
          <Overlay
            zindex={1}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => item.setModal(false)}
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
