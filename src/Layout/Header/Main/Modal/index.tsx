import { ListModal } from './List';
import styled from '@emotion/styled';
import { LoginAvatar } from '../../Login/Avatar';
import { OverlayBg } from '../../../../Tools/OverlayBg';
import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction, useState } from 'react';
import { CreatePost } from '../../../../components/Post/Create';
import { useResponsive } from '../../../../libs/client/useTools';
import { redColor, TweenTrans } from '../../../../../styles/variants';

interface IMenuModal {
  _data: {
    theme: boolean;
    selected: string;
    isModal: boolean;
    setFixed: Dispatch<SetStateAction<boolean>>;
    setSelected: Dispatch<SetStateAction<string>>;
  };
}
export const Modal = ({ _data }: IMenuModal) => {
  const { isMobile, isDesk } = useResponsive();
  const [createPost, setCreatePost] = useState(false);
  const { theme, isModal, selected, setSelected, setFixed } = _data;

  const closeModal = () => {
    setSelected('');
    setCreatePost(false);
  };
  const isMovie = Boolean(selected === 'movie');
  const isBoard = Boolean(selected === 'board');
  const posts = ['all', 'my', 'quick', 'create'];
  const boards = ['all', 'my', 'create', ...genre];
  const movies = ['all', 'trending', 'now', 'tv', 'upcoming', 'top'];
  const arr = isMovie ? movies : isBoard ? boards : posts;
  const _list = { isMovie, isBoard, selected, setSelected, setCreatePost };
  return (
    <>
      <AnimatePresence>
        {isModal && (
          <Cont>
            {isMobile && (
              <Mob
                exit="exit"
                initial="initial"
                animate="animate"
                className="list_modal"
                variants={vars}
                custom={{ isMobile }}
                transition={TweenTrans}
              >
                <Lists className="lists">
                  {arr.map((type) => (
                    <ListModal
                      key={arr.indexOf(type)}
                      _data={{ ..._list, type }}
                    />
                  ))}
                </Lists>
              </Mob>
            )}
            {isDesk && (
              <Wrap
                exit="exit"
                initial="initial"
                animate="animate"
                className="list_modal"
                variants={vars}
                custom={{ isMobile }}
                transition={TweenTrans}
              >
                <Lists>
                  {arr.map((type) => (
                    <ListModal
                      key={arr.indexOf(type)}
                      _data={{ ..._list, type }}
                    />
                  ))}
                </Lists>
              </Wrap>
            )}
            <OverlayBg closeModal={closeModal} />
          </Cont>
        )}
      </AnimatePresence>
      <CreatePost _data={{ theme, createPost, closeModal, setFixed }} />
    </>
  );
};
const Cont = styled.div`
  border: 2px solid red;
  position: relative;
`;
const Wrap = styled(motion.div)`
  top: 50%;
  left: 50%;
  z-index: 100;
  min-width: 150px;
  position: absolute;
`;
const Mob = styled(motion.div)`
  top: 50%;
  left: 50%;
  z-index: 100;
  min-width: 25rem;
  font-size: 3.5rem;
  position: absolute;
  .lists {
    padding: 2rem;
    border-radius: 20px;
    li {
      padding: 1rem 2rem;
    }
  }
`;
const Lists = styled.ul`
  padding: 6px 0;
  overflow: hidden;
  border-radius: 5px;
  background-color: ${(p) => p.theme.color.bg};
  border: 1px solid ${(p) => p.theme.color.font};
`;
const vars = {
  animate: ({ isMobile }: any) => ({
    opacity: 1,
    x: '-50%',
    y: isMobile ? -999 : 30,
    transition: { duration: 0.3 },
  }),

  exit: ({ isMobile }: any) => ({
    opacity: 0,
    y: isMobile ? 999 : 0,
    transition: { duration: 0.3 },
  }),
  initial: ({ isMobile }: any) => ({
    x: '-50%',
    opacity: 0,
    y: isMobile ? 999 : 0,
  }),
  hover: () => ({ backgroundColor: redColor, transition: { duration: 0.3 } }),
};
const genre = [
  'drama',
  'action',
  'horror',
  'comedy',
  'romance',
  'fantasy',
  'mystery',
  'thriller',
  'adventure',
];
