import styled from '@emotion/styled';
import { Modal, Page } from './global';
import { color, greyBrdr } from './variants';

export const PostPage = styled(Page)<{ isDesk: boolean }>`
  padding: 0 2.5rem;
  min-height: 166vh;
  padding-bottom: 4rem;
  .page-title {
    margin-bottom: 2rem;
    font-size: ${(p) => (p.isDesk ? '2rem' : '4rem')};
    svg {
      width: ${(p) => (p.isDesk ? '2rem' : '4rem')};
      height: ${(p) => (p.isDesk ? '2rem' : '4rem')};
    }
    .txt {
      padding: ${(p) => (p.isDesk ? '0.5rem 2rem' : '1rem 3rem')};
    }
  }
`;
export const PostSt = styled(Modal)`
  top: 0vh;
  width: 100%;
  height: 100%;
  font-size: 1.1rem;
  justify-content: flex-start;
  img {
    width: 100%;
    height: 100%;
  }
`;
export const selectVars = {
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
export const postVar = {
  animate: ({ theme, isDesk }: any) => ({
    scale: 1,
    opacity: 1,
    color: color(theme),
    transition: { duration: 0.8 },
    backgroundColor: color(!theme),
    border: !isDesk ? '1px solid transparent' : greyBrdr,
  }),
  exit: () => ({ opacity: 0, scale: 0.1, transition: { duration: 0.8 } }),
  initial: () => ({ scale: 0.1, opacity: 0, transition: { duration: 0.8 } }),
};
