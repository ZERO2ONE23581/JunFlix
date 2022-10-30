import { AnimatePresence, motion } from 'framer-motion';

interface IOriginal {
  _data: {
    preview: string;
    isNext: boolean;
  };
}
export const Preview = ({ _data }: IOriginal) => {
  const preview = _data?.preview!;
  const isNext = _data?.isNext!;
  return (
    <AnimatePresence>
      {preview && (
        <motion.img
          exit="exit"
          src={preview}
          alt="프리뷰 이미지"
          initial="initial"
          animate="animate"
          variants={imgVar}
          style={{ display: 'block' }}
          custom={{ isNext, preview }}
        />
      )}
    </AnimatePresence>
  );
};
const imgVar = {
  initial: () => ({
    ...scale_zero,
  }),
  animate: ({ isNext }: any) => ({
    ...scale_one,
    transition: { duration: 0.5 },
    borderRadius: isNext ? '20px' : '0px',
  }),
  exit: () => ({
    scale: 1,
    opacity: 0,
    transition: { duration: 0.5 },
  }),
};
const scale_one = { scale: 1, opacity: 1 };
const scale_zero = { scale: 0.1, opacity: 0 };
