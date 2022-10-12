import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Page = styled.section`
  width: 100%;
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;
  position: relative;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
`;
export const FlexPage = styled(Page)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
`;
export const Flex = styled.div`
  width: 100%;
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const AvatarLabel = styled.label`
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
  top: 50%;
  left: 50%;
  z-index: 100;
  position: fixed;
  transform: translate(-50%, -50%);
  //
  padding: 30px;
  width: fit-content;
  //
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  //
  overflow: hidden;
  overflow-y: auto;
  border-radius: 5px;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  border-width: 1px;
  border-style: solid;
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
export const BtnWrap = styled.div`
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
export const Overlay = styled(motion.div)<{ zindex?: number }>`
  top: 0;
  left: 0;
  opacity: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: red;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: ${(p) => (p.zindex ? p.zindex : '99')};
`;
export const Grid = styled.article<{ size: number }>`
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
