import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { variants } from '../../../../styles/variants';

interface IShowImage {
  src: string;
  theme: boolean;
  isBoolean: {
    isHide: boolean;
    preview: boolean;
    original: boolean;
  };
}
export const ShowImage = ({ src, isBoolean, theme }: IShowImage) => {
  const isHide = isBoolean?.isHide;
  const preview = isBoolean?.preview;
  const original = isBoolean?.original;
  return (
    <AnimatePresence>
      <Container animate="animate" variants={variants} custom={theme}>
        <AnimatePresence>
          {(original || preview) && !isHide && (
            <ImgWrap
              // exit="exit"
              // initial="initial"
              // animate="animate"
              //variants={imgVar}
              custom={!theme}
            >
              <AnimatePresence>
                {preview && (
                  <Img
                    src={src}
                    // exit="exit"
                    // alt="프리뷰 이미지"
                    // initial="initial"
                    // animate="animate"
                    // variants={abs_image_var}
                  />
                )}
              </AnimatePresence>

              <AnimatePresence>
                {!preview && original && (
                  <Img
                    src={src}
                    // exit="exit"
                    // alt="오리지널 이미지"
                    // initial="initial"
                    // animate="animate"
                    // variants={abs_image_var}
                  />
                )}
              </AnimatePresence>
            </ImgWrap>
          )}
        </AnimatePresence>
      </Container>
    </AnimatePresence>
  );
};
const Container = styled(motion.div)`
  width: 100%;
  height: fit-content;
`;
const ImgWrap = styled(motion.div)`
  padding: 20px;
  /* width: 15rem;
  height: 15rem; */
  position: relative;
  width: 100%;
  height: 100%;
  border: 2px solid red;
`;
const Img = styled(motion.img)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;
const abs_image_var = {
  initial: () => ({
    opacity: 0,
    scale: 0.2,
    transition: { duration: 0.8 },
  }),
  animate: () => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8 },
  }),
  exit: () => ({
    opacity: 0,
    scale: 0.2,
    transition: { duration: 0.8 },
  }),
};
const imgVar = {
  initial: () => ({
    scale: 0.1,
    opacity: 0,
  }),
  animate: ({ isShrink }: any) => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4 },
  }),
  exit: () => ({
    scale: 0.1,
    opacity: 0,
    transition: { duration: 0.4 },
  }),
};
