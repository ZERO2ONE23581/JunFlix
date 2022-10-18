import { imgVar } from './img_input';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { opacityVar, variants } from '../../../../styles/variants';

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
              exit="exit"
              initial="initial"
              animate="animate"
              variants={imgVar}
              custom={!theme}
            >
              <AnimatePresence>
                {preview && (
                  <Img
                    src={src}
                    exit="exit"
                    alt="프리뷰 이미지"
                    initial="initial"
                    animate="animate"
                    variants={imgVar}
                  />
                )}
              </AnimatePresence>

              <AnimatePresence>
                {!preview && original && (
                  <Img
                    src={src}
                    exit="exit"
                    alt="오리지널 이미지"
                    initial="initial"
                    animate="animate"
                    variants={imgVar}
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
  padding: 20px;
  height: fit-content;
  border-top: 1px solid ${(p) => p.theme.color.font};
`;
const ImgWrap = styled(motion.div)`
  width: 15rem;
  height: 20rem;
  overflow: hidden;
  border-radius: 12px;
`;
const Img = styled(motion.img)`
  width: 100%;
  height: 100%;
`;
