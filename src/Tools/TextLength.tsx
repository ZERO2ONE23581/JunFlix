import styled from '@emotion/styled';
import { ITheme } from '../../styles/theme';
import { opacityVar } from '../../styles/variants';
import { AnimatePresence, motion } from 'framer-motion';

interface ITextLength extends ITheme {
  num: {
    max: number;
    text: number;
  };
  text: string;
}
export const TextLength = ({ text, theme, num }: ITextLength) => {
  const isZero = Boolean(num.text && num.text > 0);
  const isOver = Boolean(num.text && num.text > num.max);
  //
  return (
    <Cont
      className="text-length"
      exit="exit"
      initial="initial"
      animate="animate"
      variants={numVar}
      custom={{ theme, isOver }}
    >
      <AnimatePresence>
        {isZero && (
          <motion.span
            exit="exit"
            initial="initial"
            animate="animate"
            className="max-num"
            variants={opacityVar}
          >
            {num.text}
          </motion.span>
        )}
      </AnimatePresence>
      <span>
        {!isZero && '0'} / {num.max}
      </span>
    </Cont>
  );
};
const Cont = styled(motion.div)`
  width: 100%;
  display: flex;
  font-size: 1.3rem;
  align-items: center;
  justify-content: flex-end;
  span {
    margin-right: 5px;
  }
`;
const numVar = {
  animate: ({ isOver, theme }: any) => ({
    transition: { duration: 0.5 },
    color: isOver ? 'red' : theme ? 'rgba(0,0,0)' : 'rgba(255,255,255)',
  }),
};
