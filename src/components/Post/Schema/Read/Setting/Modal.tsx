import {
  color,
  greyBrdr,
  hoverBgColor,
} from '../../../../../../styles/variants';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { OverlayBg } from '../../../../../Tools/OverlayBg';

interface IPostSetModal {
  _data: {
    theme: boolean;
    host_id: number;
    setting: boolean;
    isMyPost: boolean;
    closeSetting: () => void;
    setModal: Dispatch<SetStateAction<string>>;
  };
}
export const PostSetModal = ({ _data }: IPostSetModal) => {
  const router = useRouter();
  const { theme, setting, host_id, isMyPost, setModal, closeSetting } = _data;
  const onClick = (type: string) => {
    if (type) {
      if (type === 'all') return router.push(`/post/all`);
      if (!isMyPost) return alert('not allowed.');
      if (isMyPost) {
        if (type === 'my_post') return router.push(`/user/${host_id}/posts`);
        else setModal(type);
      }
      return closeSetting();
    }
  };
  return (
    <AnimatePresence>
      {setting && (
        <>
          <Cont
            exit="exit"
            initial="initial"
            animate="animate"
            custom={theme}
            variants={vars}
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
                hidden={!isMyPost}
                whileHover={'hover'}
                variants={hoverBgColor}
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
  display: ${(p) => p.hidden && 'none'};
`;
const vars = {
  animate: (theme: boolean) => ({
    y: 0,
    opacity: 1,
    border: greyBrdr,
    color: color(theme),
    transition: { duration: 0.3 },
    backgroundColor: color(!theme),
  }),
  initial: () => ({ y: -99, opacity: 0 }),
  exit: () => ({ y: -99, opacity: 0, transition: { duration: 0.3 } }),
};
