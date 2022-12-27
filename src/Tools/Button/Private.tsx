import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { color } from '../../../styles/variants';

interface IUserPrivate {
  _data: {
    theme: boolean;
    isDesk: boolean;
    onMode: () => void;
    onPrivate: boolean;
  };
}
export const OnPrivateBtn = ({ _data }: IUserPrivate) => {
  const { theme, onMode: onClick, onPrivate, isDesk } = _data;
  const isPri = () => {
    if (isDesk) {
      if (onPrivate) return 25;
      else return 0;
    } else {
      if (onPrivate) return 60;
      else return 0;
    }
  };
  return (
    <>
      <Box
        animate="animate"
        variants={boxVar}
        onClick={onClick}
        whileHover="hover"
        className="private_btn"
        custom={{ theme, onPrivate, isPri: isPri() }}
      >
        <Circle
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="circle"
          variants={circleVar}
          custom={{ theme, onPrivate, isPri: isPri() }}
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
  hover: () => ({ outline: '3px solid #d63031' }),
  animate: ({ theme, onPrivate }: any) => ({
    backgroundColor: onPrivate ? '#d63031' : color(!theme),
    outline: theme ? '2px solid #000000' : '2px solid #ffffff',
  }),
};
const circleVar = {
  initial: ({ onPrivate }: any) => ({
    x: onPrivate ? 0 : 0,
  }),
  animate: ({ theme, isPri }: any) => ({
    x: isPri,
    backgroundColor: color(theme),
  }),
  hover: ({ theme, onPrivate }: any) => ({
    backgroundColor: onPrivate ? color(theme) : '#d63031',
  }),
};
