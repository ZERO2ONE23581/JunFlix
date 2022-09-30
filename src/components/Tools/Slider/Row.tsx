import styled from '@emotion/styled';
import { BoxArray } from './BoxArray';
import { Dispatch, SetStateAction } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { slideVars, SpringTrans } from '../../../../styles/variants';

interface IRow {
  array: [];
  page: number;
  boxes: number;
  reverse: boolean;
  type: {
    pageType: string;
    sliderType: string;
    sliderDetail?: string;
  };
  setLeave: Dispatch<SetStateAction<boolean>>;
}
export const Row = ({ array, page, boxes, reverse, setLeave, type }: IRow) => {
  return (
    <Cont className="row">
      <AnimatePresence
        initial={false}
        custom={reverse}
        onExitComplete={() => setLeave((p) => !p)}
      >
        <Slide
          className="slide"
          key={page}
          boxes={boxes}
          custom={reverse}
          variants={slideVars}
          exit="exit"
          initial="initial"
          animate="animate"
          transition={SpringTrans}
        >
          <BoxArray type={type} array={array} reverse={reverse} />
        </Slide>
      </AnimatePresence>
    </Cont>
  );
};

const Cont = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const Slide = styled(motion.div)<{ boxes?: number }>`
  top: 0;
  right: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  gap: 10px;
  display: grid;
  grid-template-columns: ${(p) => `repeat(${p?.boxes},1fr)`};
  .movie-box {
    z-index: 1;
    overflow: hidden;
  }
  .post-box {
    min-height: 15rem;
    .post-bg {
      min-height: 15rem;
      .post-icon {
        min-height: 15rem;
      }
    }
  }
`;
