import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Flex, Modal } from './global';
import { color, greyBrdr } from './variants';

export const PostModalStyle = styled(Modal)`
  top: 5vh;
  width: 35vw;
  height: 85vh;
  min-width: 500px;
  min-height: 600px;
  font-size: 1.1rem;
  justify-content: flex-start;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const SelectModal = styled(Modal)`
  top: 10rem;
  padding: 0;
  z-index: 113;
  max-width: 30vw;
  min-width: 520px;
  font-size: 1.2rem;
  width: fit-content;
  height: fit-content;
  border-radius: 20px;
  justify-content: flex-start;
  form {
    width: 100%;
    height: 100%;
  }
`;
export const ModalLayer = styled(Flex)`
  width: 100%;
  display: flex;
  font-size: 1.5rem;
  padding: 10px 20px;
  border-bottom: 2px solid ${(p) => p.theme.color.font};
  > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    :nth-of-type(1) {
      justify-content: flex-start;
    }
    :nth-of-type(3) {
      justify-content: flex-end;
    }
  }
`;
export const select_board_ul_var = {
  hover: () => ({
    color: '#ffffff',
    backgroundColor: '#E50914',
    transition: { duration: 0.6 },
  }),
  animate: (theme: boolean) => ({
    color: color(theme),
    backgroundColor: color(!theme),
    transition: { duration: 0.6 },
  }),
};

export const PostModalStyleStyle = styled(Modal)`
  padding: 0;
  width: 40vw;
  height: 90vh;
  min-width: 520px;
  font-size: 1.1rem;
  justify-content: flex-start;
  form {
    width: 100%;
    height: 100%;
  }
`;
export const Postlayer = styled(motion.div)`
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  h1 {
    font-size: 1.3rem;
    font-weight: 500;
  }
  button {
    padding: 5px 20px;
    border-radius: 20px;
    width: fit-content;
  }
  .absolute-layer {
    padding: 0 15px;
    top: 50%;
    left: 50%;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
export const Absolutelayer = styled(motion.div)`
  padding: 0 15px;
  top: 50%;
  left: 50%;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const CreatePostMain = styled(motion.div)`
  overflow: auto;
  position: relative;
  ::-webkit-scrollbar {
    display: none;
  }
`;
export const Span = styled(motion.span)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  :first-of-type {
    justify-content: flex-start;
  }
  :nth-of-type(2) {
  }
  :last-of-type {
    justify-content: flex-end;
  }
  svg {
    display: block;
    position: static;
  }
`;
export const postVar = {
  animate: (theme: boolean) => ({
    scale: 1,
    opacity: 1,
    border: greyBrdr,
    color: color(theme),
    transition: { duration: 0.8 },
    backgroundColor: color(!theme),
  }),
  exit: () => ({ opacity: 0, scale: 0.1, transition: { duration: 0.8 } }),
  initial: () => ({ scale: 0.1, opacity: 0, transition: { duration: 0.8 } }),
};
