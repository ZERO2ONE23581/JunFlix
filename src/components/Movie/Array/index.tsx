import styled from '@emotion/styled';
import { IMovie } from '../../../types/global';
import { MovieBox } from './Box';
import { Dispatch, SetStateAction } from 'react';
import { Flex } from '../../../../styles/global';
import { AnimatePresence, motion } from 'framer-motion';
import { SpringTrans } from '../../../../styles/variants';

interface IMovieArray {
  _data: {
    page: number;
    boxes: number;
    theme: boolean;
    array: IMovie[];
    reverse: boolean;
    setLeave: Dispatch<SetStateAction<boolean>>;
  };
}
export const MovieArray = ({ _data }: IMovieArray) => {
  const { theme, array, page, boxes, reverse, setLeave } = _data;
  return (
    <Cont>
      <AnimatePresence
        initial={false}
        custom={reverse}
        onExitComplete={() => setLeave((p) => !p)}
      >
        <Grid
          key={page}
          boxes={boxes}
          variants={vars}
          custom={reverse}
          transition={SpringTrans}
          exit="exit"
          initial="initial"
          animate="animate"
          className="slide"
        >
          <MovieBox _data={{ theme, array }} />
        </Grid>
      </AnimatePresence>
    </Cont>
  );
};
const Cont = styled(Flex)`
  min-height: 150px;
  position: relative;
`;
const Grid = styled(motion.div)<{ boxes?: number }>`
  gap: 1rem;
  width: 100%;
  display: grid;
  position: absolute;
  grid-template-columns: ${(p) => `repeat(${p?.boxes}, 1fr)`};
`;
const vars = {
  exit: (reverse: boolean) => ({
    x: reverse ? 2000 : -2000,
    transition: { duration: 1 },
  }),
  initial: (reverse: boolean) => ({ y: 0, x: reverse ? -2000 : 2000 }),
  animate: () => ({ x: 0, y: 0, transition: { duration: 1 } }),
};
