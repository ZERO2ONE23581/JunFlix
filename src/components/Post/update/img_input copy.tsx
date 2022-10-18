import { CircleSvg } from '../../../Tools/CircleSvg';
import { color, colorVar } from '../../../../styles/variants';
import { UseFormRegisterReturn } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import styled from '@emotion/styled';
import { Btn } from '../../../Tools/Button';

interface IPostImage {
  theme: boolean;
  isInput: boolean;
  image: {
    type: string;
    preview: string;
    clearPrev: () => void;
    register: {
      new: UseFormRegisterReturn;
      original: UseFormRegisterReturn;
    };
  };
}
export const PostImgInput = ({ theme, isInput, image }: IPostImage) => {
  const id = image?.type;
  const preview = image?.preview;
  const clearPreview = image?.clearPrev;
  const newRegister = image?.register?.new;
  const register = image?.register?.original;
  //
  console.log('ID', id);
  console.log('PREVIEW', preview);
  return (
    <AnimatePresence>
      {isInput && (
        <>
          <Cont
            exit="exit"
            initial="initial"
            animate="animate"
            className="post-image"
            custom={theme}
            variants={postInputVar}
          >
            <CircleSvg theme={theme} isHide={!id} onClick={clearPreview} />
            <Label htmlFor={id} className="img-label" isNext={false}>
              <AnimatePresence>
                {preview && (
                  <motion.img
                    src={preview}
                    variants={imgVar}
                    exit="exit"
                    alt="프리뷰 이미지"
                    initial="initial"
                    animate="animate"
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
                    custom={theme}
                    variants={clickVar}
                  >
                    Click
                  </Click>
                )}
              </AnimatePresence>
            </Label>
            {id === 'post_image' && (
              <input
                {...register}
                id={id}
                name={id}
                type="file"
                accept="image/*"
                disabled={id !== 'post_image'}
                style={{ display: 'none' }}
              />
            )}
            {id === 'new_image' && (
              <input
                {...newRegister}
                id={id}
                name={id}
                type="file"
                accept="image/*"
                disabled={id !== 'new_image'}
                style={{ display: 'none' }}
              />
            )}
          </Cont>
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(motion.div)`
  border: 2px solid blue;
  width: 100%;
  height: 100%;
  overflow: hidden;
  label {
    border: 5px solid blueviolet;
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
  .circle-svg {
    top: 4rem;
    left: 2rem;
  }
`;
const Label = styled.label<{ isNext: boolean }>`
  cursor: pointer;
  pointer-events: ${(p) => p.isNext && 'none'};
`;
const postInputVar = {
  initial: (theme: boolean) => ({
    y: -900,
    opacity: 0,
    scale: 0.2,
    transition: { duration: 0.5 },
  }),
  animate: (theme: boolean) => ({
    y: 0,
    scale: 1,
    opacity: 1,
    color: color(theme),
    backgroundColor: color(theme),
    transition: { duration: 0.5 },
  }),
  exit: (theme: boolean) => ({
    y: -900,
    opacity: 0,
    scale: 0.2,
    transition: { duration: 0.5 },
  }),
};
export const imgVar = {
  initial: () => ({
    opacity: 0,
    scale: 0.2,
    transition: { duration: 0.5 },
  }),
  animate: () => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5 },
  }),
  exit: () => ({
    opacity: 0,
    scale: 0.2,
    transition: { duration: 0.5 },
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
  animate: (theme: boolean) => ({
    color: color(!theme),
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.5 },
  }),
  exit: { x: '-50%', y: '-50%', transition: { duration: 0.5 } },
  initial: { x: '-50%', y: '-50%', transition: { duration: 0.5 } },
  hover: { color: '#E50914', scale: 1.5, transition: { duration: 0.5 } },
};
