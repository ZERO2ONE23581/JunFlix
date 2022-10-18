import styled from '@emotion/styled';
import { CircleSvg } from '../../../Tools/CircleSvg';
import { color } from '../../../../styles/variants';
import { UseFormRegisterReturn } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';

interface IUpdatePostFileInput {
  theme: boolean;
  open: boolean;
  data: {
    input_id: string;
    preview: string;
    clearPreview: () => void;
    register: UseFormRegisterReturn;
  };
}
export const FileInput = ({ theme, open, data }: IUpdatePostFileInput) => {
  const preview = data?.preview;
  const register = data?.register;
  const input_id = data?.input_id;
  const clearPreview = data?.clearPreview;
  //
  return (
    <AnimatePresence>
      {open && (
        <>
          <Cont
            exit="exit"
            initial="initial"
            animate="animate"
            className="post-image"
            custom={theme}
            variants={postInputVar}
          >
            <CircleSvg theme={theme} isHide={!preview} onClick={clearPreview} />
            <Label htmlFor={input_id} className="img-label" isNext={false}>
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
                    custom={theme}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
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
              id={input_id}
              name={input_id}
              accept="image/*"
              disabled={!input_id}
              style={{ display: 'none' }}
            />
          </Cont>
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(motion.div)`
  width: 100%;
  height: 100%;
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
  .circle-svg {
    top: 4rem;
    left: 2rem;
  }
`;
const Label = styled.label<{ isNext: boolean }>`
  cursor: pointer;
  pointer-events: ${(p) => p.isNext && 'none'};
`;
const Click = styled(motion.div)`
  top: 50%;
  left: 50%;
  position: absolute;
  font-size: 2rem;
  font-weight: 400;
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
    backgroundColor: color(!theme),
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

const clickVar = {
  animate: (theme: boolean) => ({
    color: color(theme),
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.5 },
  }),
  exit: { x: '-50%', y: '-50%', transition: { duration: 0.5 } },
  initial: { x: '-50%', y: '-50%', transition: { duration: 0.5 } },
  hover: { color: '#E50914', scale: 1.5, transition: { duration: 0.5 } },
};
