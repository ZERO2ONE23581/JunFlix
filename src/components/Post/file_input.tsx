import styled from '@emotion/styled';
import { CircleSvg } from '../../Tools/CircleSvg';
import { color } from '../../../styles/variants';
import { UseFormRegisterReturn } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';

interface IUpdatePostFileInput {
  open: boolean;
  theme: boolean;
  data: {
    id: string;
    usedAs: string;
    isNext?: boolean;
    preview: string;
    deletePreview: () => void;
    register: UseFormRegisterReturn;
  };
}
export const FileInput = ({ open, data, theme }: IUpdatePostFileInput) => {
  const id = data?.id;
  const usedAs = data?.usedAs;
  const isShrink = data?.isNext;
  const preview = data?.preview;
  const register = data?.register;
  const deletePreview = data?.deletePreview;
  const isCreate = Boolean(usedAs === 'create');
  const isUpdate = Boolean(usedAs === 'update');
  const vars = isCreate ? create_vars : isUpdate ? update_vars : undefined;
  return (
    <AnimatePresence>
      {open && (
        <Cont
          exit="exit"
          initial="initial"
          animate="animate"
          className="post-image"
          variants={vars}
          custom={{ isShrink }}
        >
          <Label isShrink={isShrink!} htmlFor={id} className="img-label">
            <AnimatePresence>
              {preview && (
                <motion.img
                  exit="exit"
                  src={preview}
                  alt="프리뷰 이미지"
                  initial="initial"
                  animate="animate"
                  variants={imgVar}
                  custom={{ isShrink, preview }}
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {!preview && (
                <motion.span
                  custom={theme}
                  initial="initial"
                  animate="animate"
                  className="click"
                  exit="exit"
                  whileHover="hover"
                  variants={clickVar}
                >
                  Click
                </motion.span>
              )}
            </AnimatePresence>
          </Label>
          <input
            {...register}
            type="file"
            id={id}
            name={id}
            accept="image/*"
            disabled={!id}
            style={{ display: 'none' }}
          />
          <CircleSvg
            theme={theme}
            onClick={deletePreview}
            isHide={Boolean(!preview || isShrink)}
          />
        </Cont>
      )}
    </AnimatePresence>
  );
};
const scale_one = { scale: 1, opacity: 1 };
const scale_zero = { scale: 0.1, opacity: 0 };
const isHover = { color: '#E50914', scale: 1.5, transition: { duration: 0.5 } };
const create_vars = {
  initial: ({ isShrink }: any) => ({
    ...scale_zero,
    width: isShrink ? '35%' : '100%',
    height: isShrink ? '30%' : '100%',
  }),
  animate: ({ isShrink }: any) => ({
    ...scale_one,
    x: isShrink ? 30 : 0,
    y: isShrink ? 10 : 0,
    width: isShrink ? '35%' : '100%',
    height: isShrink ? '30%' : '100%',
  }),
  hover: { ...isHover },
};
const update_vars = {
  initial: () => ({
    ...scale_zero,
  }),
  animate: () => ({
    ...scale_one,
    transition: { duration: 0.6 },
  }),
  exit: () => ({
    x: 9999,
    ...scale_zero,
    transition: { duration: 1.5 },
  }),
  hover: { ...isHover },
};
const imgVar = {
  initial: () => ({
    ...scale_zero,
  }),
  animate: ({ isShrink }: any) => ({
    ...scale_one,
    borderRadius: isShrink ? '20px' : '0px',
  }),
  exit: () => ({
    ...scale_zero,
  }),
};
const translate_click = {
  x: '-50%',
  y: '-50%',
};
const clickVar = {
  initial: (theme: boolean) => ({
    ...scale_zero,
    ...translate_click,
    color: color(theme),
  }),
  animate: (theme: boolean) => ({
    ...scale_one,
    ...translate_click,
    color: color(theme),
    transition: { duration: 1 },
  }),
  exit: () => ({ opacity: 0, transition: { duration: 0.5 } }),
  hover: { color: '#E50914', scale: 1.2, transition: { duration: 0.3 } },
};

const Cont = styled(motion.div)`
  overflow: hidden;
`;
const Label = styled.label<{ isShrink: boolean }>`
  cursor: ${(p) => !p.isShrink && 'pointer'};
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 2rem;
  font-weight: 400;
  position: relative;
  align-items: center;
  justify-content: center;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .click {
    top: 50%;
    left: 50%;
    position: absolute;
  }
`;
