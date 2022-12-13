import styled from '@emotion/styled';
import { MovieModal } from './Movie/Modal';
import { IMovie } from '../../types/global';
import { MovieHover } from './Movie/MovieHover';
import { AnimatePresence } from 'framer-motion';
import { FlexCol } from '../../../styles/global';
import { BoardBoxInfo } from './Board/BoardBoxInfo';
import { Dispatch, SetStateAction, useState } from 'react';

interface IBoxArray {
  _data: {
    theme: boolean;
    array: [] | any;
    setFixed: Dispatch<SetStateAction<boolean>>;
  };
}

export const Array = ({ _data }: IBoxArray) => {
  const { theme, array, setFixed } = _data;
  const [select, setSelect] = useState(0);
  const [modal, setModal] = useState(false);
  const onClick = (id: number) => {
    setSelect(id);
    setFixed(true);
    setModal(true);
  };
  const img = (img: string) => `https://image.tmdb.org/t/p/original${img}`;
  const movie = array?.find((movie: IMovie) => movie.id === select)!;
  return (
    <AnimatePresence initial={false}>
      {array?.map((data: any) => (
        <Box
          exit="exit"
          initial="initial"
          animate="animate"
          whileHover="hover"
          key={data.id}
          custom={theme}
          variants={vars}
          length={array.length}
          layoutId={data.id + ''}
          img={img(data?.backdrop_path)}
          onClick={() => onClick(data.id)}
        >
          <BoardBoxInfo data={data} theme={theme} />
          <MovieHover data={data} theme={theme} />
        </Box>
      ))}
      <MovieModal _data={{ theme, select, setModal, movie, modal, setFixed }} />
    </AnimatePresence>
  );
};

const Box = styled(FlexCol)<{ length: number; img?: string }>`
  height: 10rem;
  cursor: pointer;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  :nth-of-type(1) {
    transform-origin: center left;
  }
  :nth-of-type(${(p) => p.length}) {
    transform-origin: center right;
  }
  background: ${(p) =>
    p.img ? `url(${p.img}) center / cover no-repeat` : 'transparent'};
`;
const vars = {
  hover: { y: -20, scale: 1.1, transition: { duration: 0.3 } },
};
