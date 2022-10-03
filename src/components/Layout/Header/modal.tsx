import {
  ListHover,
  menuModalVar,
  TweenTrans,
} from '../../../../styles/variants';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import useUser from '../../../libs/client/useUser';
import { Overlay } from '../../../../styles/global';
import { AnimatePresence, motion } from 'framer-motion';
import { useCapLetter } from '../../../libs/client/useTools';

interface IMenuModal {
  selected: string;
  isModal: boolean;
  setSelected: Dispatch<SetStateAction<string>>;
}
export const MenuModal = ({ selected, setSelected, isModal }: IMenuModal) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const onClick = (btnType: string, detail?: string) => {
    setSelected('');
    if (btnType === 'all') router.push(`/${selected}s`);
    if (btnType === 'my') router.push(`/${selected}s/my`);
    if (btnType && detail === 'genre') router.push(`/boards/${btnType}`);

    if (btnType === 'create') {
      if (selected === 'post') {
        alert('포스트를 생성할 보드를 선택해주세요.');
        router.push(`/boards/my`);
      } else {
        router.push(`/user/${loggedInUser?.id}/${selected}/create`);
      }
    }
    if (btnType && detail === 'movietype') {
      if (btnType === 'all') router.push(`/movies`);
      else router.push(`/movies/${btnType}`);
    }
  };
  const isMovie = Boolean(selected === 'movie');
  const movieArr = ['all', 'trending', 'now', 'tv', 'upcoming', 'top'];
  const Genre = [
    'sf',
    'drama',
    'comedy',
    'action',
    'horror',
    'mystery',
    'thriller',
  ];
  //
  return (
    <>
      <AnimatePresence>
        {isModal && (
          <>
            <Cont
              exit="exit"
              initial="initial"
              animate="animate"
              variants={menuModalVar}
              transition={TweenTrans}
            >
              {!isMovie && (
                <>
                  {['all', 'my'].map((e) => (
                    <List whileHover={ListHover} onClick={() => onClick(e)}>
                      {useCapLetter(e)} {useCapLetter(selected)}s
                    </List>
                  ))}
                  {selected === 'board' && (
                    <>
                      {Genre.map((e) => (
                        <List
                          key={Genre.indexOf(e)}
                          whileHover={ListHover}
                          onClick={() => onClick(e, 'genre')}
                        >
                          {useCapLetter(e)}
                        </List>
                      ))}
                    </>
                  )}
                  <List
                    whileHover={ListHover}
                    onClick={() => onClick('create')}
                  >
                    Create
                  </List>
                </>
              )}
              {isMovie && (
                <>
                  {movieArr.map((e) => (
                    <List
                      key={movieArr.indexOf(e)}
                      whileHover={ListHover}
                      onClick={() => onClick(e, 'movietype')}
                    >
                      <>
                        {e === 'all' && 'All Movies'}
                        {e === 'trending' && 'Trending Now'}
                        {e === 'now' && 'Now Play'}
                        {e === 'tv' && 'TV Shows'}
                        {e === 'upcoming' && 'Upcoming'}
                        {e === 'top' && 'Classics'}
                      </>
                    </List>
                  ))}
                </>
              )}
            </Cont>
            <Overlay
              className="overlay"
              animate={{ opacity: 1 }}
              onClick={() => setSelected('')}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};
const List = styled(motion.li)`
  padding: 10px;
  color: inherit;
  font-size: 0.9em;
  background-color: ${(p) => p.theme.color.bg};
`;
const Cont = styled(motion.ul)`
  top: 50%;
  left: 50%;
  z-index: 100;
  min-width: 140px;
  overflow: hidden;
  position: absolute;
  border-radius: 5px;
  background-color: inherit;
  border: 1px solid ${(p) => p.theme.color.font};
`;
