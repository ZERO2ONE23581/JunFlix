import { Svg } from '../Svg';
import { Array } from './Array';
import styled from '@emotion/styled';
import { IMovie } from '../../types/global';
import { Flex } from '../../../styles/global';
import { Dispatch, SetStateAction } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SpringTrans } from '../../../styles/variants';

interface IRow {
  _data: {
    page: number;
    boxes: number;
    theme: boolean;
    array: IMovie[];
    reverse: boolean;
    onClick: (type: string) => void;
  };
  _set: {
    setFixed: Dispatch<SetStateAction<boolean>>;
    setLeave: Dispatch<SetStateAction<boolean>>;
  };
}
export const Row = ({ _data, _set }: IRow) => {
  const { setFixed, setLeave } = _set;
  const { theme, array, page, boxes, reverse, onClick } = _data;
  return (
    <Cont>
      <Svg theme={theme} type="left-chev" onClick={() => onClick('left')} />
      <Wrap>
        <AnimatePresence
          initial={false}
          custom={reverse}
          onExitComplete={() => setLeave((p) => !p)}
        >
          <Slide
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
            <Array _data={{ theme, array, setFixed }} />
          </Slide>
        </AnimatePresence>
      </Wrap>
      <Svg theme={theme} type="right-chev" onClick={() => onClick('right')} />
    </Cont>
  );
};
const Cont = styled(Flex)`
  gap: 0.5rem;
  height: fit-content;
  margin-bottom: 2rem;
`;
const Wrap = styled(Flex)`
  min-height: 150px;
  position: relative;
`;
const Slide = styled(motion.div)<{ boxes?: number }>`
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
