import styled from '@emotion/styled';
import { avatarLink } from '../../../Tools/Avatar';
import { AnimatePresence, motion } from 'framer-motion';
import { opacityVar } from '../../../../styles/variants';

interface IPostImage {
  src: string;
  open: boolean;
  preview: string;
  original: string | null;
}

export const PostImage = ({ open, src, preview, original }: IPostImage) => {
  //
  return (
    <AnimatePresence>
      {open && (
        <Container
          exit="exit"
          initial="initial"
          animate="animate"
          className="post_image"
          variants={opacityVar}
        >
          <AnimatePresence>
            {Boolean(src === preview) && (
              <motion.img
                initial="initial"
                animate="animate"
                exit="exit"
                variants={image_vars}
                src={src}
                alt="쇼이미지"
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {Boolean(src === avatarLink(original)) && (
              <motion.img
                initial="initial"
                animate="animate"
                exit="exit"
                variants={image_vars}
                src={src}
                alt="쇼이미지"
              />
            )}
          </AnimatePresence>
        </Container>
      )}
    </AnimatePresence>
  );
};
const Container = styled(motion.div)`
  position: relative;
  min-width: 16rem;
  min-height: 16rem;
  margin: 20px;
  img {
    top: 50%;
    left: 50%;
    width: 15rem;
    height: 15rem;
    display: block;
    position: absolute;
    border-radius: 15px;
  }
`;
const image_vars = {
  initial: () => ({
    x: '-50%',
    y: '-50%',
    ...zero_opacity,
  }),
  animate: () => ({
    scale: 1,
    x: '-50%',
    y: '-50%',
    opacity: 1,
    transition: { duration: 0.6 },
  }),
  exit: () => ({
    x: '-50%',
    y: '-50%',
    ...zero_opacity,
  }),
};
const zero_opacity = { scale: 0.1, opacity: 0, transition: { duration: 0.6 } };
