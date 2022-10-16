import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { Overlay } from '../../../../../styles/global';
import useFollow from '../../../../libs/client/useFollowingBoards';
import { AnimatePresence, motion } from 'framer-motion';
import {
  color,
  hoverBgColor,
  TransBorder,
} from '../../../../../styles/variants';
import { List } from './btn_modal_list';
import useUser from '../../../../libs/client/useUser';

interface ISettingModal {
  item: {
    modal: boolean;
    theme: boolean;
    isMyPage: boolean;
    setModal: Dispatch<SetStateAction<boolean>>;
    setCreatePost: Dispatch<SetStateAction<boolean>>;
  };
}
export const AddBtnModal = ({ item }: ISettingModal) => {
  const modal = item?.modal!;
  const theme = item?.theme!;
  const setModal = item?.setModal!;
  const setCreatePost = item?.setCreatePost!;
  const isMyPage = item?.isMyPage!;
  const router = useRouter();
  const { isLoggedIn } = useUser();
  //
  const onClick = (type: string) => {
    if (!isLoggedIn) return;
    if (type === 'post') {
      setCreatePost(true);
      return setModal((p) => !p);
    } else router.push(`/${type}/create`);
  };
  //
  return (
    <>
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
              <motion.li className="small">Create</motion.li>
              <List
                name="Board"
                hidden={!isMyPage}
                onClick={() => onClick('board')}
              />
              <List
                name="Post"
                hidden={!isMyPage}
                onClick={() => onClick('post')}
              />
              <List
                name="Review"
                hidden={!isMyPage}
                onClick={() => onClick('review')}
              />
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
    .small {
      opacity: 0.8;
      font-size: 1rem;
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
