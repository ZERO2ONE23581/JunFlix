import { MovieHover } from './Hover';
import styled from '@emotion/styled';
import { MovieModal } from '../../Modal';
import { AnimatePresence } from 'framer-motion';
import { IMovie } from '../../../../types/global';
import { FlexCol } from '../../../../../styles/global';
import { Dispatch, SetStateAction, useState } from 'react';

interface IEachMovie {
  _data: {
    theme: boolean;
    array: [] | any;
    setFixed: Dispatch<SetStateAction<boolean>>;
  };
}

export const MovieBox = ({ _data }: IEachMovie) => {
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
        <Cont
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
          <MovieHover data={data} />
        </Cont>
      ))}
      <MovieModal _data={{ theme, select, setModal, movie, modal, setFixed }} />
    </AnimatePresence>
  );
};

const Cont = styled(FlexCol)<{ length: number; img?: string }>`
  height: 10rem;
  cursor: pointer;
  overflow: hidden;
  border-radius: 5px;
  justify-content: flex-end;
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
