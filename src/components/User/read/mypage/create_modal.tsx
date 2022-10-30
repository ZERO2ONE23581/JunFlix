import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { List } from './btn_modal_list';
import { Dispatch, SetStateAction } from 'react';
import { Overlay } from '../../../../../styles/global';
import useUser from '../../../../libs/client/useUser';
import { color, TransBorder } from '../../../../../styles/variants';

interface ICreateModal {
  modal: boolean;
  theme: boolean;
  isMyPage: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  setCreate: Dispatch<
    SetStateAction<{ post: boolean; board: boolean; review: boolean }>
  >;
}
export const CreateModal = ({
  theme,
  modal,
  setModal,
  isMyPage,
  setCreate,
}: ICreateModal) => {
  const router = useRouter();
  const { isLoggedIn } = useUser();
  //
  const onClick = (type: string) => {
    if (!isLoggedIn) return;
    if (type === 'post') {
      setCreate((p) => ({ ...p, post: true }));
      return setModal((p) => !p);
    } else router.push(`/${type}/create`);
  };
  //
  return (
    <AnimatePresence>
      {modal && (
        <>
          <Cont
            className="create-modal"
            exit="exit"
            initial="initial"
            animate="animate"
            custom={theme}
            variants={variants}
          >
            <ul>
              <motion.li className="small">Create</motion.li>
              <List
                theme={theme}
                name="Board"
                hidden={!isMyPage}
                onClick={() => onClick('board')}
              />
              <List
                theme={theme}
                name="Post"
                hidden={!isMyPage}
                onClick={() => onClick('post')}
              />
              <List
                theme={theme}
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
    </AnimatePresence>
  );
};

const Cont = styled(motion.div)`
  z-index: 111;
  position: absolute;
  padding: 5px;
  font-size: 1.2rem;
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
