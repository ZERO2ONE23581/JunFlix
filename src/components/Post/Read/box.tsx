import styled from '@emotion/styled';
import { Post } from '@prisma/client';
import { motion } from 'framer-motion';
import { boxVars, SpringTrans } from '../../../../styles/variants';

interface IPostBox {
  data: Post;
  reverse?: boolean;
  clickBox: (id: number) => void;
}
export const PostBox = ({ data, clickBox, reverse }: IPostBox) => {
  return (
    <>
      <Box
        bg={data?.avatar!}
        className="post-box"
        onClick={() => clickBox(data.id)}
        //
        initial="initial"
        whileHover="hover"
        custom={reverse}
        variants={boxVars}
        layoutId={data.id + ''}
        transition={SpringTrans}
      />
    </>
  );
};
const Box = styled(motion.div)<{ bg: string }>`
  display: flex;
  cursor: pointer;
  border-radius: 5px;
  align-items: flex-end;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background: ${(p) =>
    p.bg &&
    `url(https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/${p.bg}/public) center / cover no-repeat `};
  &:first-of-type {
    transform-origin: center left;
  }
  &:last-of-type {
    transform-origin: center right;
  }
`;
// const Cont = styled(motion.div)`
//   position: relative;
//   .lock {
//     top: 50%;
//     left: 50%;
//     z-index: 1;
//     cursor: pointer;
//     position: absolute;
//     transform: translate(-50%, -50%);
//   }
// `;
const Blur = styled.div<{ isBlur: boolean }>`
  position: relative;
  filter: ${(p) => p.isBlur && 'blur(5px)'};
  .text {
    top: 0;
    right: 0;
    width: 200px;
    text-align: center;
    position: absolute;
  }
`;
const PostBG = styled(motion.div)`
  display: flex;
  cursor: pointer;
  position: relative;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;
