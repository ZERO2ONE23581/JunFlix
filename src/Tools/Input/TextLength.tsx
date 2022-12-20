import styled from '@emotion/styled';
import { ITheme } from '../../../styles/theme';
import { opacityVar } from '../../../styles/variants';
import { AnimatePresence, motion } from 'framer-motion';

interface ITextLength extends ITheme {
  number: {
    max: number;
    typed: number;
  };
}
export const TextLength = ({ theme, number }: ITextLength) => {
  const isZero = Boolean(number?.typed === 0);
  const isOver = Boolean(number?.typed > number?.max);
  const max = number?.max;
  const typed = number?.typed;
  //
  return (
    <Cont
      exit="exit"
      initial="initial"
      animate="animate"
      variants={numVar}
      className="text-length"
      custom={{ theme, isOver }}
    >
      <AnimatePresence>
        {!isZero && (
          <motion.span
            exit="exit"
            initial="initial"
            animate="animate"
            className="max-num"
            variants={opacityVar}
          >
            {typed}
          </motion.span>
        )}
      </AnimatePresence>
      <span>
        {isZero && '0'} / {max}
      </span>
    </Cont>
  );
};
const Cont = styled(motion.div)`
  width: 100%;
  display: flex;
  font-size: 1.1rem;
  align-items: center;
  justify-content: flex-end;
  span {
    margin-right: 5px;
  }
`;
const numVar = {
  animate: ({ isOver, theme }: any) => ({
    transition: { duration: 0.5 },
    color: isOver
      ? 'rgb(255, 0, 0)'
      : theme
      ? 'rgba(0,0,0)'
      : 'rgba(255,255,255)',
  }),
};
