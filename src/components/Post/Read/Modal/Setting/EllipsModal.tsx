import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { OverlayBg } from '../../../../../Tools/overlay';
import { AnimatePresence, motion } from 'framer-motion';
import {
  color,
  hoverBgColor,
  TransBorder,
} from '../../../../../../styles/variants';

interface IPostSettingBtnModal {
  _data: {
    theme: boolean;
    setting: boolean;
    isMyPost: boolean;
    closeSetting: () => void;
    setModal: Dispatch<SetStateAction<string>>;
  };
}
export const EllipsModal = ({ _data }: IPostSettingBtnModal) => {
  const router = useRouter();
  const theme = _data?.theme;
  const open = _data?.setting;
  const isMyPost = _data?.isMyPost;
  const setModal = _data?.setModal;
  const closeSetting = _data?.closeSetting;
  const onClick = (type: string) => {
    if (!isMyPost) return alert('not allowed.');
    if (type) {
      if (type === 'all') router.push(`/post/all`);
      if (isMyPost) {
        if (type === 'my_post') return router.push(`/post/my`);
        if (type === 'update') return setModal('update')!;
        if (type === 'delete') return setModal('delete')!;
      }
      closeSetting();
    }
  };
  return (
    <AnimatePresence>
      {open && (
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
          <OverlayBg closeModal={closeSetting} dark={0.4} />
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
