import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Page = styled.section`
  width: 100%;
  height: 100%;
  padding: 0 2rem;
  position: relative;
`;
export const BG = styled(Page)<{ isDesk: boolean }>`
  padding: 2.5rem;
  color: whitesmoke;
  min-height: ${(p) => (p.isDesk ? '100%' : '180vh')};
  background: url('/img/up.jpg') center / cover no-repeat;
  .post_cover {
    h2 {
      color: whitesmoke;
    }
  }
`;
export const Mob = styled.article<{ isDesk: boolean }>``;
export const FlexPage = styled(Page)`
  display: flex;
  padding-top: 30vh;
  align-items: center;
  flex-direction: column;
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
export const Flex_ = styled.div<{ isDesk: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ::-webkit-scrollbar {
    display: none;
  }
`;
export const FlexCol_ = styled(Flex_)<{ isDesk: boolean }>`
  flex-direction: column;
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
export const Text = styled(FlexCol)`
  gap: 10px;
  align-items: center;
  justify-content: center;
  > span {
    span {
      display: block;
      text-align: center;
    }
  }
`;
export const Layer_ = styled(Flex_)`
  justify-content: space-between;
  padding: ${(p) => (p.isDesk ? '0.6rem 1rem' : '2rem')};
  h1 {
    font-size: ${(p) => (p.isDesk ? '2rem' : '4rem')};
  }
  .close_ {
    width: ${(p) => (p.isDesk ? '2rem' : '4rem')};
    height: ${(p) => (p.isDesk ? '2rem' : '4rem')};
  }
  button {
    padding: 0.4rem;
    border-radius: 40px;
    width: ${(p) => (p.isDesk ? '100px' : '10rem')};
    font-size: ${(p) => (p.isDesk ? '1.4rem' : '2.5rem')};
  }
  > div {
    width: 100%;
    :first-of-type {
      justify-content: flex-start;
    }
    :last-of-type {
      justify-content: flex-end;
    }
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
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  ::-webkit-scrollbar {
    display: none;
  }
  form {
    width: 100%;
  }
  h1 {
    margin-bottom: 0.5rem;
  }
  .close {
    top: 0.8rem;
    left: 0.8rem;
    position: absolute;
  }
`;
export const MiniModal = styled(motion.div)`
  z-index: 100;
  padding: 5px;
  overflow: hidden;
  font-size: 1.6rem;
  position: absolute;
  border-radius: 5px;
  .small {
    opacity: 0.8;
    font-size: 1.4rem;
  }
  ul {
    width: fit-content;
    li {
      gap: 0rem;
      display: flex;
      cursor: pointer;
      align-items: center;
      padding: 0.3rem 1rem;
      justify-content: space-between;
    }
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
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
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
  ::-webkit-scrollbar {
    display: none;
  }
`;
export const Box = styled(FlexCol)`
  padding: 40px;
  position: relative;
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
export const PostCover = styled(FlexCol)`
  gap: 1rem;
  cursor: pointer;
  overflow: hidden;
  img {
    width: 100%;
    height: fit-content;
    border-radius: 1rem;
    box-shadow: ${(p) => p.theme.boxShadow.nav};
  }
  h2 {
    font-weight: 400;
    text-align: center;
  }
`;
