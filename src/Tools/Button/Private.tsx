import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { color } from '../../../styles/variants';

interface IUserPrivate {
  _data: {
    theme: boolean;
    onMode: () => void;
    onPrivate: boolean;
  };
}
export const OnPrivateBtn = ({ _data }: IUserPrivate) => {
  const { theme, onMode: onClick, onPrivate } = _data;
  return (
    <>
      <Box
        onClick={onClick}
        variants={boxVar}
        custom={{ theme, onPrivate }}
        animate="animate"
        whileHover="hover"
      >
        <Circle
          variants={circleVar}
          custom={{ theme, onPrivate }}
          initial="initial"
          animate="animate"
          whileHover="hover"
        />
      </Box>
    </>
  );
};
const Box = styled(motion.div)`
  width: 4rem;
  cursor: pointer;
  border-radius: 20px;
  padding: 0.4rem 0.6rem;
`;
const Circle = styled(motion.div)`
  width: 0.7rem;
  height: 0.7rem;
  padding: 0.7rem;
  border-radius: 100%;
  background-color: ${(p) => p.theme.color.font};
`;
const boxVar = {
  animate: ({ theme, onPrivate }: any) => ({
    outline: theme ? '2px solid #000000' : '2px solid #ffffff',
    backgroundColor: onPrivate ? '#d63031' : color(!theme),
  }),
  hover: ({ theme }: any) => ({
    outline: '3px solid #d63031',
  }),
};
const circleVar = {
  initial: ({ theme, onPrivate }: any) => ({
    x: onPrivate ? 0 : 0,
  }),
  animate: ({ theme, onPrivate }: any) => ({
    x: onPrivate ? 25 : 0,
    backgroundColor: color(theme),
  }),
  hover: ({ theme, onPrivate }: any) => ({
    backgroundColor: onPrivate ? color(theme) : '#d63031',
  }),
};
