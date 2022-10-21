import styled from '@emotion/styled';
import { CircleSvg } from '../../../Tools/CircleSvg';
import { colorVar } from '../../../../styles/variants';
import { UseFormRegisterReturn } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';

interface IPostImage {
  theme: boolean;
  img_id: string;
  isNext: boolean;
  preview: string | null;
  deletePreview: () => void;
  register: UseFormRegisterReturn;
}
export const PostImage = ({
  isNext,
  theme,
  img_id,
  preview,
  register,
  deletePreview,
}: IPostImage) => {
  const isHide = Boolean(isNext && !preview);
  const isShrink = Boolean(isNext && preview);
  return (
    <AnimatePresence>
      {!isHide && (
        <Cont
          exit="exit"
          initial="initial"
          animate="animate"
          className="post-image"
          custom={isShrink}
          variants={variants}
        >
          <CircleSvg
            theme={theme}
            onClick={deletePreview}
            isHide={!Boolean(preview)}
          />
          <Label htmlFor={img_id} className="img-label" isNext={isNext}>
            <AnimatePresence>
              {Boolean(preview) && (
                <motion.img
                  exit="exit"
                  initial="initial"
                  animate="animate"
                  src={preview!}
                  variants={variants}
                  alt="이미지 프리뷰"
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {!preview && (
                <Click
                  exit="exit"
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  custom={!theme}
                  variants={clickVar}
                >
                  Click
                </Click>
              )}
            </AnimatePresence>
          </Label>

          <input
            {...register}
            type="file"
            id={img_id}
            name={img_id}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </Cont>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(motion.div)`
  .circle-svg {
    top: 1rem;
    left: 1rem;
  }
  overflow: hidden;
  label {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
`;
const Label = styled.label<{ isNext: boolean }>`
  cursor: pointer;
  pointer-events: ${(p) => p.isNext && 'none'};
`;
const scaleSmall = {
  opacity: 0,
  scale: 0.2,
  transition: { duration: 0.5 },
};
const isAnimate = {
  scale: 1,
  opacity: 1,
  transition: { duration: 0.5 },
};
const imgVar = {
  initial: () => ({
    ...scaleSmall,
  }),
  animate: () => ({
    ...isAnimate,
  }),
  exit: () => ({
    ...scaleSmall,
  }),
};
const Click = styled(motion.div)`
  top: 50%;
  left: 50%;
  position: absolute;
  font-size: 2rem;
  font-weight: 400;
`;
const clickVar = {
  ...colorVar,
  exit: { x: '-50%', y: '-50%', transition: { duration: 0.5 } },
  initial: { x: '-50%', y: '-50%', transition: { duration: 0.5 } },
  animate: { x: '-50%', y: '-50%', transition: { duration: 0.5 } },
  hover: { color: '#E50914', scale: 1.5, transition: { duration: 0.5 } },
};
const variants = {
  initial: () => ({
    y: -900,
    opacity: 0,
    scale: 0.2,
    transition: { duration: 0.5 },
  }),
  animate: (isShrink: boolean) => ({
    x: !isShrink ? 20 : 0,
    y: !isShrink ? 30 : 0,
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5 },
    width: isShrink ? '50%' : '100%',
    height: isShrink ? '50%' : '100%',
    borderBottomRightRadius: isShrink ? '5%' : '0%',
  }),
  exit: () => ({
    y: -900,
    opacity: 0,
    scale: 0.2,
    transition: { duration: 0.5 },
  }),
};
