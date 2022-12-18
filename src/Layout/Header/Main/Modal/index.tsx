import { ListModal } from './List';
import styled from '@emotion/styled';
import { OverlayBg } from '../../../../Tools/overlay';
import { AnimatePresence, motion } from 'framer-motion';
import { CreatePost } from '../../../../components/Post/Create';
import { Dispatch, SetStateAction, useState } from 'react';
import { menuModalVar, TweenTrans } from '../../../../../styles/variants';

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
  const [createPost, setCreatePost] = useState(false);
  const { theme, isModal, selected, setSelected, setFixed } = _data;

  const closeModal = () => {
    setSelected('');
    setCreatePost(false);
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
          <>
            <OverlayBg closeModal={closeModal} />
            <Cont
              exit="exit"
              initial="initial"
              animate="animate"
              variants={menuModalVar}
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
            </Cont>
          </>
        )}
      </AnimatePresence>
      <CreatePost _data={{ theme, createPost, closeModal, setFixed }} />
    </>
  );
};
const Cont = styled(motion.div)`
  top: 50%;
  left: 50%;
  z-index: 100;
  position: absolute;
`;
const Lists = styled.ul`
  padding: 6px 0;
  overflow: hidden;
  min-width: 140px;
  border-radius: 5px;
  background-color: ${(p) => p.theme.color.bg};
  border: 1px solid ${(p) => p.theme.color.font};
`;
