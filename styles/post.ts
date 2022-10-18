import { Modal } from './global';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const PostModalStyle = styled(Modal)`
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
export const PostInfo = styled(motion.article)`
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
  h2 {
    width: 100%;
    font-size: 1.3rem;
    font-style: italic;
    font-weight: 400;
    .kor {
      font-size: 1.2rem;
    }
    span {
      margin-right: 10px;
    }
  }
  .input-wrap {
  }
  textarea {
    max-height: 300px;
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
