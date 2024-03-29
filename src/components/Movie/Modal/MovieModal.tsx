import { Info } from './Info';
import styled from '@emotion/styled';
import { Svg } from '../../../Tools/Svg';
import { IMovie } from '../../../types/global';
import { Dispatch, SetStateAction } from 'react';
import { Flex } from '../../../../styles/global';
import { PostSt } from '../../../../styles/post';
import { color } from '../../../../styles/variants';
import { OverlayBg } from '../../../Tools/OverlayBg';

interface IMovieModal {
  _data: {
    movie: IMovie;
    theme: boolean;
    modal: boolean;
    select: number;
    setModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const MovieModal = ({ _data }: IMovieModal) => {
  const movie = _data?.movie!;
  const title = movie?.title!;
  const overview = movie?.overview!;
  const vote_average = movie?.vote_average!;
  const release_date = movie?.release_date!;
  const backdrop_path = movie?.backdrop_path!;
  const original_name = movie?.original_name!;
  const original_language = movie?.original_language!;
  const { modal, theme, select, setModal } = _data;
  const bg = `https://image.tmdb.org/t/p/original${backdrop_path}`;
  const closeModal = () => {
    setModal(false);
  };
  return (
    <>
      {modal && (
        <>
          <Cont
            custom={theme}
            variants={vars}
            layoutId={select + ''}
            exit="exit"
            initial="initial"
            animate="animate"
          >
            <Svg theme={theme} type="close" onClick={closeModal} />
            <Bg bg={bg} />
            <Info
              _data={{
                title,
                overview,
                vote_average,
                release_date,
                original_name,
                original_language,
              }}
            />
          </Cont>
          <OverlayBg closeModal={closeModal} />
        </>
      )}
    </>
  );
};
const Cont = styled(PostSt)`
  top: 10%;
  z-index: 100;
  border: none;
  background-color: inherit;
`;
const Bg = styled(Flex)<{ bg: string }>`
  height: 50%;
  align-items: flex-end;
  background: ${(prev) =>
    `linear-gradient(to top, black, transparent), url(${prev.bg}) center / cover no-repeat`};
`;

const vars = {
  exit: () => ({ scale: 0.1, opacity: 0 }),
  initial: () => ({ scale: 0.1, opacity: 0 }),
  animate: (theme: boolean) => ({
    scale: 1,
    opacity: 1,
    color: color(theme),
    transition: { duration: 0.5 },
    backgroundColor: color(!theme),
  }),
};
