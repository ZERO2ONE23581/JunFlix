import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Page = styled(motion.section)`
  width: 100%;
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;
  position: relative;
`;
export const Setting = styled.div`
  font-style: italic;
  width: 100%;
  gap: 12px;
  display: flex;
  align-items: center;
  label {
    gap: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  input {
    width: 1.4rem;
    height: 1.4rem;
  }
`;

export const FlexPage = styled(Page)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
`;
export const Layer = styled(FlexPage)`
  position: relative;
  width: 100%;
  height: 100%;
  .lock {
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
  }
`;
export const Circle = styled(motion.div)`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 100%;
  background-color: ${(p) => p.theme.color.logo};
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
export const ImageLabel = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    display: none;
  }
`;
export const ERROR = styled.div`
  top: 50%;
  left: 50%;
  z-index: 100;
  position: fixed;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #d63031;
  span {
    font-size: 1.4em;
    margin-right: 20px;
    svg {
      fill: white;
      margin-top: 4px;
      pointer-events: none;
    }
  }
`;
export const Modal = styled(motion.article)`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  margin: 2.5rem auto;
  //
  padding: 20px;
  overflow: hidden;
  overflow-y: auto;
  width: fit-content;
  //
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  //
  border-width: 1px;
  border-radius: 5px;
  border-style: solid;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  ::-webkit-scrollbar {
    display: none;
  }
  .close {
    top: 1rem;
    right: 1rem;
    position: absolute;
  }
`;
export const SmallModal = styled(Modal)`
  gap: 8px;
  padding: 40px;
  padding-top: 55px;
  line-height: 20px;
  align-items: flex-start;
  border: ${(p) => p.theme.border.thick};
  span {
    font-size: 1.25rem;
    font-style: italic;
  }
  .close {
    top: 7px;
    right: 10px;
    position: absolute;
  }
  .small {
    opacity: 0.7;
    font-size: 1.1rem;
  }
  .red {
    margin-left: 10px;
    color: ${(p) => p.theme.color.logo};
  }
`;
export const BtnWrap = styled(motion.div)`
  width: 100%;
  gap: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    width: 100%;
    padding: 5px;
    min-width: 80px;
  }
`;
export const DimBackground = styled.article<{ zIndex?: number }>`
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: #ffeaa7;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: ${(p) => (p.zIndex ? p.zIndex : '99')};
`;
export const Grid = styled.article<{ size?: number }>`
  gap: 20px;
  display: grid;
  position: relative;
  grid-template-columns: ${(p) => p.size && `repeat(${p.size}, 1fr)`};
`;
export const Blur = styled.div<{ isBlur: boolean }>`
  pointer-events: ${(p) => p.isBlur && 'none'};
  filter: ${(p) => p.isBlur && 'blur(5px)'};
`;
export const Form = styled(motion.form)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
export const Box = styled(motion.div)`
  position: relative;
  width: fit-content;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  border-radius: 5px;
  border: ${(p) => p.theme.border.thick};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  form {
    .flex {
      align-items: flex-start;
    }
  }
`;
export const Overlay = styled(motion.div)<{ dark?: number; zindex?: number }>`
  top: 0;
  left: 0;
  opacity: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${(p) => (p.zindex ? p.zindex : '99')};
  background-color: ${(p) => p.dark && `rgba(0, 0, 0, ${p.dark})`};
  //background-color: red;
`;

export const MotionBox = styled(motion.div)<{
  avatar?: string;
  preview?: string;
}>`
  border: none;
  display: flex;
  overflow: hidden;
  position: relative;
  border-radius: 5px;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.font};
  background: ${(p) =>
    `url(${
      p.avatar
        ? `https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/${p.avatar}/public`
        : p.preview && p.preview
    }) center / cover no-repeat `};
  &:first-of-type {
    transform-origin: center left;
  }
  &:last-of-type {
    transform-origin: center right;
  }
`;
