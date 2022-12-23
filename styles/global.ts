import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Page = styled(motion.section)`
  width: 100%;
  height: 100%;
  position: relative; ;
`;
export const FlexPage = styled(Page)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
export const Flex = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ::-webkit-scrollbar {
    display: none;
  }
`;
export const FlexCol = styled(Flex)`
  flex-direction: column;
  justify-content: flex-start;
`;
export const Circle = styled(Flex)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  border-radius: 100%;
  svg {
    display: block;
  }
`;
export const MiniModal = styled(motion.div)`
  top: 0rem;
  right: 0rem;
  position: absolute;
  z-index: 100;
  padding: 5px;
  font-size: 1.2em;
  overflow: hidden;
  border-radius: 5px;
  ul {
    width: fit-content;
    .small {
      font-size: 1rem;
    }
    li {
      gap: 0rem;
      display: flex;
      cursor: pointer;

      font-size: 1.1rem;
      align-items: center;
      padding: 0.3rem 1rem;
      justify-content: space-between;
    }
  }
`;
export const Text = styled(FlexCol)`
  gap: 10px;
  align-items: center;
  justify-content: center;
  > span {
    font-size: 1.2rem;
    .kor {
      font-size: 1.1rem;
    }
    span {
      display: block;
      text-align: center;
    }
  }
`;
export const Layer_ = styled(Flex)`
  padding: 0.6rem 1rem;
  justify-content: space-between;
  h1 {
    font-size: 1.7rem;
  }
  > div {
    :first-of-type {
      justify-content: flex-start;
    }
  }
  button {
    width: 100px;
    padding: 0.4rem;
    font-size: 1.2rem;
    border-radius: 40px;
  }
`;
export const Modal = styled(FlexCol)`
  left: 0;
  right: 0;
  top: 40vh;
  bottom: 0;
  z-index: 100;
  margin: 0 auto;
  position: fixed;
  overflow: hidden;
  overflow-y: auto;
  border-radius: 5px;
  width: fit-content;
  height: fit-content;
  justify-content: center;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  ::-webkit-scrollbar {
    display: none;
  }
  h1 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }
  .close {
    top: 0.8rem;
    left: 0.8rem;
    position: absolute;
  }
`;
export const BtnWrap = styled(Flex)`
  gap: 0.5rem;
  button {
    width: 100%;
    padding: 5px;
  }
`;
export const Grid = styled(motion.article)<{ box?: number }>`
  gap: 1.3rem;
  display: grid;
  width: fit-content;
  position: relative;
  background-color: inherit;
  grid-template-columns: ${(p) => p.box && `repeat(${p.box}, 1fr)`};
`;
export const Blur = styled.div<{ isBlur: boolean }>`
  pointer-events: ${(p) => p.isBlur && 'none'};
  filter: ${(p) => p.isBlur && 'blur(5px)'};
`;
export const Form = styled(motion.form)`
  width: 100%;
  display: flex;
  overflow-y: auto;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  button {
    margin-top: 0.8rem;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;
export const Box = styled(FlexCol)`
  padding: 40px;
  position: relative;
  width: fit-content;
  border-radius: 5px;
  align-items: flex-start;
  border: ${(p) => p.theme.border.thick};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  form {
    .flex {
      align-items: flex-start;
    }
  }
`;
