import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { Overlay } from '../../../../styles/global';
import { AnimatePresence, motion } from 'framer-motion';
import { color, hoverBgColor, TransBorder } from '../../../../styles/variants';
import { OverlayBg } from '../../../Tools/overlay';

interface IPostSettingBtnModal {
  modal: boolean;
  theme: boolean;
  isMyPost: boolean;
  closeModal: () => void;
}
export const EllipsModal = ({
  modal,
  theme,
  isMyPost,
  closeModal,
}: IPostSettingBtnModal) => {
  const router = useRouter();
  const onClick = (type: string) => {
    if (type === 'all') router.push(`/post/all`);
    if (!isMyPost) return alert('not allowed.');
    if (isMyPost) {
      if (type === 'my_post') router.push(`/post/my`);
      if (type === 'update') alert('update');
      if (type === 'delete') alert('delete');
    }
  };
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
              <List className="small">Post Options</List>
              <List
                variants={hoverBgColor}
                whileHover={'hover'}
                onClick={() => onClick('all')}
              >
                All Posts
              </List>
              <List
                whileHover={'hover'}
                variants={hoverBgColor}
                onClick={() => onClick('my_post')}
              >
                My Posts
              </List>
              <List
                whileHover={'hover'}
                hidden={!isMyPost}
                variants={hoverBgColor}
                onClick={() => onClick('update')}
              >
                Edit Post
              </List>
              <List
                variants={hoverBgColor}
                whileHover={'hover'}
                hidden={!isMyPost}
                onClick={() => onClick('delete')}
              >
                Delete Post
              </List>
            </ul>
          </Cont>
          <OverlayBg closeModal={closeModal} />
        </>
      )}
    </AnimatePresence>
  );
};

const Cont = styled(motion.div)`
  z-index: 111;
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
