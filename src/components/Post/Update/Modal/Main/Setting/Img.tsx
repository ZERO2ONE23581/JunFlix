import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';

interface IPostImg {
  type: string;
  open: boolean;
  imgSrc: string;
}
export const PostImg = ({ imgSrc, open, type }: IPostImg) => {
  return (
    <AnimatePresence>
      {open && (
        <Container
          alt={type}
          src={imgSrc}
          className={type}
          variants={vars}
          exit="exit"
          initial="initial"
          animate="animate"
        />
      )}
    </AnimatePresence>
  );
};
const Container = styled(motion.img)`
  top: 50%;
  left: 50%;
  width: 15rem;
  height: 15rem;
  display: block;
  position: absolute;
  border-radius: 15px;
`;
const vars = {
  initial: () => ({
    x: '-50%',
    y: '-50%',
    scale: 0.1,
    opacity: 0,
    transition: { duration: 0.6 },
  }),
  animate: () => ({
    x: '-50%',
    y: '-50%',
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6 },
  }),
  exit: () => ({
    x: '-50%',
    y: '-50%',
    scale: 0.1,
    opacity: 0,
    transition: { duration: 0.6 },
  }),
};
