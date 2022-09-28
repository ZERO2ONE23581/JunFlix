import styled from '@emotion/styled';
import { motion } from 'framer-motion';

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

export const Page = styled.section`
  padding: 0 3rem;
  padding-bottom: 10%;
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;
  position: relative;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
`;
export const Layout = styled.section`
  min-width: 100vw;
  padding: 10px 80px;
`;
export const Box = styled.article`
  gap: 12px;
  display: flex;
  padding: 40px;
  margin: 10% auto;
  border-radius: 5px;
  flex-direction: column;
  color: ${(p) => p.theme.color.font};
  border: ${(p) => p.theme.border.thick};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
  h2 {
    margin-bottom: 10px;
    span {
      font-size: 1.2rem;
      margin-right: 10px;
      font-style: italic;
    }
    .kor {
      font-size: 1.1rem;
    }
  }
  .flex {
    gap: 12px;
    display: flex;
    align-items: center;
  }
`;
export const Modal = styled.article`
  z-index: 100;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border: none;
  padding: 30px;
  overflow: hidden;
  font-size: 1.2rem;
  border-radius: 5px;
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
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
export const Overlay = styled(motion.div)`
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
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

export const boxVars = {
  initial: {
    scale: 1,
  },
  hover: {
    y: -20,
    scale: 1.5,
    transition: {
      delay: 0.2,
      duration: 0.3,
    },
  },
};

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
