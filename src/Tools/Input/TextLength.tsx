import styled from '@emotion/styled';
import { ITheme } from '../../../styles/theme';
import { opacityVar } from '../../../styles/variants';
import { AnimatePresence, motion } from 'framer-motion';
import { Flex } from '../../../styles/global';

interface ITextLength extends ITheme {
  isDesk: boolean;
  number: {
    max: number;
    typed: number;
  };
}
export const TextLength = ({ theme, number, isDesk }: ITextLength) => {
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
      className="text_length"
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
const Cont = styled(Flex)`
  padding-top: 1rem;
  width: fit-content;
  padding-right: 0rem;
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
