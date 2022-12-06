import { Lists } from './Lists';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { MovieLists } from './Movie_Lists';
import { Overlay } from '../../../../../styles/global';
import { Dispatch, SetStateAction, useState } from 'react';
import { CreatePost } from '../../../../components/Post/Create';
import { menuModalVar, TweenTrans } from '../../../../../styles/variants';

interface IMenuModal {
  theme: boolean;
  selected: string;
  isModal: boolean;
  setSelected: Dispatch<SetStateAction<string>>;
}
export const MenuModal = ({
  theme,
  isModal,
  selected,
  setSelected,
}: IMenuModal) => {
  const isMovie = Boolean(selected === 'movie');
  const [createPost, setCreatePost] = useState(false);

  return (
    <>
      <CreatePost
        theme={theme}
        open={createPost}
        closeModal={() => setCreatePost(false)}
      />
      {isModal && (
        <>
          <Cont
            exit="exit"
            initial="initial"
            animate="animate"
            variants={menuModalVar}
            transition={TweenTrans}
          >
            <ul>
              {!isMovie && (
                <Lists
                  selected={selected}
                  setSelected={setSelected}
                  setCreatePost={setCreatePost}
                />
              )}
              {isMovie && (
                <MovieLists selected={selected} setSelected={setSelected} />
              )}
            </ul>
          </Cont>

          <Overlay
            animate={{ opacity: 1 }}
            onClick={() => setSelected('')}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          />
        </>
      )}
    </>
  );
};
const Cont = styled(motion.div)`
  top: 50%;
  left: 50%;
  z-index: 100;
  position: absolute;
  ul {
    padding: 6px 0;
    overflow: hidden;
    min-width: 140px;
    border-radius: 5px;
    background-color: ${(p) => p.theme.color.bg};
    border: 1px solid ${(p) => p.theme.color.font};
  }
  li {
    cursor: pointer;
    padding: 8px;
    color: inherit;
    font-size: 0.9em;
    text-align: center;
    span {
      :nth-of-type(2) {
        margin-left: 5px;
      }
    }
  }
`;
